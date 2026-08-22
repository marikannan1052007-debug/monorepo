import GlassCard from "./glass-card";
import { createClient } from "@/lib/supabase/server";
import { CheckCircle2, Circle } from "lucide-react";

export default async function TodaysMissions() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const today = new Date().toISOString().split("T")[0];

  const { data: missions } = await supabase
    .from("missions")
    .select(`
      *,
      subjects(name)
    `)
    .eq("user_id", user.id)
    .eq("deadline", today)
    .order("priority", { ascending: false });

  return (
    <GlassCard className="p-6">

      <h2 className="mb-6 text-2xl font-bold">
        Today Missions is completeing week 13
      </h2>

      {!missions?.length ? (
        <p className="text-gray-400">
          No missions for today 🎉
        </p>
      ) : (
        <div className="space-y-4">

          {missions.map((mission) => (

            <div
              key={mission.id}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 p-4"
            >

              <div>

                <h3 className="font-semibold">
                  {mission.title}
                </h3>

                <p className="text-sm text-gray-400">
                  {mission.subjects?.name}
                </p>

              </div>

              {mission.completed ? (
                <CheckCircle2 className="text-green-400" />
              ) : (
                <Circle className="text-gray-500" />
              )}

            </div>

          ))}

        </div>
      )}

    </GlassCard>
  );
}