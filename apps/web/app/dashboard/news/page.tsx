import { createClient } from "@/lib/supabase/server";
import { Newspaper, ExternalLink } from "lucide-react";

export default async function NewsPage() {
  const supabase = await createClient();

  const { data: newspapers, error } = await supabase
    .from("newspapers")
    .select("*")
    .eq("is_active", true)
    .order("name");

  if (error) {
    return (
      <main className="p-8 text-white">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
          <h2 className="text-xl font-semibold text-red-400">
            Failed to load newspapers
          </h2>
          <p className="mt-2 text-gray-300">{error.message}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="space-y-8 p-6 lg:p-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">
          📰 Daily Reading Center
        </h1>

        <p className="mt-2 text-gray-400">
          Stay updated with newspapers and current affairs for CDS preparation.
        </p>
      </div>

      {/* Newspaper Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {newspapers?.map((paper) => (
          <div
            key={paper.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-green-500/40 hover:bg-white/10"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="rounded-xl bg-green-500/20 p-3">
                  <Newspaper
                    className="text-green-400"
                    size={24}
                  />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {paper.name}
                  </h2>

                  <p className="mt-1 text-gray-400">
                    {paper.language}
                  </p>

                  <span className="mt-3 inline-block rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-300">
                    {paper.category}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-700">
                <ExternalLink size={18} />
                Read
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {newspapers?.length === 0 && (
        <div className="rounded-2xl border border-dashed border-white/20 p-10 text-center">
          <Newspaper
            className="mx-auto mb-4 text-gray-500"
            size={48}
          />

          <h2 className="text-2xl font-semibold text-white">
            No Newspapers Found
          </h2>

          <p className="mt-2 text-gray-400">
            Add newspapers to your Supabase database to display them here.
          </p>
        </div>
      )}
    </main>
  );
}