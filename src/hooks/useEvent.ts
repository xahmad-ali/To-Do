import { useState, useEffect } from 'react';
import { eventService } from '../services/eventService';
import type { Event } from '../types/event';

export const useEvent = (eventId?: string) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (eventId) {
      loadEvent(eventId);
    }
  }, [eventId]);

  const loadEvent = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await eventService.getEventById(id);
      setEvent(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load event');
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (newEvent: Omit<Event, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      const data = await eventService.createEvent(newEvent);
      if (data) {
        setEvent(data);
      }
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create event');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateEvent = async (id: string, updates: Partial<Event>) => {
    setLoading(true);
    setError(null);
    try {
      const data = await eventService.updateEvent(id, updates);
      if (data) {
        setEvent(data);
      }
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update event');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const saveDraft = async (phoneNumber: string, eventData: Partial<Event>) => {
    setLoading(true);
    setError(null);
    try {
      const data = await eventService.saveDraft(phoneNumber, eventData);
      if (data) {
        setEvent(data);
      }
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save draft');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const publishEvent = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await eventService.publishEvent(id);
      if (data) {
        setEvent(data);
      }
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to publish event');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    event,
    loading,
    error,
    loadEvent,
    createEvent,
    updateEvent,
    saveDraft,
    publishEvent,
  };
};
