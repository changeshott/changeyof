-- Add GitHub integration columns to projects table
ALTER TABLE public.projects 
ADD COLUMN github_repo TEXT,
ADD COLUMN github_webhook_secret TEXT;
