-- Create a policy allowing anyone to read published release notes
-- This is necessary for the public widget to fetch data without authentication

CREATE POLICY "Anyone can view published releases"
ON public.release_notes
FOR SELECT
USING (status = 'published');
