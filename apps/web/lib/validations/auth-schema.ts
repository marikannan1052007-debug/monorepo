import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export const signUpSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters"),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});