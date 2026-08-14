import GlassCard from "./glass-card";
import { Newspaper, Bookmark, ExternalLink } from "lucide-react";

type Newspaper = {
  id: number;
  name: string;
  language: string;
  category: string;
};

export default function NewspaperCard({
  newspaper,
}: {
  newspaper: Newspaper;
}) {
  return (
    <GlassCard className="p-5 hover:scale-[1.02] transition">
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="rounded-xl bg-blue-500/20 p-3">
            <Newspaper className="text-blue-400" />
          </div>

          <div>
            <h2 className="font-semibold text-lg">
              {newspaper.name}
            </h2>

            <p className="text-sm text-gray-400">
              {newspaper.language}
            </p>

            <span className="text-xs rounded bg-green-500/20 px-2 py-1 mt-2 inline-block">
              {newspaper.category}
            </span>
          </div>

        </div>

        <div className="flex gap-2">

          <button className="rounded-lg p-2 hover:bg-white/10">
            <Bookmark size={18}/>
          </button>

          <button className="rounded-lg p-2 hover:bg-white/10">
            <ExternalLink size={18}/>
          </button>

        </div>

      </div>
    </GlassCard>
  );
}