"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

import { createMission } from "@/app/actions/missions";
import GlassCard from "./glass-card";

const initialState = {
  success: false,
  message: "",
};

export default function MissionForm() {
  const today = new Date().toISOString().split("T")[0];

  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction] = useActionState(
    createMission,
    initialState
  );

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
      formRef.current?.reset();
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <GlassCard className="h-full p-6">
      <h2 className="text-2xl font-bold">Create Mission</h2>

      <p className="mt-2 text-sm text-gray-400">
        Add today study mission.
      </p>

      <form
        ref={formRef}
        action={formAction}
        className="mt-6 space-y-5"
      >
        {/* Mission Title */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Mission Title
          </label>

          <input
            type="text"
            name="title"
            required
            placeholder="Practice Algebra"
            className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-green-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Description
          </label>

          <textarea
            name="description"
            rows={4}
            placeholder="Complete Chapter 5 and solve 20 problems."
            className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-green-500"
          />
        </div>

        {/* Priority */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Priority
          </label>

          <select
            name="priority"
            defaultValue="Medium"
            required
            className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-green-500"
          >
            <option value="Low">🟢 Low</option>
            <option value="Medium">🟡 Medium</option>
            <option value="High">🔴 High</option>
          </select>
        </div>

        {/* Deadline */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Deadline
          </label>

          <input
            type="date"
            name="deadline"
            defaultValue={today}
            required
            className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-green-500"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-500"
        >
          Create Mission
        </button>
      </form>
    </GlassCard>
  );
}