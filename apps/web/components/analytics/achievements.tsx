import GlassCard from "@/components/dashboard/glass-card";
import {
  Trophy,
  Flame,
  Target,
  BookOpen,
} from "lucide-react";

import type { MissionHistory } from "@/types/analytics";

export default function Achievements({
  history,
}: {
  history: MissionHistory[];
}) {
  const totalCompleted = history.length;

  const achievements = [
    {
      title: "First Mission",
      description: "Complete your first mission",
      unlocked: totalCompleted >= 1,
      icon: Target,
      color: "text-blue-400",
    },
    {
      title: "Mission Master",
      description: "Complete 25 missions",
      unlocked: totalCompleted >= 25,
      icon: Trophy,
      color: "text-yellow-400",
    },
    {
      title: "Elite Warrior",
      description: "Complete 50 missions",
      unlocked: totalCompleted >= 50,
      icon: Flame,
      color: "text-orange-400",
    },
    {
      title: "Study Champion",
      description: "Complete 100 missions",
      unlocked: totalCompleted >= 100,
      icon: BookOpen,
      color: "text-green-400",
    },
  ];

  return (
    <GlassCard className="p-6">
      <h2 className="mb-2 text-2xl font-bold">
        Achievements
      </h2>

      <p className="mb-6 text-sm text-gray-400">
        Unlock badges by completing missions.
      </p>

      <div className="space-y-4">
        {achievements.map((achievement) => {
          const Icon = achievement.icon;

          return (
            <div
              key={achievement.title}
              className={`flex items-center justify-between rounded-xl border p-4 ${
                achievement.unlocked
                  ? "border-green-500/40 bg-green-500/10"
                  : "border-white/10 bg-white/5 opacity-60"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`rounded-xl bg-white/10 p-3 ${achievement.color}`}
                >
                  <Icon size={24} />
                </div>

                <div>
                  <h3 className="font-semibold">
                    {achievement.title}
                  </h3>

                  <p className="text-sm text-gray-400">
                    {achievement.description}
                  </p>
                </div>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-sm ${
                  achievement.unlocked
                    ? "bg-green-500 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {achievement.unlocked ? "Unlocked" : "Locked"}
              </span>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}