import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Only show on non-touch devices
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.15);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.15);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 6}px, ${pos.current.y - 6}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  // Add hover detection for clickable elements
  useEffect(() => {
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest("a, button, [role='button'], input, textarea, select, [tabindex]");
      if (dotRef.current) {
        if (isClickable) {
          dotRef.current.style.width = "20px";
          dotRef.current.style.height = "20px";
          dotRef.current.style.boxShadow = "0 0 20px 6px rgba(255,255,255,0.3)";
        } else {
          dotRef.current.style.width = "12px";
          dotRef.current.style.height = "12px";
          dotRef.current.style.boxShadow = "0 0 12px 3px rgba(255,255,255,0.15)";
        }
      }
    };

    document.addEventListener("mouseover", onOver);
    return () => document.removeEventListener("mouseover", onOver);
  }, []);

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
      style={{
        width: 12,
        height: 12,
        background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.2) 60%, transparent 100%)",
        boxShadow: "0 0 12px 3px rgba(255,255,255,0.15)",
        opacity: visible ? 1 : 0,
        transition: "width 0.3s ease, height 0.3s ease, box-shadow 0.3s ease, opacity 0.2s ease",
        willChange: "transform",
      }}
    />
  );
};

export default CustomCursor;
