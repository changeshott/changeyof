-- Migration to add project_settings table

CREATE TABLE public.project_settings (
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE PRIMARY KEY,
  
  -- Brand & Theme
  theme_mode TEXT DEFAULT 'auto' CHECK (theme_mode IN ('light', 'dark', 'auto')),
  accent_color TEXT DEFAULT 'indigo',
  font_family TEXT DEFAULT 'inter',
  button_style TEXT DEFAULT 'solid' CHECK (button_style IN ('solid', 'outline', 'ghost')),
  
  -- Widget Trigger Options
  trigger_type TEXT DEFAULT 'floating' CHECK (trigger_type IN ('floating', 'custom', 'embed')),
  unseen_badge BOOLEAN DEFAULT true,
  
  -- Custom Domain & SEO
  custom_domain TEXT,
  seo_title TEXT,
  seo_description TEXT,
  seo_og_image TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.project_settings ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view settings of their own projects" 
ON public.project_settings FOR SELECT USING (
  project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid())
);

CREATE POLICY "Users can insert settings of their own projects" 
ON public.project_settings FOR INSERT WITH CHECK (
  project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid())
);

CREATE POLICY "Users can update settings of their own projects" 
ON public.project_settings FOR UPDATE USING (
  project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid())
);

CREATE POLICY "Users can delete settings of their own projects" 
ON public.project_settings FOR DELETE USING (
  project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid())
);

-- Trigger to create empty settings when a project is created
CREATE OR REPLACE FUNCTION public.handle_new_project_settings() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.project_settings (project_id)
  VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_project_created
  AFTER INSERT ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_project_settings();

-- Seed settings for existing projects
INSERT INTO public.project_settings (project_id)
SELECT id FROM public.projects
ON CONFLICT (project_id) DO NOTHING;
