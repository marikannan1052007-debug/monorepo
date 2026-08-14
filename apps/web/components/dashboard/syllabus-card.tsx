import GlassCard from "./glass-card";
import SyllabusTopic from "./syllabus-topic";

export default function SyllabusCard({
  subject,
}: {
  subject: {
    name: string;
    topics: {
      id: string;
      title: string;
      completed: boolean;
    }[];
  };
}) {
  const completed = subject.topics.filter(
    (t: { completed: boolean }) => t.completed
  ).length;

  const percent =
    subject.topics.length === 0
      ? 0
      : Math.round(
          (completed / subject.topics.length) * 100
        );

  return (
    <GlassCard className="p-6">

      <div className="flex justify-between">

        <h2 className="text-xl font-bold">
          {subject.name}
        </h2>

        <span>{percent}%</span>

      </div>

      <div className="mt-3 h-2 rounded bg-white/10">
        <div
          className="h-full rounded bg-green-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="mt-6 space-y-3">
        {subject.topics.map((topic: { id: string; title: string; completed: boolean }) => (
          <SyllabusTopic
            key={topic.id}
            topic={topic}
          />
        ))}
      </div>

    </GlassCard>
  );
}