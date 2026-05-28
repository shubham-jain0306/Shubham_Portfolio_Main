import { useEffect, useState } from "react";

interface GridOverlayProps {
  subdued?: boolean;
}

const GridOverlay = ({ subdued = false }: GridOverlayProps) => {
  const [scrollGlow, setScrollGlow] = useState(0);
  const [isLight, setIsLight] = useState(() =>
    document.documentElement.classList.contains("light")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains("light"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrollGlow(1);
          clearTimeout(timeout);
          timeout = setTimeout(() => setScrollGlow(0), 400);
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timeout);
    };
  }, []);

  const baseOpacity = subdued ? 0.02 : 0.03;
  const glowOpacity = subdued ? 0.06 : 0.15;
  const currentOpacity = baseOpacity + scrollGlow * (glowOpacity - baseOpacity);

  const lineColor = isLight
    ? `rgba(0, 0, 0, ${currentOpacity})`
    : `rgba(255, 255, 255, ${currentOpacity})`;

  const lineStyle = {
    borderColor: lineColor,
    transition: "border-color 0.6s ease-out",
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="max-w-[1200px] mx-auto h-full px-6 sm:px-12 md:px-20 lg:px-6">
        <div className="h-full flex md:hidden">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex-1 border-l last:border-r" style={lineStyle} />
          ))}
        </div>
        <div className="h-full hidden md:flex">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex-1 border-l last:border-r" style={lineStyle} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridOverlay;
