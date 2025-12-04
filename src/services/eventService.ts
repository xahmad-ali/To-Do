import { supabase } from '../config/supabase';
import type { Event } from '../types/event';

// Helper function to convert Event to database format (camelCase to snake_case)
const eventToDbFormat = (event: Partial<Event>) => {
  return {
    name: event.name,
    phone_number: event.phoneNumber,
    date_time: event.dateTime,
    location: event.location,
    cost_per_person: event.costPerPerson,
    description: event.description,
    flyer_image: event.flyerImage,
    background_image: event.backgroundImage,
    capacity: event.capacity,
    photo_gallery: event.photoGallery,
    links: event.links,
    custom_modules: event.customModules,
    privacy: event.privacy,
    announcements: event.announcements,
  };
};

// Helper function to convert database format to Event (snake_case to camelCase)
const dbToEventFormat = (dbEvent: {
  id: string;
  name?: string | null;
  phone_number?: string | null;
  date_time?: string | null;
  location?: string | null;
  cost_per_person?: string | null;
  description?: string | null;
  flyer_image?: string | null;
  background_image?: string | null;
  capacity?: number | null;
  photo_gallery?: string[] | null;
  links?: Array<{ id: string; title: string; url: string }> | null;
  custom_modules?: Array<{ id: string; type: string; title: string; content: string }> | null;
  privacy?: string | null;
  announcements?: string | null;
}): Event => {
  return {
    id: dbEvent.id,
    name: dbEvent.name || '',
    phoneNumber: dbEvent.phone_number || '',
    dateTime: dbEvent.date_time || '',
    location: dbEvent.location || '',
    costPerPerson: dbEvent.cost_per_person || '',
    description: dbEvent.description || '',
    flyerImage: dbEvent.flyer_image ?? null,
    backgroundImage: dbEvent.background_image ?? null,
    capacity: dbEvent.capacity ?? undefined,
    photoGallery: dbEvent.photo_gallery || [],
    links: dbEvent.links || [],
    customModules: (dbEvent.custom_modules || []) as Event['customModules'],
    privacy: dbEvent.privacy ?? undefined,
    announcements: dbEvent.announcements ?? undefined,
  };
};

export const eventService = {
  // Create a new event
  async createEvent(event: Omit<Event, 'id'>): Promise<Event | null> {
    try {
      const dbEvent = eventToDbFormat(event);
      const { data, error } = await supabase
        .from('events')
        .insert([dbEvent])
        .select()
        .single();

      if (error) throw error;
      return dbToEventFormat(data);
    } catch (error) {
      console.error('Error creating event:', error);
      return null;
    }
  },

  // Get event by ID
  async getEventById(id: string): Promise<Event | null> {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return dbToEventFormat(data);
    } catch (error) {
      console.error('Error fetching event:', error);
      return null;
    }
  },

  // Update event
  async updateEvent(id: string, updates: Partial<Event>): Promise<Event | null> {
    try {
      const dbUpdates = eventToDbFormat(updates);
      const { data, error } = await supabase
        .from('events')
        .update(dbUpdates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return dbToEventFormat(data);
    } catch (error) {
      console.error('Error updating event:', error);
      return null;
    }
  },

  // Delete event
  async deleteEvent(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting event:', error);
      return false;
    }
  },

  // Get all events (optional - for listing)
  async getAllEvents(): Promise<Event[]> {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []).map(dbToEventFormat);
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  },

  // Save draft (by phone number)
  async saveDraft(phoneNumber: string, event: Partial<Event>): Promise<Event | null> {
    try {
      console.log('saveDraft called with:', { phoneNumber, event });

      // First check if draft exists
      const { data: existing, error: checkError } = await supabase
        .from('events')
        .select('*')
        .eq('phone_number', phoneNumber)
        .eq('is_draft', true)
        .maybeSingle();

      if (checkError) {
        console.error('Error checking for existing draft:', checkError);
        throw checkError;
      }

      if (existing) {
        console.log('Updating existing draft:', existing.id);
        // Update existing draft
        const dbUpdates = eventToDbFormat({ ...event, phoneNumber });
        const { data, error } = await supabase
          .from('events')
          .update({ ...dbUpdates, is_draft: true })
          .eq('id', existing.id)
          .select()
          .single();

        if (error) {
          console.error('Error updating draft:', error);
          throw error;
        }
        return dbToEventFormat(data);
      } else {
        console.log('Creating new draft');
        // Create new draft
        const newEvent = { ...event, phoneNumber } as Event;
        const dbEvent = eventToDbFormat(newEvent);
        console.log('Inserting event data:', { ...dbEvent, is_draft: true });

        const { data, error } = await supabase
          .from('events')
          .insert([{ ...dbEvent, is_draft: true }])
          .select()
          .single();

        if (error) {
          console.error('Error creating draft:', error);
          throw error;
        }
        return dbToEventFormat(data);
      }
    } catch (error) {
      console.error('Error saving draft:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message, error.stack);
      }
      return null;
    }
  },

  // Publish event (go live)
  async publishEvent(id: string): Promise<Event | null> {
    try {
      console.log('Publishing event with ID:', id);
      const { data, error } = await supabase
        .from('events')
        .update({ is_draft: false, published_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error publishing event:', error);
        throw error;
      }
      console.log('Event published successfully:', data);
      return dbToEventFormat(data);
    } catch (error) {
      console.error('Error publishing event:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message, error.stack);
      }
      return null;
    }
  },
};
