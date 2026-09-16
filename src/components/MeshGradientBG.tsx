import { useEffect, useRef, useState, useCallback } from "react";

interface MeshGradientBGProps {
  subdued?: boolean;
}

const MeshGradientBG = ({ subdued = false }: MeshGradientBGProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [isLight, setIsLight] = useState(() =>
    document.documentElement.classList.contains("light")
  );

  // Watch for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains("light"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * 0.5;
      canvas.height = h * 0.5;
    };
    resize();
    window.addEventListener("resize", resize);

    // Obtain active theme blob colors from theme palette
    const themeId = document.documentElement.getAttribute("data-theme") || "ivory-charcoal-terracotta";
    const isLightMode = document.documentElement.classList.contains("light");

    // Dynamic blob palette from active theme
    const activePalette = (window as any).__shubhamActiveTheme;
    const blobColors = activePalette?.meshBlobs || (isLightMode
      ? [[235, 230, 220], [215, 225, 215], [245, 238, 228], [205, 195, 180]]
      : [[18, 18, 28], [25, 25, 45], [12, 12, 22], [30, 30, 50]]);

    const blobs = [
      { x: 0.3, y: 0.2, r: 0.45, vx: 0.00012, vy: 0.00008, color: blobColors[0] || [20, 20, 30] },
      { x: 0.7, y: 0.8, r: 0.5, vx: -0.0001, vy: 0.00006, color: blobColors[1] || [30, 30, 50] },
      { x: 0.5, y: 0.5, r: 0.4, vx: 0.00007, vy: -0.00009, color: blobColors[2] || [15, 15, 25] },
      { x: 0.2, y: 0.7, r: 0.35, vx: 0.00009, vy: 0.00011, color: blobColors[3] || [25, 25, 40] },
    ];

    const globalAlpha = subdued ? 0.25 : 0.5;
    // Derive background color directly from computed CSS var
    const computedBg = activePalette?.preview?.bg || (isLightMode ? "#FAF8F5" : "#0A0A0B");
    const bgColor = computedBg;
    const compositeOp = isLightMode ? "multiply" : "screen";

    const animate = (time: number) => {
      const cw = canvas.width;
      const ch = canvas.height;

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, cw, ch);
      ctx.globalCompositeOperation = compositeOp;

      for (const blob of blobs) {
        blob.x += blob.vx;
        blob.y += blob.vy;
        if (blob.x < 0.1 || blob.x > 0.9) blob.vx *= -1;
        if (blob.y < 0.1 || blob.y > 0.9) blob.vy *= -1;

        const ox = Math.sin(time * 0.0003 + blob.x * 10) * 0.02;
        const oy = Math.cos(time * 0.0002 + blob.y * 10) * 0.02;
        const cx = (blob.x + ox) * cw;
        const cy = (blob.y + oy) * ch;
        const radius = blob.r * Math.max(cw, ch);

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        const [r, g, b] = blob.color;
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${globalAlpha})`);
        grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${globalAlpha * 0.4})`);
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, cw, ch);
      }

      ctx.globalCompositeOperation = "source-over";
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [subdued, isLight]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ imageRendering: "auto" }}
    />
  );
};

export default MeshGradientBG;
