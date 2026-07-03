-- Add github_token to project_settings for posting releases
ALTER TABLE public.project_settings ADD COLUMN IF NOT EXISTS github_token TEXT;

-- Add notify_github to release_notes
ALTER TABLE public.release_notes ADD COLUMN IF NOT EXISTS notify_github BOOLEAN DEFAULT false;
