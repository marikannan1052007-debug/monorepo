import MissionForm from "@/components/dashboard/mission-form";
import MissionList from "@/components/dashboard/mission-list";
import { createClient } from "@/lib/supabase/server";

export default async function MissionsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>Please login</div>;
  }

  const { data: missions } = await supabase
    .from("missions")
    .select(
      `
      *,
      subjects(name)
    `
    )
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  return (
    <>
      
<div className="grid gap-6 lg:grid-cols-3 items-stretch">

  <div className="h-[760px]">
    <MissionForm />
  </div>

  <div className="lg:col-span-2 h-[760px]">
    <MissionList missions={missions ?? []} />
  </div>

</div>
    </>
  );
}