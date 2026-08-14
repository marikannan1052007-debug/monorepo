import { createClient } from "@/lib/supabase/server";
import type {
  Mission,
  Subject,
  FormattedSubject,
  MissionHistory,
} from "@/types/analytics";

export type DashboardAnalytics = {
  missions: Mission[];
  subjects: FormattedSubject[];
  history: MissionHistory[];
};

export async function getDashboardAnalytics(): Promise<DashboardAnalytics | null> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) return null;

  // ===========================
  // Missions
  // ===========================

  const { data: missions, error: missionsError } = await supabase
    .from("missions")
    .select("*")
    .eq("user_id", user.id);

    const { data: history } = await supabase
  .from("mission_history")
  .select("completed_at");

  if (missionsError) {
    console.error(missionsError);
    throw missionsError;
  }

  // ===========================
  // Subjects
  // ===========================

  const { data: subjects, error: subjectsError } = await supabase
    .from("subjects")
    .select(`
      id,
      name,
      icon,
      color,
      syllabus_topics(
        id,
        topic_name,
        user_topic_progress(
          completed,
          user_id
        )
      )
    `);

  if (subjectsError) {
    console.error(subjectsError);
    throw subjectsError;
  }

  const formattedSubjects: FormattedSubject[] =
    (subjects as Subject[] | null)?.map((subject) => ({
      id: subject.id,
      name: subject.name,
      topics: (subject.syllabus_topics ?? []).map((topic) => ({
        id: topic.id,
        topic_name: topic.topic_name,
        completed:
          topic.user_topic_progress?.[0]?.completed ?? false,
      })),
    })) ?? [];

  return {
  missions: (missions ?? []) as Mission[],
  subjects: formattedSubjects,
  history: (history ?? []) as MissionHistory[],
};
}