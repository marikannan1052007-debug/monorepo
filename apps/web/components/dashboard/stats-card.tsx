import { LucideIcon } from "lucide-react";
import GlassCard from "./glass-card";
type StatsCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color?: string;
};

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "text-green-400",
}: StatsCardProps) {
  return (
    <GlassCard className="group p-6 hover:-translate-y-1">
      
      <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-green-500/10 blur-3xl transition-all duration-300 group-hover:bg-green-500/20" />

      <div className="relative flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-400">
            {title}
          </p>

          <h2 className={`mt-3 text-4xl font-bold ${color}`}>
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-gray-500">
              {subtitle}
            </p>
          )}

        </div>

        <div className="rounded-xl bg-white/10 p-4">

          <Icon className={color} size={28} />

        </div>

      </div>

    </GlassCard>
  );
}