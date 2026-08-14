"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleTopic(topicId: string, completed: boolean) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data } = await supabase
    .from("user_topic_progress")
    .select("id")
    .eq("user_id", user.id)
    .eq("topic_id", topicId)
    .maybeSingle();

  if (data) {
    await supabase
      .from("user_topic_progress")
      .update({
        completed: !completed,
      })
      .eq("id", data.id);
  } else {
    await supabase
      .from("user_topic_progress")
      .insert({
        user_id: user.id,
        topic_id: topicId,
        completed: true,
      });
  }

  revalidatePath("/dashboard/syllabus");
  revalidatePath("/dashboard");
}