"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import {
  deleteMission,
  toggleMission,
} from "@/app/actions/missions";

type Mission = {
  id: string;
  completed: boolean;
};

type MissionActionsProps = {
  mission: Mission;
};

export default function MissionActions({
  mission,
}: MissionActionsProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      const result = await toggleMission(
        mission.id,
        mission.completed
      );

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this mission?"
    );

    if (!confirmed) return;

    startTransition(async () => {
      const result = await deleteMission(mission.id);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

 return (
  <>
    <button
      type="button"
      disabled={isPending}
      onClick={handleToggle}
      className="rounded-xl bg-green-500/20 px-4 py-2 text-sm font-medium text-green-400 transition hover:bg-green-500/30 disabled:opacity-50"
    >
      {mission.completed ? "Mark Pending" : "Mark Complete"}
    </button>

    <button
      type="button"
      disabled={isPending}
      onClick={handleDelete}
      className="rounded-xl bg-red-500/20 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/30 disabled:opacity-50"
    >
      Delete
    </button>
  </>
);
}