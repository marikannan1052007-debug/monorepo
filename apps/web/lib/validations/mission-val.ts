import { z } from "zod";



export const missionSchema = z.object({

  title: z

    .string()

    .trim()

    .min(3, "Title must be at least 3 characters")

    .max(100, "Title must be less than 100 characters"),



  description: z

    .string()

    .trim()

    .max(500, "Description is too long")

    .optional(),



 



  priority: z.enum(["Low", "Medium", "High"]),



  deadline: z.string().min(1, "Deadline is required"),

});