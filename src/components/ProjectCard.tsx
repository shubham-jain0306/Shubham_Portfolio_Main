import { Link } from "react-router-dom";
import { Project } from "@/data/projects";
import { useRef, useState, useEffect, useCallback } from "react";

const ProjectCard = ({ project }: { project: Project }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [hovering, setHovering] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  // Scroll-triggered clip reveal for the title
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  // 3D tilt: subtle ~5° max
  const tiltX = hovering ? (mouse.y - 0.5) * -10 : 0; // ±5°
  const tiltY = hovering ? (mouse.x - 0.5) * 10 : 0;

  return (
    <Link
      ref={cardRef}
      to={`/work/${project.slug}`}
      className="group block mb-10"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setMouse({ x: 0.5, y: 0.5 });
      }}
      style={{ perspective: "800px" }}
    >
      {/* Card container with 3D tilt */}
      <div
        className="rounded-xl overflow-hidden relative"
        style={{
          borderRadius: 12,
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transition: hovering
            ? "transform 0.15s ease-out"
            : "transform 0.5s ease-out",
          willChange: "transform",
        }}
      >
        {/* Metadata header */}
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ backgroundColor: project.accentColor || "#1a6fb5" }}
        >
          <span className="text-foreground text-xs font-mono tracking-wide">
            {project.year}
          </span>
          <span className="text-foreground text-xs font-mono tracking-wide">
            {project.category}
          </span>
        </div>

        {/* Image with hover scale */}
        <div className="overflow-hidden relative">
          <img
            src={project.cardImage}
            alt={project.title}
            className="w-full h-auto object-cover transition-transform duration-700 ease-out"
            style={{
              transform: hovering ? "scale(1.05)" : "scale(1)",
            }}
          />

          {/* Mouse-tracking spotlight */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: hovering ? 1 : 0,
              background: `radial-gradient(
                600px circle at ${mouse.x * 100}% ${mouse.y * 100}%,
                rgba(255, 255, 255, 0.08) 0%,
                rgba(255, 255, 255, 0.03) 40%,
                transparent 70%
              )`,
            }}
          />
        </div>
      </div>

      {/* Title - clip reveal from bottom */}
      <div
        ref={titleRef}
        className="overflow-hidden mt-5"
        style={{ clipPath: revealed ? "inset(0 0 0 0)" : "inset(100% 0 0 0)", transition: "clip-path 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
      >
        <h3
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-foreground"
          style={{
            transform: revealed ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          {project.title}
        </h3>
      </div>
    </Link>
  );
};

export default ProjectCard;
