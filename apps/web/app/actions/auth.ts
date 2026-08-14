"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  signInSchema,
  signUpSchema,
} from "@/lib/validations/auth-schema";

export type AuthState = {
  error?: string;
};

export async function signIn(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const validated = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return {
      error: validated.error.issues[0]?.message ?? "Invalid email or password.",
    };
  }

  const supabase = await createClient();

  const { error } =
    await supabase.auth.signInWithPassword(
      validated.data
    );

  if (error) {
    return {
      error: "Invalid email or password.",
    };
  }

  redirect("/dashboard");
}

export async function signUp(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const validated = signUpSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return {
      error: validated.error.issues[0]?.message ?? "Invalid form input.",
    };
  }

  const supabase = await createClient();

  const { error } =
    await supabase.auth.signUp({
      email: validated.data.email,
      password: validated.data.password,
      options: {
        data: {
          full_name: validated.data.fullName,
        },
      },
    });

  if (error) {
    return {
      error: error.message,
    };
  }

  redirect("/auth/sign-in");
}


export async function signOut() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/auth/sign-in");
}