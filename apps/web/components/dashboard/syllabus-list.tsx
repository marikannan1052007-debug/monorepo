import { createClient } from "@/lib/supabase/server";
import SyllabusCard from "./syllabus-card";
import type { Subject, Topic, UserTopicProgress } from "@/types/syllabus";

export default async function SyllabusList() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: subjects } = await supabase
    .from("subjects")
    .select(`
      *,
      topics:syllabus_topics(
        *,
        user_topic_progress(
          completed,
          user_id
        )
      )
    `);

  const formatted =
    subjects?.map((subject: Subject) => ({
      ...subject,
      topics: subject.topics.map((topic: Topic) => ({
        ...topic,
        completed:
          topic.user_topic_progress.some(
            (p: UserTopicProgress) =>
              p.user_id === user.id &&
              p.completed
          ),
      })),
    })) ?? [];

  return (
    <div className="grid gap-6">
      {formatted.map((subject: Subject) => (
        <SyllabusCard
          key={subject.id}
          subject={subject}
        />
      ))}
    </div>
  );
}