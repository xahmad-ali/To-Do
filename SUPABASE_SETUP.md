# Supabase Setup Guide

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project
4. Wait for the project to be fully provisioned

## 2. Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (this is your `VITE_SUPABASE_URL`)
   - **anon/public key** (this is your `VITE_SUPABASE_ANON_KEY`)

## 3. Set Up Environment Variables

1. Create a `.env` file in the root of your project:
```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

2. Make sure `.env` is in your `.gitignore` file

## 4. Run the Database Schema

1. In your Supabase project, go to **SQL Editor**
2. Copy the contents of `src/database/schema.sql`
3. Paste and run it in the SQL Editor
4. This will create the `events` table with all necessary columns and policies

**Important:** If you're getting "row-level security policy" errors (401 Unauthorized), run the SQL from `src/database/fix_rls_policies.sql` to update the RLS policies to allow anonymous access.

## 5. Verify Setup

The database schema includes:
- `events` table with all event fields
- Row Level Security (RLS) policies
- Indexes for performance
- Automatic timestamp updates

## API Functions Available

The `eventService` provides:
- `createEvent()` - Create a new event
- `getEventById()` - Get event by ID
- `updateEvent()` - Update an existing event
- `deleteEvent()` - Delete an event
- `getAllEvents()` - Get all events
- `saveDraft()` - Save/update draft by phone number
- `publishEvent()` - Publish an event (go live)

## Usage Example

```typescript
import { eventService } from './services/eventService';

// Create event
const event = await eventService.createEvent({
  name: 'My Event',
  phoneNumber: '1234567890',
  // ... other fields
});

// Save draft
const draft = await eventService.saveDraft('1234567890', {
  name: 'Draft Event',
  // ... other fields
});
```
