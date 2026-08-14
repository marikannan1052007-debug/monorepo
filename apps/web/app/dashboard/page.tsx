
import StudyHeatmap from "@/components/analytics/study-heatmap";
import SubjectProgress from "@/components/analytics/subject-progress";
import StudyStreak from "@/components/analytics/study-streak";
import Achievements from "@/components/analytics/achievements";

import TodaysMissions from "@/components/dashboard/todays-missions";

import { getDashboardAnalytics } from "@/lib/analytics";

export default async function DashboardPage() {
  const analytics = await getDashboardAnalytics();

  if (!analytics) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      

      <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">

        {/* Heatmap */}
        <StudyHeatmap history={analytics.history} />

        {/* Progress + Streak */}
        <div className="grid gap-6 lg:grid-cols-2">
          <SubjectProgress
            subjects={analytics.subjects}
          />

          <StudyStreak
            history={analytics.history}
          />
        </div>



        {/* Today's Missions */}
        <TodaysMissions />


        {/* Achievements */}
        <Achievements history={analytics.history} />
      </div>
    </main>
  );
}