"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getWebhooks(projectId: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('webhooks')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching webhooks:", error);
    return [];
  }

  return data;
}

export async function createWebhook(projectId: string, url: string, events: string[]) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  // Generate a random secret for webhook signing
  const secret = 'whsec_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  const { error } = await supabase
    .from('webhooks')
    .insert({
      project_id: projectId,
      url,
      events,
      secret,
      user_id: user.id
    });

  if (error) {
    console.error("Error creating webhook:", error);
    return { error: error.message };
  }

  revalidatePath('/dashboard/webhooks');
  return { success: true };
}

export async function deleteWebhook(webhookId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const { error } = await supabase
    .from('webhooks')
    .delete()
    .eq('id', webhookId);

  if (error) {
    console.error("Error deleting webhook:", error);
    return { error: error.message };
  }

  revalidatePath('/dashboard/webhooks');
  return { success: true };
}
