import { z } from "zod";

export const taskSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["todo", "in_progress", "completed"]),
});

export type Task = z.infer<typeof taskSchema>;
