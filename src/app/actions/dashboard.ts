"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

async function broadcastToSlack(url: string, release: any, projectName: string) {
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `🚀 *New Release Published: ${projectName}*\n*${release.title}*\n\n${release.content.substring(0, 200)}...`
      })
    });
  } catch (e) {
    console.error("Slack broadcast failed", e);
  }
}

async function broadcastToDiscord(url: string, release: any, projectName: string) {
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `🚀 **New Release Published: ${projectName}**\n**${release.title}**\n\n${release.content.substring(0, 200)}...`
      })
    });
  } catch (e) {
    console.error("Discord broadcast failed", e);
  }
}

export async function completeOnboarding(formData: FormData) {
  const supabase = await createClient();
  const role = (formData.get("role") as string)?.slice(0, 100);
  const usage_intent = (formData.get("usage_intent") as string)?.slice(0, 100);
  const username = (formData.get("username") as string)?.slice(0, 100);
  const date_of_birth = (formData.get("date_of_birth") as string);
  const projectName = (formData.get("projectName") as string)?.slice(0, 100);
  const projectDomain = (formData.get("projectDomain") as string)?.slice(0, 100);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  // Project name is not required if they skipped
  // if (!projectName) return { error: "Project name is required" };

  // Update user profile (using upsert in case the trigger didn't run for older accounts)
  const { error: profileError } = await supabase
    .from("users")
    .upsert({
      id: user.id,
      email: user.email,
      full_name: user.user_metadata?.full_name || "",
      avatar_url: user.user_metadata?.avatar_url || "",
      role,
      usage_intent,
      username,
      date_of_birth
    }, { onConflict: "id" });

  if (profileError) {
    console.error("Error updating profile:", profileError);
  }

  // Set cookie to mark onboarding as completed (even if project is skipped)
  const cookieStore = await cookies();
  cookieStore.set("onboarding_completed", "true", { path: "/" });

  // Create first project only if name was provided
  if (projectName) {
    const projectFormData = new FormData();
    projectFormData.append("name", projectName);
    if (projectDomain) projectFormData.append("domain", projectDomain);

    const result = await createProject(projectFormData);
    if (result.error) return result;
  }

  revalidatePath("/dashboard");
  return { success: true };
}

export async function skipEmptyState() {
  const cookieStore = await cookies();
  cookieStore.set("skip_empty_state", "true", { path: "/" });
  revalidatePath("/dashboard");
  return { success: true };
}

export async function createProject(formData: FormData) {
  const supabase = await createClient();
  const name = (formData.get("name") as string)?.slice(0, 100); // Max 100 chars
  const domain = (formData.get("domain") as string)?.slice(0, 100);
  const github_repo = (formData.get("github_repo") as string)?.slice(0, 100) || null;
  // Generate random webhook secret for new projects
  const github_webhook_secret = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  if (!name || name.trim() === "") {
    return { error: "Project name is required" };
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Not authenticated" };
  }

  // BUSINESS LOGIC & SECURITY FIX: Limit projects to prevent resource exhaustion
  const { count, error: countError } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  if (countError) {
    return { error: "Failed to verify project limits" };
  }

  // Misal limit gratis adalah 2 Project
  if (count !== null && count >= 2) {
    return { error: "Limit Reached: Free tier allows maximum of 2 projects. Please upgrade to create more." };
  }



  const { data, error } = await supabase.from("projects").insert({
    user_id: user.id,
    name,
    domain,
    github_repo,
    github_webhook_secret,
  }).select().single();

  if (error) {
    console.error("Error creating project:", error);
    return { error: error.message };
  }

  revalidatePath("/dashboard/projects");
  revalidatePath("/dashboard/widget");
  return { success: true, project: data };
}

