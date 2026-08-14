import { createClient } from "@/lib/supabase/server";
import NewspaperCard from "./newspaper-card";

export default async function NewspaperGrid() {
  const supabase = await createClient();

  const { data: newspapers } = await supabase
    .from("newspapers")
    .select("*")
    .eq("is_active", true)
    .order("name");

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold">
            Reading Center
          </h2>

          <p className="text-gray-400">
            Read today newspapers & current affairs
          </p>

        </div>

      </div>

      <div className="grid gap-4 md:grid-cols-2">

        {newspapers?.map((paper) => (
          <NewspaperCard
            key={paper.id}
            newspaper={paper}
          />
        ))}

      </div>

    </div>
  );
}