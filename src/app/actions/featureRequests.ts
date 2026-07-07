"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getFeatureRequests(projectId: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('feature_requests')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching feature requests:", error);
    return [];
  }

  return data;
}

export async function updateFeatureRequestStatus(requestId: string, status: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const { error } = await supabase
    .from('feature_requests')
    .update({ status })
    .eq('id', requestId);

  if (error) {
    console.error("Error updating status:", error);
    return { error: error.message };
  }

  revalidatePath('/dashboard/feature-requests');
  return { success: true };
}

export async function createFeatureRequest(projectId: string, title: string, description: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const { error } = await supabase
    .from('feature_requests')
    .insert({
      project_id: projectId,
      title,
      description,
      user_id: user.id,
      status: 'under_review'
    });

  if (error) {
    console.error("Error creating feature request:", error);
    return { error: error.message };
  }

  revalidatePath('/dashboard/feature-requests');
  return { success: true };
}