export async function createRelease(formData: FormData) {
  const supabase = await createClient();
  const title = (formData.get("title") as string)?.slice(0, 150);
  const content = (formData.get("content") as string)?.slice(0, 5000);
  let type = formData.get("type") as string;
  if (!['New', 'Fix', 'Improvement'].includes(type)) {
    type = 'New';
  }
  const status = formData.get("status") as string || "published";
  const project_id = formData.get("project_id") as string;
  
  const scheduled_for = formData.get("scheduled_for") as string || null;
  const version = formData.get("version") as string || null;
  const slug = formData.get("slug") as string || null;
  const meta_title = formData.get("meta_title") as string || null;
  const meta_description = formData.get("meta_description") as string || null;
  const notify_slack = formData.get("notify_slack") === "true";
  const notify_twitter = formData.get("notify_twitter") === "true";
  const target_segment = formData.get("target_segment") as string || "all";
  
  const tagsString = formData.get("tags") as string;
  let tags: string[] = [];
  try {
    if (tagsString) tags = JSON.parse(tagsString);
  } catch (e) {
    // Ignore JSON parse error
  }

  if (!title || !content || !project_id) {
    return { error: "Missing required fields" };
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Not authenticated" };
  }

  // SECURITY FIX: Verify the user owns the project (IDOR protection)
  const { data: project } = await supabase.from("projects").select("id, name").eq("id", project_id).eq("user_id", user.id).single();
  if (!project) {
    return { error: "Unauthorized: You do not own this project" };
  }

  const { data, error } = await supabase.from("release_notes").insert({
    project_id,
    title,
    content,
    type,
    status,
    published_at: status === "published" ? new Date().toISOString() : null,
    scheduled_for,
    version,
    tags,
    slug,
    meta_title,
    meta_description,
    notify_slack,
    notify_twitter,
    target_segment
  }).select().single();

  if (error) {
    console.error("Error creating release:", error);
    return { error: error.message };
  }

  // Handle broadcasting
  if (status === "published") {
    const { data: settings } = await supabase.from("project_settings").select("slack_webhook_url, discord_webhook_url").eq("project_id", project_id).single();
    if (settings) {
      if (settings.slack_webhook_url) await broadcastToSlack(settings.slack_webhook_url, data, project.name);
      if (settings.discord_webhook_url) await broadcastToDiscord(settings.discord_webhook_url, data, project.name);
    }
  }

  revalidatePath("/dashboard/releases");
  revalidatePath("/dashboard");
  return { success: true, release: data };
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = await createClient();
  const name = (formData.get("name") as string)?.slice(0, 100);
  const domain = (formData.get("domain") as string)?.slice(0, 100);
  const github_repo = (formData.get("github_repo") as string)?.slice(0, 100) || null;

  if (!name || name.trim() === "") {
    return { error: "Project name is required" };
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { data, error } = await supabase.from("projects").update({
    name,
    domain,
    github_repo,
  }).eq("id", id).eq("user_id", user.id).select().single();

  if (error) {
    console.error("Error updating project:", error);
    return { error: error.message };
  }

  revalidatePath("/dashboard/projects");
  revalidatePath("/dashboard/widget");
  return { success: true, project: data };
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase.from("projects").delete().eq("id", id).eq("user_id", user.id);

  if (error) {
    console.error("Error deleting project:", error);
    return { error: error.message };
  }

  revalidatePath("/dashboard/projects");
  revalidatePath("/dashboard/releases");
  revalidatePath("/dashboard/widget");
  return { success: true };
}

export async function updateRelease(id: string, formData: FormData) {
  const supabase = await createClient();
  const title = (formData.get("title") as string)?.slice(0, 150);
  const content = (formData.get("content") as string)?.slice(0, 5000);
  let type = formData.get("type") as string;
  if (!['New', 'Fix', 'Improvement'].includes(type)) {
    type = 'New';
  }
  const status = formData.get("status") as string || "published";
  const project_id = formData.get("project_id") as string;

  const scheduled_for = formData.get("scheduled_for") as string || null;
  const version = formData.get("version") as string || null;
  const slug = formData.get("slug") as string || null;
  const meta_title = formData.get("meta_title") as string || null;
  const meta_description = formData.get("meta_description") as string || null;
  const notify_slack = formData.get("notify_slack") === "true";
  const notify_twitter = formData.get("notify_twitter") === "true";
  const target_segment = formData.get("target_segment") as string || "all";

  const tagsString = formData.get("tags") as string;
  let tags: string[] = [];
  try {
    if (tagsString) tags = JSON.parse(tagsString);
  } catch (e) {
    // Ignore parse error
  }

  if (!title || !content || !project_id) {
    return { error: "Missing required fields" };
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Need to ensure the user owns the project this release belongs to
  const { data: project } = await supabase.from("projects").select("id, name").eq("id", project_id).eq("user_id", user.id).single();

  if (!project) {
    return { error: "Unauthorized" };
  }

  const { data, error } = await supabase.from("release_notes").update({
    project_id,
    title,
    content,
    type,
    status,
    published_at: status === "published" ? new Date().toISOString() : null,
    scheduled_for,
    version,
    tags,
    slug,
    meta_title,
    meta_description,
    notify_slack,
    notify_twitter,
    target_segment
  }).eq("id", id).select().single();

  if (error) {
    console.error("Error updating release:", error);
    return { error: error.message };
  }

  // Handle broadcasting if status changes to published
  if (status === "published") {
    const { data: settings } = await supabase.from("project_settings").select("slack_webhook_url, discord_webhook_url").eq("project_id", project_id).single();
    if (settings) {
      if (settings.slack_webhook_url) await broadcastToSlack(settings.slack_webhook_url, data, project.name);
      if (settings.discord_webhook_url) await broadcastToDiscord(settings.discord_webhook_url, data, project.name);
    }
  }

  revalidatePath("/dashboard/releases");
  revalidatePath("/dashboard");
  return { success: true, release: data };
}

export async function deleteRelease(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Find the release and verify user owns the project
  const { data: release } = await supabase.from("release_notes").select("project_id").eq("id", id).single();
  if (!release) return { error: "Release not found" };

  const { data: project } = await supabase.from("projects").select("id").eq("id", release.project_id).eq("user_id", user.id).single();
  if (!project) return { error: "Unauthorized" };

  const { error } = await supabase.from("release_notes").delete().eq("id", id);

  if (error) {
    console.error("Error deleting release:", error);
    return { error: error.message };
  }

  revalidatePath("/dashboard/releases");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateProjectSettings(projectId: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Verify ownership
  const { data: project } = await supabase.from("projects").select("id").eq("id", projectId).eq("user_id", user.id).single();
  if (!project) return { error: "Unauthorized" };

  // Fetch existing settings to merge them and allow partial updates
  const { data: existingSettings } = await supabase
    .from("project_settings")
    .select("*")
    .eq("project_id", projectId)
    .single();

  const theme_mode = formData.has("theme_mode") ? formData.get("theme_mode") as string : existingSettings?.theme_mode || "auto";
  const accent_color = formData.has("accent_color") ? formData.get("accent_color") as string : existingSettings?.accent_color || "indigo";
  const font_family = formData.has("font_family") ? formData.get("font_family") as string : existingSettings?.font_family || "inter";
  const button_style = formData.has("button_style") ? formData.get("button_style") as string : existingSettings?.button_style || "solid";
  
  const trigger_type = formData.has("trigger_type") ? formData.get("trigger_type") as string : existingSettings?.trigger_type || "floating";
  const unseen_badge = formData.has("unseen_badge") ? formData.get("unseen_badge") === "true" : existingSettings?.unseen_badge ?? true;
  
  const header_title = formData.has("header_title") ? formData.get("header_title") as string : existingSettings?.header_title || "Latest Updates";
  const header_description = formData.has("header_description") ? formData.get("header_description") as string : existingSettings?.header_description || "What's new in our product";
  const trigger_icon = formData.has("trigger_icon") ? formData.get("trigger_icon") as string : existingSettings?.trigger_icon || "bell";
  const widget_position = formData.has("widget_position") ? formData.get("widget_position") as string : existingSettings?.widget_position || "bottom-right";
  const hide_branding = formData.has("hide_branding") ? formData.get("hide_branding") === "true" : existingSettings?.hide_branding ?? false;
  
  const custom_domain = formData.has("custom_domain") ? formData.get("custom_domain") as string || null : existingSettings?.custom_domain;
  const seo_title = formData.has("seo_title") ? formData.get("seo_title") as string || null : existingSettings?.seo_title;
  const seo_description = formData.has("seo_description") ? formData.get("seo_description") as string || null : existingSettings?.seo_description;
  const seo_og_image = formData.has("seo_og_image") ? formData.get("seo_og_image") as string || null : existingSettings?.seo_og_image;

  const slack_webhook_url = formData.has("slack_webhook_url") ? formData.get("slack_webhook_url") as string || null : existingSettings?.slack_webhook_url;
  const discord_webhook_url = formData.has("discord_webhook_url") ? formData.get("discord_webhook_url") as string || null : existingSettings?.discord_webhook_url;
  const vercel_webhook_secret = formData.has("vercel_webhook_secret") ? formData.get("vercel_webhook_secret") as string || null : existingSettings?.vercel_webhook_secret;
  const gitlab_webhook_secret = formData.has("gitlab_webhook_secret") ? formData.get("gitlab_webhook_secret") as string || null : existingSettings?.gitlab_webhook_secret;
  const enable_email_newsletter = formData.has("enable_email_newsletter") ? formData.get("enable_email_newsletter") === "true" : existingSettings?.enable_email_newsletter ?? false;
  const public_api_key = formData.has("public_api_key") ? formData.get("public_api_key") as string || null : existingSettings?.public_api_key;

  const { data, error } = await supabase.from("project_settings").upsert({
    project_id: projectId,
    theme_mode,
    accent_color,
    font_family,
    button_style,
    trigger_type,
    unseen_badge,
    header_title,
    header_description,
    trigger_icon,
    widget_position,
    hide_branding,
    custom_domain,
    seo_title,
    seo_description,
    seo_og_image,
    slack_webhook_url,
    discord_webhook_url,
    vercel_webhook_secret,
    gitlab_webhook_secret,
    enable_email_newsletter,
    public_api_key,
    updated_at: new Date().toISOString()
  }).select().single();

  if (error) {
    console.error("Error updating settings:", error);
    return { error: error.message };
  }

  revalidatePath(`/dashboard/projects/${projectId}/settings`);
  revalidatePath("/dashboard/widget");
  return { success: true, settings: data };
}

export async function sendMonthlyNewsletter(projectId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Verify ownership
  const { data: project } = await supabase.from("projects").select("id, name").eq("id", projectId).eq("user_id", user.id).single();
  if (!project) return { error: "Unauthorized" };

  const { data: settings } = await supabase.from("project_settings").select("enable_email_newsletter").eq("project_id", projectId).single();
  if (!settings?.enable_email_newsletter) {
    return { error: "Newsletter feature is not enabled for this project." };
  }

  // Fetch published releases from the last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data: releases } = await supabase
    .from("release_notes")
    .select("title, content, published_at")
    .eq("project_id", projectId)
    .eq("status", "published")
    .gte("published_at", thirtyDaysAgo.toISOString())
    .order("published_at", { ascending: false });

  if (!releases || releases.length === 0) {
    return { success: true, message: "No releases in the past 30 days to send." };
  }

  // Mock sending email
  console.log(`[Mock Mailer] Sending Newsletter for ${project.name}...`);
  console.log(`[Mock Mailer] Found ${releases.length} releases.`);
  console.log(`[Mock Mailer] Content: \n`, releases.map(r => `- ${r.title}`).join('\n'));
  
  return { success: true, message: "Newsletter successfully sent (mock simulation)." };
}
