"use client";

import { useMemo } from "react";
import { User } from "@supabase/supabase-js";
import { Search, Menu } from "lucide-react";
import SignOutButton from "@/components/sign-out-button";

type NavbarProps = {
  user: User;
  onOpenSidebar?: () => void; // Pass handler from layout or sidebar state
};

export default function Navbar({ user, onOpenSidebar }: NavbarProps) {
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  }, []);

  const avatarLetter = useMemo(() => {
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name.charAt(0).toUpperCase();
    }
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  }, [user]);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">
      <div className="flex h-20 items-center gap-3 px-3 sm:gap-5 sm:px-6">
        
        {/* Mobile Hamburger Button */}
        <button
          onClick={onOpenSidebar}
          className="rounded-lg bg-slate-900 p-2 text-white lg:hidden"
        >
          <Menu size={22} />
        </button>

        {/* Left Section */}
        <div className="flex min-w-0 flex-1 items-center gap-4 sm:gap-5">
          {/* Greeting */}
          <div className="min-w-fit">
            <h2 className="text-base font-bold text-white sm:text-lg lg:text-xl">
              {greeting} 👋
            </h2>

            <p className="hidden text-xs text-gray-400 sm:block lg:text-sm">
              Welcome back, {user.email?.split("@")[0]}
            </p>
          </div>

          {/* Search */}
          <div className="flex flex-1 justify-center px-2 sm:px-4">
            <div className="flex w-full max-w-[180px] items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 transition-all duration-300 hover:border-green-400/40 hover:bg-white/10 focus-within:border-green-400 sm:max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl">
              <Search size={18} className="shrink-0 text-gray-400" />
              <input
                type="text"
                placeholder="Search missions..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 text-lg font-bold text-black shadow-lg shadow-green-500/20">
            {avatarLetter}
          </div>

          <div className="hidden sm:block">
            <SignOutButton />
          </div>
        </div>

      </div>
    </header>
  );
}