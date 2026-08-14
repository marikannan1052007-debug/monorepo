import { toggleTopic } from "@/app/actions/syllabus";
import { CheckCircle2, Circle } from "lucide-react";

export default function SyllabusTopic({
  topic,
}: {
  topic: {
    id: string;
    title: string;
    completed: boolean;
  };
}) {
  return (
    <form
      action={toggleTopic.bind(
        null,
        topic.id,
        topic.completed
      )}
      className="flex items-center justify-between rounded-xl border border-white/10 p-4"
    >
      <div>
        <h3>{topic.title}</h3>
      </div>

      <button>
        {topic.completed ? (
          <CheckCircle2 className="text-green-400" />
        ) : (
          <Circle className="text-gray-500" />
        )}
      </button>
    </form>
  );
}