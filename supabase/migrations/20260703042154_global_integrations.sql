-- 1. Create new table for user-level integrations
CREATE TABLE public.user_integrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  provider TEXT NOT NULL,
  account_username TEXT,
  access_token TEXT,
  refresh_token TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable RLS for the new table
ALTER TABLE public.user_integrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own integrations" 
ON public.user_integrations 
FOR ALL USING (auth.uid() = user_id);

-- 3. Modify project_settings to relate to user_integrations
ALTER TABLE public.project_settings
DROP COLUMN IF EXISTS x_access_token,
DROP COLUMN IF EXISTS x_refresh_token,
DROP COLUMN IF EXISTS x_username,
ADD COLUMN IF NOT EXISTS twitter_integration_id UUID REFERENCES public.user_integrations(id) ON DELETE SET NULL;


