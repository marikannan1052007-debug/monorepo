"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Target,
  Newspaper,
  BookOpen,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const menus = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Missions", href: "/dashboard/missions", icon: Target },
  { name: "News", href: "/dashboard/news", icon: Newspaper },
  { name: "Syllabus", href: "/dashboard/syllabus", icon: BookOpen },
  
  
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu */}
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-slate-900 p-2 lg:hidden"
      >
        <Menu size={22} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-white/10 bg-[#0B1120] lg:flex lg:flex-col">        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 bg-[#0B1120] transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        <SidebarContent
          pathname={pathname}
          onClick={() => setOpen(false)}
        />
      </aside>
    </>
  );
}

function SidebarContent({
  pathname,
  onClick,
}: {
  pathname: string;
  onClick?: () => void;
}) {
  return (
    <>
      <div className="border-b border-white/10 p-8">
        <h1 className="text-3xl font-bold text-green-400">
          Mission CDS
        </h1>

        <p className="mt-2 text-gray-400">
          Prepare. Practice. Perform.
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {menus.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClick}
              className={`flex items-center gap-4 rounded-xl px-4 py-3 transition ${
                pathname === item.href
                  ? "bg-green-500/20 text-green-400"
                  : "hover:bg-white/5"
              }`}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </>
  );
}