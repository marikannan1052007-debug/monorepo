import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export default function GlassCard({
  children,
  className,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl",
        "border border-white/10",
        "bg-white/5",
        "backdrop-blur-xl",
        "shadow-xl shadow-black/20",
        "transition-all duration-300",
        "hover:border-green-500/30",
        "hover:shadow-green-500/10",
        className
      )}
    >
      {/* Glow */}

      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

      {/* Content */}

      <div className="relative z-10 flex h-full flex-col">
  {children}
</div>
    </div>
  );
}