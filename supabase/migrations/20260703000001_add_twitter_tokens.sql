ALTER TABLE public.project_settings 
ADD COLUMN IF NOT EXISTS x_access_token TEXT,
ADD COLUMN IF NOT EXISTS x_refresh_token TEXT,
ADD COLUMN IF NOT EXISTS x_username TEXT;
