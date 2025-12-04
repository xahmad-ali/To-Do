-- Supabase Database Schema for Events

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  phone_number TEXT,
  date_time TIMESTAMPTZ,
  location TEXT,
  cost_per_person TEXT,
  description TEXT,
  flyer_image TEXT,
  background_image TEXT,
  capacity INTEGER,
  photo_gallery JSONB DEFAULT '[]'::jsonb,
  links JSONB DEFAULT '[]'::jsonb,
  custom_modules JSONB DEFAULT '[]'::jsonb,
  privacy TEXT,
  announcements TEXT,
  is_draft BOOLEAN DEFAULT true,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for phone number lookups
CREATE INDEX IF NOT EXISTS idx_events_phone_number ON events(phone_number);

-- Index for draft status
CREATE INDEX IF NOT EXISTS idx_events_is_draft ON events(is_draft);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for re-running the script)
DROP POLICY IF EXISTS "Anyone can read all events" ON events;
DROP POLICY IF EXISTS "Anyone can read published events" ON events;
DROP POLICY IF EXISTS "Users can insert events" ON events;
DROP POLICY IF EXISTS "Users can update their own events" ON events;
DROP POLICY IF EXISTS "Users can delete their own events" ON events;
DROP POLICY IF EXISTS "Users can read their own drafts" ON events;
DROP POLICY IF EXISTS "Anyone can insert events" ON events;
DROP POLICY IF EXISTS "Anyone can update events" ON events;
DROP POLICY IF EXISTS "Anyone can delete events" ON events;

-- Policy: Anyone can read all events (published and drafts)
CREATE POLICY "Anyone can read all events" ON events
  FOR SELECT
  USING (true);

-- Policy: Anyone can insert events (for anonymous/public access)
CREATE POLICY "Anyone can insert events" ON events
  FOR INSERT
  WITH CHECK (true);

-- Policy: Anyone can update events (for anonymous/public access)
CREATE POLICY "Anyone can update events" ON events
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Policy: Anyone can delete events (for anonymous/public access)
CREATE POLICY "Anyone can delete events" ON events
  FOR DELETE
  USING (true);
