import { signOut } from "@/app/actions/auth";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
      >
        <LogOut size={18} />
        <span className="hidden md:inline">Sign Out</span>
      </button>
    </form>
  );
}