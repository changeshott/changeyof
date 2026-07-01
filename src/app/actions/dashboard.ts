"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

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
  const type = formData.get("type") as string;
  const status = formData.get("status") as string || "published";
  const project_id = formData.get("project_id") as string;

  if (!title || !content || !project_id) {
    return { error: "Missing required fields" };
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // SECURITY FIX: Verify the user owns the project (IDOR protection)
  const { data: project } = await supabase.from("projects").select("id").eq("id", project_id).eq("user_id", user.id).single();
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
  }).select().single();

  if (error) {
    console.error("Error creating release:", error);
    return { error: error.message };
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
  const type = formData.get("type") as string;
  const status = formData.get("status") as string || "published";
  const project_id = formData.get("project_id") as string;

  if (!title || !content || !project_id) {
    return { error: "Missing required fields" };
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Need to ensure the user owns the project this release belongs to
  const { data: project } = await supabase.from("projects").select("id").eq("id", project_id).eq("user_id", user.id).single();
  
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
  }).eq("id", id).select().single();

  if (error) {
    console.error("Error updating release:", error);
    return { error: error.message };
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
