"use client";

import { useActionState } from "react";
import { signUp, type AuthState } from "@/app/actions/auth";

const initialState: AuthState = {
  error: "",
};

export default function SignUpPage() {
  const [state, formAction, pending] = useActionState(
    signUp,
    initialState
  );

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#050816] px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <h1 className="text-center text-3xl font-bold text-white">
          Create Account
        </h1>

        <p className="mt-2 text-center text-gray-400">
          Start your CDS preparation journey
        </p>

        <form action={formAction} className="mt-8 space-y-5">

          {state.error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
              {state.error}
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Full Name
            </label>

            <input
              name="fullName"
              type="text"
              placeholder="John Doe"
              className="w-full rounded-lg border border-gray-700 bg-[#111827] px-4 py-3 text-white outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Email
            </label>

            <input
              name="email"
              type="email"
              placeholder="john@gmail.com"
              className="w-full rounded-lg border border-gray-700 bg-[#111827] px-4 py-3 text-white outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Password
            </label>

            <input
              name="password"
              type="password"
              placeholder="********"
              className="w-full rounded-lg border border-gray-700 bg-[#111827] px-4 py-3 text-white outline-none focus:border-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-500 disabled:opacity-50"
          >
            {pending ? "Creating Account..." : "Create Account"}
          </button>

        </form>
      </div>
    </main>
  );
}