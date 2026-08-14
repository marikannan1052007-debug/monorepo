"use server";

import { missionSchema } from "@/lib/validations/mission-val";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createMission(
  prevState: unknown,
  formData: FormData
) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const result = missionSchema.safeParse({
      title: formData.get("title"),
      description: formData.get("description"),
      priority: formData.get("priority"),
      deadline: formData.get("deadline"),
    });

    if (!result.success) {
      return {
        success: false,
        message: result.error.issues[0].message,
      };
    }

    const {
      title,
      description,
      priority,
      deadline,
    } = result.data;

    const { error } = await supabase
      .from("missions")
      .insert({
        title,
        description,
        priority,
        deadline,
        user_id: user.id,
      });

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    revalidatePath("/missions");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Mission created successfully 🚀",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    };
  }
}

export async function updateMission(
  id: string,
  formData: FormData
) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const result = missionSchema.safeParse({
      title: formData.get("title"),
      description: formData.get("description"),
      priority: formData.get("priority"),
      deadline: formData.get("deadline"),
    });

    if (!result.success) {
      throw new Error(result.error.issues[0].message);
    }

    const {
      title,
      description,
      priority,
      deadline,
    } = result.data;

    const { error } = await supabase
      .from("missions")
      .update({
        title,
        description,
        priority,
        deadline,
      })
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) throw new Error(error.message);

    revalidatePath("/missions");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Mission updated successfully ✏️",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Update failed",
    };
  }
}

export async function deleteMission(id: string) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const { error } = await supabase
      .from("missions")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) throw new Error(error.message);

    revalidatePath("/missions");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Mission deleted 🗑️",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Delete failed",
    };
  }
}

export async function toggleMission(
  id: string,
  completed: boolean
) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const newCompleted = !completed;

    const { error } = await supabase
      .from("missions")
      .update({
        completed: newCompleted,
        completed_at: newCompleted
          ? new Date().toISOString()
          : null,
      })
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) throw new Error(error.message);

    if (newCompleted) {
      await supabase
        .from("mission_history")
        .insert({
          mission_id: id,
          completed_at: new Date().toISOString(),
        });
    }

    revalidatePath("/missions");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: newCompleted
        ? "Mission completed 🎉"
        : "Mission marked as pending 🔄",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Update failed",
    };
  }
}