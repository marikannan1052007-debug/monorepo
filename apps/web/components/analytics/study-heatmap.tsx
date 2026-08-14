"use client";

import GlassCard from "@/components/dashboard/glass-card";
import type { MissionHistory } from "@/types/analytics";

type Props = {
  history: MissionHistory[];
};

type HeatmapCell = {
  date: string;
  count: number;
  level: number;
};

type MonthLabel = {
  label: string;
  colSpan: number;
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const WEEKDAYS = ["", "Mon", "", "Wed", "", "Fri", ""];

export default function StudyHeatmap({ history }: Props) {
  const weeks = buildCalendar(history);
  const monthLabels = getMonthLabels(weeks);

  return (
    <GlassCard className="overflow-hidden p-6 animate-in fade-in duration-700">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Mission Activity</h2>
        <p className="mt-1 text-sm text-gray-400">
          Your consistency over the last 365 days
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[780px]">
          {/* Month Labels Header */}
          <div className="mb-2 flex text-[11px] text-gray-500">
            {/* Empty space matching weekday column width + margin */}
            <div className="w-8 shrink-0 mr-2" />
            <div className="flex-1 grid grid-cols-[repeat(53,minmax(0,1fr))] gap-[3px]">
              {monthLabels.map((m, index) => (
                <div
                  key={index}
                  style={{ gridColumn: `span ${m.colSpan} / span ${m.colSpan}` }}
                  className="text-left overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {m.label}
                </div>
              ))}
            </div>
          </div>

          <div className="flex">
            {/* Weekdays */}
            <div className="mr-2 flex flex-col gap-[3px] w-8 shrink-0 text-right">
              {WEEKDAYS.map((day, index) => (
                <div
                  key={`${day}-${index}`}
                  className="h-[14px] text-[11px] leading-[14px] text-gray-500"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Heatmap Grid */}
            <div className="flex-1 grid grid-cols-[repeat(53,minmax(0,1fr))] gap-[3px]">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[3px]">
                  {week.map((cell) => (
                    <div
                      key={cell.date}
                      title={`${cell.count} mission${
                        cell.count === 1 ? "" : "s"
                      }\n${cell.date}`}
                      className={`
                        h-[14px]
                        w-full
                        rounded-[2px]
                        transition-all
                        duration-200
                        hover:scale-125
                        hover:ring-2
                        hover:ring-cyan-400
                        hover:z-10
                        cursor-pointer
                        ${
                          cell.date === getTodayUTC()
                            ? "ring-2 ring-white"
                            : ""
                        }
                        ${getColor(cell.level)}
                      `}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 flex items-center justify-end gap-2 text-xs text-gray-400">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`h-3.5 w-3.5 rounded-[2px] ${getColor(level)}`}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

// Helpers

function getTodayUTC(): string {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

function buildCalendar(history: MissionHistory[]): HeatmapCell[][] {
  const historyMap = new Map<string, number>();

  history.forEach((item) => {
    const date = item.completed_at.split("T")[0];
    historyMap.set(date, (historyMap.get(date) ?? 0) + 1);
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Go back ~52 weeks to match grid alignment
  const start = new Date(today);
  start.setDate(start.getDate() - 364);

  // Align start to preceding Sunday
  const dayOfWeek = start.getDay();
  start.setDate(start.getDate() - dayOfWeek);

  const weeks: HeatmapCell[][] = [];

  // Generate 53 weeks to ensure the full year display
  for (let w = 0; w < 53; w++) {
    const week: HeatmapCell[] = [];
    for (let d = 0; d < 7; d++) {
      const current = new Date(start);
      current.setDate(start.getDate() + (w * 7 + d));
      const dateStr = current.toISOString().split("T")[0];

      const count = historyMap.get(dateStr) ?? 0;
      week.push({
        date: dateStr,
        count,
        level: getLevel(count),
      });
    }
    weeks.push(week);
  }

  return weeks;
}

function getMonthLabels(weeks: HeatmapCell[][]): MonthLabel[] {
  const labels: MonthLabel[] = [];
  let currentMonth = -1;

  weeks.forEach((week) => {
    // Check the middle day of the week to decide which month owns this column
    const midWeekDate = new Date(week[3].date + "T00:00:00");
    const monthIndex = midWeekDate.getMonth();

    if (monthIndex !== currentMonth) {
      currentMonth = monthIndex;
      labels.push({
        label: MONTHS[monthIndex],
        colSpan: 1,
      });
    } else {
      labels[labels.length - 1].colSpan += 1;
    }
  });

  return labels;
}

function getLevel(count: number): number {
  if (count === 0) return 0;
  if (count === 1) return 1;
  if (count === 2) return 2;
  if (count === 3) return 3;
  return 4;
}

function getColor(level: number): string {
  switch (level) {
    case 0:
      return "bg-slate-700/40";
    case 1:
      return "bg-sky-600";
    case 2:
      return "bg-blue-500";
    case 3:
      return "bg-indigo-500";
    case 4:
      return "bg-violet-500";
    default:
      return "bg-slate-800";
  }
}