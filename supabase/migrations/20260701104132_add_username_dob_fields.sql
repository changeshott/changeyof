-- Add username and date_of_birth to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS username TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS date_of_birth DATE;
