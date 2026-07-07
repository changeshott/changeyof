"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function generateMcpKey(projectId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  // Generate a key like: cf_mcp_xxxxxxxxxxxxxxxx
  const newKey = 'cf_mcp_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  const { error } = await supabase
    .from('projects')
    .update({ mcp_api_key: newKey })
    .eq('id', projectId)
    .eq('user_id', user.id);

  if (error) {
    console.error("Error generating MCP key:", error);
    return { error: error.message };
  }

  revalidatePath('/dashboard/mcp-server');
  return { success: true, key: newKey };
}

export async function getMcpKey(projectId: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('projects')
    .select('mcp_api_key')
    .eq('id', projectId)
    .single();

  if (error || !data) {
    return null;
  }

  return data.mcp_api_key;
}
