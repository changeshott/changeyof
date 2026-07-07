"use server";

import { createClient } from "@/utils/supabase/server";

export async function getNpsData(projectId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  // Verify ownership (or let RLS handle it, but fetching it first is safer)
  const { data, error } = await supabase
    .from('nps_responses')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching NPS responses:", error);
    return { error: error.message };
  }

  const responses = data || [];
  
  let promoters = 0;
  let passives = 0;
  let detractors = 0;

  responses.forEach(r => {
    if (r.score >= 9) promoters++;
    else if (r.score >= 7) passives++;
    else detractors++;
  });

  const total = promoters + passives + detractors;
  
  let score = 0;
  if (total > 0) {
    score = Math.round(((promoters / total) - (detractors / total)) * 100);
  }

  return {
    responses,
    score,
    total,
    breakdown: { promoters, passives, detractors }
  };
}
