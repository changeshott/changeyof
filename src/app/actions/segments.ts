"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getSegments(projectId: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('segments')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching segments:", error);
    return [];
  }

  return data;
}

export async function createSegment(projectId: string, name: string, description: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const { error } = await supabase
    .from('segments')
    .insert({
      project_id: projectId,
      name,
      description,
      user_id: user.id
    });

  if (error) {
    console.error("Error creating segment:", error);
    return { error: error.message };
  }

  revalidatePath('/dashboard/segments');
  return { success: true };
}

export async function deleteSegment(segmentId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const { error } = await supabase
    .from('segments')
    .delete()
    .eq('id', segmentId);

  if (error) {
    console.error("Error deleting segment:", error);
    return { error: error.message };
  }

  revalidatePath('/dashboard/segments');
  return { success: true };
}
