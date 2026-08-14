"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { updateMission } from "@/app/actions/missions";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Mission = {
  id: string;
  title: string;
  description: string | null;
  priority: "Low" | "Medium" | "High";
  deadline: string | null;
};

type EditMissionDialogProps = {
  mission: Mission;
};

export default function EditMissionDialog({
  mission,
}: EditMissionDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await updateMission(
        mission.id,
        formData
      );

      if (result.success) {
        toast.success(result.message);
        setOpen(false);
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
  render={
    <button
      type="button"
      className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-blue-400 transition hover:bg-blue-500/20"
    />
  }
>
  Edit
</DialogTrigger>

      <DialogContent className="max-w-xl rounded-3xl border border-white/10 bg-[#111827] text-white backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            ✏️ Edit Mission
          </DialogTitle>

          <DialogDescription className="text-gray-400">
            Update your study mission details.
          </DialogDescription>
        </DialogHeader>

        <form
          action={handleSubmit}
          className="mt-4 space-y-5"
        >
          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Mission Title
            </label>

            <input
              type="text"
              name="title"
              defaultValue={mission.title}
              required
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
              defaultValue={mission.description ?? ""}
              rows={4}
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
              defaultValue={mission.priority}
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
              defaultValue={
                mission.deadline
                  ? mission.deadline.split("T")[0]
                  : ""
              }
              className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-green-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
              className="border-white/10 bg-transparent text-white hover:bg-white/10"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isPending}
              className="min-w-[160px] rounded-xl bg-green-600 text-white hover:bg-green-500"
            >
              {isPending ? "Saving..." : "💾 Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}