"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getSubscribers(projectId: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('subscribers')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching subscribers:", error);
    return [];
  }

  return data;
}

export async function addSubscriber(projectId: string, email: string, name?: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const { error } = await supabase
    .from('subscribers')
    .insert({
      project_id: projectId,
      email,
      name,
      user_id: user.id
    });

  if (error) {
    console.error("Error adding subscriber:", error);
    return { error: error.message };
  }

  revalidatePath('/dashboard/subscribers');
  return { success: true };
}

export async function deleteSubscriber(subscriberId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const { error } = await supabase
    .from('subscribers')
    .delete()
    .eq('id', subscriberId);

  if (error) {
    console.error("Error deleting subscriber:", error);
    return { error: error.message };
  }

  revalidatePath('/dashboard/subscribers');
  return { success: true };
}
