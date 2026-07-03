-- Add SEO and Webhook Metadata fields
ALTER TABLE public.release_notes ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;
ALTER TABLE public.release_notes ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE public.release_notes ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE public.release_notes ADD COLUMN IF NOT EXISTS notify_slack BOOLEAN DEFAULT false;
ALTER TABLE public.release_notes ADD COLUMN IF NOT EXISTS notify_twitter BOOLEAN DEFAULT false;
