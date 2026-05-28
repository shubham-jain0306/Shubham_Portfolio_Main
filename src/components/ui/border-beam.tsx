import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  borderWidth?: number;
}

const BorderBeam = ({
  className,
  size = 200,
  duration = 6,
  delay = 0,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  borderWidth = 2,
}: BorderBeamProps) => {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 rounded-[inherit]", className)}
      style={{
        padding: `${borderWidth}px`,
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        overflow: "hidden",
      }}
    >
      <div
        className="absolute inset-[-100%] rounded-[inherit]"
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, ${colorFrom} 10%, ${colorTo} 20%, transparent 30%)`,
          animation: `border-beam-spin ${duration}s linear ${delay}s infinite`,
        }}
      />
    </div>
  );
};

export { BorderBeam };
