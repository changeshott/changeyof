-- SQL Schema for Changeyof SaaS

-- 1. Tabel Projects
-- Menyimpan data proyek/website tempat widget dipasang
CREATE TABLE public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  domain TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Mengaktifkan RLS (Row Level Security) untuk Projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own projects" 
ON public.projects FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own projects" 
ON public.projects FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects" 
ON public.projects FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects" 
ON public.projects FOR DELETE USING (auth.uid() = user_id);


-- 2. Tabel Release Notes
-- Menyimpan catatan rilis yang dibuat di AI-Editor
CREATE TABLE public.release_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('New', 'Fix', 'Improvement')),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS untuk Release Notes
ALTER TABLE public.release_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view releases of their projects" 
ON public.release_notes FOR SELECT USING (
  project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid())
);

CREATE POLICY "Users can insert releases to their projects" 
ON public.release_notes FOR INSERT WITH CHECK (
  project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid())
);

CREATE POLICY "Users can update releases of their projects" 
ON public.release_notes FOR UPDATE USING (
  project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid())
);

CREATE POLICY "Users can delete releases of their projects" 
ON public.release_notes FOR DELETE USING (
  project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid())
);


-- 3. Tabel Metrics (Engagement)
-- Menyimpan analytics views & reactions
CREATE TABLE public.metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  release_id UUID REFERENCES public.release_notes(id) ON DELETE CASCADE NOT NULL,
  views_count INTEGER DEFAULT 0,
  reactions JSONB DEFAULT '{"likes": 0, "love": 0, "hooray": 0}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view metrics of their projects" 
ON public.metrics FOR SELECT USING (
  release_id IN (SELECT id FROM public.release_notes WHERE project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid()))
);

-- (Dalam skenario nyata, update metrics dilakukan via server dengan service role / rls baypass, 
--  tapi untuk admin kita set juga polanya)
CREATE POLICY "Users can manage metrics of their projects" 
ON public.metrics FOR ALL USING (
  release_id IN (SELECT id FROM public.release_notes WHERE project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid()))
);
