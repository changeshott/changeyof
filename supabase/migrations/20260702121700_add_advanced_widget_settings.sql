ALTER TABLE public.project_settings
ADD COLUMN IF NOT EXISTS header_title TEXT DEFAULT 'Latest Updates',
ADD COLUMN IF NOT EXISTS header_description TEXT DEFAULT 'What''s new in our product',
ADD COLUMN IF NOT EXISTS trigger_icon TEXT DEFAULT 'bell' CHECK (trigger_icon IN ('bell', 'megaphone', 'sparkles')),
ADD COLUMN IF NOT EXISTS widget_position TEXT DEFAULT 'bottom-right' CHECK (widget_position IN ('bottom-right', 'bottom-left')),
ADD COLUMN IF NOT EXISTS hide_branding BOOLEAN DEFAULT false;
