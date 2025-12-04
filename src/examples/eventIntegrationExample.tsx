/**
 * Example: How to integrate Supabase with your existing App.tsx
 *
 * This shows how to use the eventService and useEvent hook in your components
 */

import { useState } from 'react';
import { eventService } from '../services/eventService';
import { useEvent } from '../hooks/useEvent';
import type { Event } from '../types/event';

// Example 1: Using the eventService directly
export const ExampleDirectService = () => {
  const handleCreateEvent = async () => {
    const newEvent: Omit<Event, 'id'> = {
      name: 'My Event',
      phoneNumber: '1234567890',
      dateTime: '2024-12-31T20:00:00',
      location: 'New York',
      costPerPerson: '$50',
      description: 'A great event',
      flyerImage: null,
      backgroundImage: null,
      photoGallery: [],
      links: [],
      customModules: [],
    };

    const created = await eventService.createEvent(newEvent);
    if (created) {
      console.log('Event created:', created);
    }
  };

  return <button onClick={handleCreateEvent}>Create Event</button>;
};

// Example 2: Using the useEvent hook
export const ExampleWithHook = ({ eventId }: { eventId: string }) => {
  const { event, loading, error, updateEvent, publishEvent } = useEvent(eventId);

  const handlePublish = async () => {
    if (event) {
      await publishEvent(event.id);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!event) return <div>No event found</div>;

  return (
    <div>
      <h1>{event.name}</h1>
      <button onClick={handlePublish}>Publish Event</button>
    </div>
  );
};

// Example 3: Save draft when user clicks "Go live" popup submit
export const ExampleSaveDraft = () => {
  const handleGoLive = async (phoneNumber: string, eventData: Partial<Event>) => {
    // Save as draft first
    const draft = await eventService.saveDraft(phoneNumber, eventData);

    if (draft) {
      // Then publish it
      const published = await eventService.publishEvent(draft.id);
      if (published) {
        console.log('Event published:', published);
      }
    }
  };

  return null;
};
