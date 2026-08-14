import GlassCard from "@/components/dashboard/glass-card";
import { Flame } from "lucide-react";
import type { MissionHistory } from "@/types/analytics";

export default function StudyStreak({
  history,
}: {
  history: MissionHistory[];
}) {
  const streak = calculateStreak(history);

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Study Streak</h2>

          <p className="text-sm text-gray-400">
            Keep studying every day
          </p>
        </div>

        <Flame className="text-orange-400" size={34} />
      </div>

      <div className="mt-8 flex items-center gap-4">
        <div className="text-6xl font-black text-orange-400">
          {streak}
        </div>

        <div>
          <p className="text-xl font-semibold">Day Streak</p>

          <p className="text-gray-400">
            Complete at least one mission daily.
          </p>
        </div>
      </div>
    </GlassCard>
  );
}

function calculateStreak(history: MissionHistory[]): number {
  if (!history || history.length === 0) return 0;

  // Helper to format Date object into local YYYY-MM-DD
  const formatLocalYYYYMMDD = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Filter ONLY completed missions with valid timestamps, then build set of unique local dates
  const completionDates = new Set(
    history
      // MissionHistory does not have a `status` field; consider any entry with a completion timestamp as completed
      .filter((item) => item.completed_at)
      .map((item) => formatLocalYYYYMMDD(new Date(item.completed_at)))
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const todayStr = formatLocalYYYYMMDD(today);
  const yesterdayStr = formatLocalYYYYMMDD(yesterday);

  let checkDate = new Date(today);

  // If today is not completed yet, check if yesterday was completed
  if (!completionDates.has(todayStr)) {
    if (completionDates.has(yesterdayStr)) {
      checkDate = yesterday;
    } else {
      return 0; // Streak broken
    }
  }

  // Count consecutive days backward
  let streak = 0;
  while (true) {
    const dateStr = formatLocalYYYYMMDD(checkDate);
    if (completionDates.has(dateStr)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}