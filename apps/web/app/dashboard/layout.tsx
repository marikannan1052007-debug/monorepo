import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import Sidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/Navbar";
import AppBackground from "@/components/dashboard/app-background";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return (
    <>
      <AppBackground />

      <div className="min-h-screen text-white">
        <Sidebar />

        <div className="lg:ml-72">
          <Navbar user={user} />

          <main className="px-6 py-6">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}