CREATE TABLE public.feedbacks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  release_id UUID REFERENCES public.release_notes(id) ON DELETE CASCADE NOT NULL,
  sentiment TEXT NOT NULL CHECK (sentiment IN ('positive', 'neutral', 'negative')),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.feedbacks ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert feedback
CREATE POLICY "Anyone can insert feedback" 
ON public.feedbacks FOR INSERT 
WITH CHECK (true);

-- Allow project owners to read feedbacks for their releases
CREATE POLICY "Users can view feedbacks of their projects" 
ON public.feedbacks FOR SELECT USING (
  release_id IN (SELECT id FROM public.release_notes WHERE project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid()))
);

-- Allow project owners to delete feedbacks
CREATE POLICY "Users can delete feedbacks of their projects" 
ON public.feedbacks FOR DELETE USING (
  release_id IN (SELECT id FROM public.release_notes WHERE project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid()))
);
