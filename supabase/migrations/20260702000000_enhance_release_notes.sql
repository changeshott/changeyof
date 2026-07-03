-- Enhance Release Notes table with scheduled_for, version, and tags array
-- Drop the existing CHECK constraint on 'type' if it exists to allow flexibility
DO $$ 
DECLARE 
    constraint_name text;
BEGIN
    SELECT conname INTO constraint_name
    FROM pg_constraint
    WHERE conrelid = 'public.release_notes'::regclass
      AND contype = 'c' 
      AND pg_get_constraintdef(oid) ILIKE '%type%';
      
    IF constraint_name IS NOT NULL THEN
        EXECUTE 'ALTER TABLE public.release_notes DROP CONSTRAINT ' || constraint_name;
    END IF;
END $$;

ALTER TABLE public.release_notes ADD COLUMN IF NOT EXISTS scheduled_for TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.release_notes ADD COLUMN IF NOT EXISTS version TEXT;
ALTER TABLE public.release_notes ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';
