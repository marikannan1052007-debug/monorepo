import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { FadeUp } from "@/components/motion-wrapper";
import {
  BookOpen,
  Target,
  Trophy,
  ArrowRight,
} from "lucide-react";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* Background Glow */}

      <div className="absolute inset-0 -z-10">

        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-green-500/20 blur-[140px]" />

        <div className="absolute right-0 top-32 h-96 w-96 rounded-full bg-yellow-400/10 blur-[150px]" />

        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[160px]" />

      </div>

      {/* Navigation */}

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">

        <h1 className="text-2xl font-bold tracking-wide">
          Mission 
          <span className="text-green-400">
             CDS
          </span>
        </h1>

        <div className="flex gap-4">

          

        </div>

      </nav>

      {/* Hero */}

      <section className="mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-center px-6 text-center">

        <FadeUp>

          <span className="rounded-full border border-green-500/30 bg-green-500/10 px-5 py-2 text-sm text-green-400">
            🇮🇳 India&apos;s Smart CDS Preparation Platform
          </span>

        </FadeUp>

        <FadeUp delay={0.2}>

          <h1 className="mt-8 max-w-5xl text-5xl font-extrabold leading-tight md:text-7xl">

            Prepare for

            <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-yellow-400 bg-clip-text text-transparent">

              {" "}
              CDS{" "}

            </span>

            Like Never Before

          </h1>

        </FadeUp>

        <FadeUp delay={0.4}>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-400">

            Organize your preparation with Daily Missions,
            Track your Progress,
            Build Study Streaks,
            Analyze Performance,
            and stay consistent until exam day.

          </p>

        </FadeUp>

        <FadeUp delay={0.6}>

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <Link
              href="/auth/sign-up"
              className="group flex items-center gap-2 rounded-xl bg-green-600 px-8 py-4 text-lg font-semibold transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-green-500"
            >
              Start Preparing

              <ArrowRight
                className="transition group-hover:translate-x-1"
                size={20}
              />

            </Link>

            <Link
              href="/auth/sign-in"
              className="rounded-xl border border-white/10 px-8 py-4 text-lg font-semibold transition duration-300 hover:-translate-y-1 hover:border-green-400"
            >
              Sign In
            </Link>

          </div>

        </FadeUp>

      </section>

      {/* Feature Cards */}

      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-24 md:grid-cols-3">

        <FadeUp delay={0.8}>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-green-500/40">

            <Target
              className="mb-6 text-green-400"
              size={40}
            />

            <h2 className="text-2xl font-bold">

              Daily Missions

            </h2>

            <p className="mt-4 text-gray-400">

              Plan and complete your daily study tasks with priority tracking and deadlines.

            </p>

          </div>

        </FadeUp>

        <FadeUp delay={1}>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-green-500/40">

            <BookOpen
              className="mb-6 text-yellow-400"
              size={40}
            />

            <h2 className="text-2xl font-bold">

              Progress Tracking

            </h2>

            <p className="mt-4 text-gray-400">

              Visual dashboards, study heatmaps and progress analytics help you stay consistent.

            </p>

          </div>

        </FadeUp>

        <FadeUp delay={1.2}>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-green-500/40">

            <Trophy
              className="mb-6 text-orange-400"
              size={40}
            />

            <h2 className="text-2xl font-bold">

              Stay Motivated

            </h2>

            <p className="mt-4 text-gray-400">

              Build study streaks, unlock achievements and prepare consistently until exam day.

            </p>

          </div>

        </FadeUp>

      </section>

    </main>
  );
}