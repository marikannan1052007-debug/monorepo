"use client";
import EditMissionDialog from "./edit-mission";
import { useMemo, useState } from "react";
import GlassCard from "./glass-card";
import MissionActions from "./mission-action";

type Mission = {
  id: string;
  title: string;
  description: string | null;
  priority: "Low" | "Medium" | "High";
  completed: boolean;
  deadline: string | null;
  subjects: {
    name: string;
  } | null;
};

type MissionListProps = {
  missions: Mission[];
};

const PAGE_SIZE = 3;

export default function MissionList({
  missions,
}: MissionListProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  const filteredMissions = useMemo(() => {
    return missions.filter((mission) => {
      const matchesSearch = mission.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all"
          ? true
          : filter === "pending"
          ? !mission.completed
          : mission.completed;

      return matchesSearch && matchesFilter;
    });
  }, [missions, search, filter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredMissions.length / PAGE_SIZE)
  );

  const paginated = filteredMissions.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  

  return (
    <GlassCard className="flex h-full flex-col p-6">

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Today Missions
        </h2>

        <span className="text-sm text-gray-400">
          {filteredMissions.length} Missions
        </span>
      </div>

      <input
        className="mt-5 w-full rounded-xl border border-white/10 bg-black/20 p-3 outline-none"
        placeholder="Search mission..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <div className="mt-4 flex gap-2">
        {["all", "pending", "completed"].map((item) => (
          <button
            key={item}
            onClick={() => {
              setFilter(item as "all" | "pending" | "completed");
              setPage(1);
            }}
            className={`rounded-lg px-4 py-2 capitalize transition ${
              filter === item
                ? "bg-green-600 text-white"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-6 flex-1 space-y-4 overflow-y-auto pr-2">

        {paginated.length === 0 && (
          <div className="rounded-xl border border-dashed border-white/10 py-12 text-center">
            No missions found.
          </div>
        )}

        {paginated.map((mission) => (
          <div
            key={mission.id}
            className="rounded-2xl border border-white/10 bg-black/20 p-5"
          >
            <h3 className="text-lg font-semibold">
              {mission.title}
            </h3>

            {mission.description && (
              <p className="mt-2 text-sm text-gray-400">
                {mission.description}
              </p>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-400">
                {mission.subjects?.name ?? "No Subject"}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs ${
                  mission.priority === "High"
                    ? "bg-red-500/20 text-red-400"
                    : mission.priority === "Medium"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-green-500/20 text-green-400"
                }`}
              >
                {mission.priority}
              </span>

              {mission.completed && (
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-400">
                  Completed
                </span>
              )}
            </div>

            {mission.deadline && (
              <p className="mt-4 text-sm text-gray-400">
                Deadline:{" "}
                {new Date(mission.deadline).toLocaleDateString("en-in")}
              </p>
            )}

          <div className="mt-4 flex gap-3">
  <MissionActions mission={mission} />
  <EditMissionDialog mission={mission} />
</div>
            
          </div>
        ))}

      </div>

      {totalPages > 1 && (
  <div className="mt-auto border-t border-white/10 pt-4">
  <div className="flex items-center justify-between">
    <button
      onClick={() => setPage((p) => Math.max(1, p - 1))}
      disabled={page === 1}
      className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 disabled:opacity-40"
    >
      ← Previous
    </button>

    <span className="text-sm text-gray-400">
      Page {page} of {totalPages}
    </span>

    <button
      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
      disabled={page === totalPages}
      className="rounded-xl border border-white/10 bg-green-600 px-4 py-2 disabled:opacity-40"
    >
      Next →
    </button>
  </div>
</div>
)}
    </GlassCard>
  );
}