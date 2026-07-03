-- Migration to add Integrations and API settings to project_settings table

ALTER TABLE public.project_settings 
ADD COLUMN slack_webhook_url TEXT,
ADD COLUMN discord_webhook_url TEXT,
ADD COLUMN vercel_webhook_secret TEXT,
ADD COLUMN gitlab_webhook_secret TEXT,
ADD COLUMN enable_email_newsletter BOOLEAN DEFAULT false,
ADD COLUMN public_api_key TEXT;
