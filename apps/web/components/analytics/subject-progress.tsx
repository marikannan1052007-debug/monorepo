import GlassCard from "@/components/dashboard/glass-card";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Topic = {
  completed: boolean;
};

type Subject = {
  id: string;
  name: string;
  topics: Topic[];
};

export default function SubjectProgress({
  subjects,
}: {
  subjects: Subject[];
}) {
  return (
    <GlassCard className="p-6">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold">
            Subject Progress
          </h2>

          <p className="text-sm text-gray-400">
            Track your syllabus completion
          </p>
        </div>

        <Link
          href="/dashboard/syllabus"
          className="flex items-center gap-1 text-green-400 hover:text-green-300"
        >
          View All
          <ChevronRight size={18} />
        </Link>

      </div>

      <div className="space-y-6">

        {subjects.map((subject) => {

          const total = subject.topics.length;

          const completed = subject.topics.filter(
            (topic) => topic.completed
          ).length;

          const percent =
            total === 0
              ? 0
              : Math.round((completed / total) * 100);

          return (
            <div key={subject.id}>

              <div className="mb-2 flex justify-between">

                <span className="font-medium">
                  {subject.name}
                </span>

                <span className="text-green-400">
                  {percent}%
                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-white/10">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-700"
                  style={{
                    width: `${percent}%`,
                  }}
                />

              </div>

              <p className="mt-2 text-xs text-gray-500">

                {completed} of {total} Topics Completed

              </p>

            </div>
          );
        })}

      </div>

    </GlassCard>
  );
}