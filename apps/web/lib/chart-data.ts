interface Mission {
  completed_at?: string | null;
}

export function buildStudyChart(missions: Mission[]) {
  const map = new Map<string, number>();

  for (const mission of missions) {
    if (!mission.completed_at) continue;

    const day = new Date(mission.completed_at)
      .toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

    map.set(day, (map.get(day) ?? 0) + 1);
  }

  return [...map.entries()].map(([day, completed]) => ({
    day,
    completed,
  }));
}