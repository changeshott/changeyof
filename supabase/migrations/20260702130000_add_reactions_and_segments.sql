-- 1. Add user ID to feedbacks
ALTER TABLE public.feedbacks ADD COLUMN IF NOT EXISTS user_id_ext TEXT;

-- 2. Emoji Reactions
CREATE TABLE public.emoji_reactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  release_id UUID REFERENCES public.release_notes(id) ON DELETE CASCADE NOT NULL,
  emoji TEXT NOT NULL CHECK (emoji IN ('thumbs_up', 'heart', 'rocket', 'party_popper')),
  user_id_ext TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.emoji_reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert emoji reactions" 
ON public.emoji_reactions FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can view emoji reactions of their projects" 
ON public.emoji_reactions FOR SELECT USING (
  release_id IN (SELECT id FROM public.release_notes WHERE project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid()))
);

-- 3. Release Views (Tracking reads)
CREATE TABLE public.release_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  release_id UUID REFERENCES public.release_notes(id) ON DELETE CASCADE NOT NULL,
  user_id_ext TEXT NOT NULL,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(release_id, user_id_ext)
);

ALTER TABLE public.release_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert release views" 
ON public.release_views FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can view release views of their projects" 
ON public.release_views FOR SELECT USING (
  release_id IN (SELECT id FROM public.release_notes WHERE project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid()))
);

-- 4. Target Segments for Release Notes
ALTER TABLE public.release_notes ADD COLUMN IF NOT EXISTS target_segment TEXT DEFAULT 'all';
