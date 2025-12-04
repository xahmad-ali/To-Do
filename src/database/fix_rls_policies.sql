-- Fix RLS Policies for Events Table
-- Run this in Supabase SQL Editor if you're getting "row-level security policy" errors

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can read published events" ON events;
DROP POLICY IF EXISTS "Users can insert events" ON events;
DROP POLICY IF EXISTS "Users can update their own events" ON events;
DROP POLICY IF EXISTS "Users can delete their own events" ON events;
DROP POLICY IF EXISTS "Users can read their own drafts" ON events;

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
