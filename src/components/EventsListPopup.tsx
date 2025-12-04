import { useEffect, useState } from 'react';
import { eventService } from '../services/eventService';
import type { Event } from '../types/event';
import { BsFillRocketTakeoffFill } from 'react-icons/bs';

interface EventsListPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EventsListPopup = ({ isOpen, onClose }: EventsListPopupProps) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadEvents();
    }
  }, [isOpen]);

  const loadEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const allEvents = await eventService.getAllEvents();
      setEvents(allEvents);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'No date set';
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Popup Content */}
      <div
        className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 w-full max-w-4xl max-h-[80vh] shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/80 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">All Events</h2>
          <p className="text-white/60 text-sm">Browse all created events</p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pr-2">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-white/60">Loading events...</div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-red-400">{error}</div>
            </div>
          ) : events.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <BsFillRocketTakeoffFill className="w-16 h-16 text-white/30 mb-4" />
              <p className="text-white/60 text-lg">No events found</p>
              <p className="text-white/40 text-sm mt-2">Create your first event to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all"
                >
                  {/* Event Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {event.name || 'Untitled Event'}
                      </h3>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-2 text-sm">
                    {event.phoneNumber && (
                      <div className="flex items-center gap-2 text-white/70">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{event.phoneNumber}</span>
                      </div>
                    )}

                    {event.dateTime && (
                      <div className="flex items-center gap-2 text-white/70">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{formatDate(event.dateTime)}</span>
                      </div>
                    )}

                    {event.location && (
                      <div className="flex items-center gap-2 text-white/70">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="truncate">{event.location}</span>
                      </div>
                    )}

                    {event.costPerPerson && (
                      <div className="flex items-center gap-2 text-white/70">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{event.costPerPerson}</span>
                      </div>
                    )}
                  </div>

                  {/* Event Preview Image */}
                  {event.backgroundImage && (
                    <div className="mt-4 rounded-xl overflow-hidden">
                      <img
                        src={event.backgroundImage}
                        alt={event.name || 'Event'}
                        className="w-full h-32 object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
          <p className="text-white/60 text-sm">
            {events.length} {events.length === 1 ? 'event' : 'events'} total
          </p>
          <button
            onClick={loadEvents}
            className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl text-white border border-white/20 hover:bg-white/15 transition-colors text-sm"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};
