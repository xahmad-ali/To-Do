import { useState } from 'react';
import { FcCalendar } from 'react-icons/fc';
import { GrLocationPin } from 'react-icons/gr';
import { BsCash, BsFillRocketTakeoffFill } from "react-icons/bs";
import type { Event, CustomModule, Link } from '../types/event';

interface EventFormProps {
  event: Event;
  onEventChange: (field: keyof Event, value: string | number | string[] | null | CustomModule[] | Link[]) => void;
  onAddModule: (type: CustomModule['type']) => void;
  onGoLive: () => Promise<void>;
  isSubmitting?: boolean;
}

type AvailableField = 'capacity' | 'photoGallery' | 'links' | 'privacy' | 'announcements';

export const EventForm = ({ event, onEventChange, onAddModule, onGoLive, isSubmitting = false }: EventFormProps) => {
  const [activeFields, setActiveFields] = useState<AvailableField[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState({ hours: '08', minutes: '35', ampm: 'PM' });

  const availableButtons: AvailableField[] = ['capacity', 'photoGallery', 'links', 'privacy', 'announcements'];

  const handleAddField = (field: AvailableField) => {
    if (!activeFields.includes(field)) {
      setActiveFields([...activeFields, field]);
    }
  };

  const getButtonLabel = (field: AvailableField) => {
    switch (field) {
      case 'capacity': return 'Add capacity';
      case 'photoGallery': return 'Photo gallery';
      case 'links': return 'Links';
      case 'privacy': return 'Privacy';
      case 'announcements': return 'Announcements';
    }
  };

  const getButtonIcon = (field: AvailableField) => {
    switch (field) {
      case 'capacity':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'photoGallery':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'links':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        );
      case 'privacy':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        );
      case 'announcements':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
        );
    }
  };

  const unusedButtons = availableButtons.filter(btn => !activeFields.includes(btn));

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl">
      {/* Title */}
      <h1 className="text-4xl font-bold text-white/80">Name your event</h1>

      {/* Draft Save Input */}
      <div className="relative">
        <input
          type="tel"
          placeholder="Enter phone number to save the draft"
          value={event.phoneNumber}
          onChange={(e) => onEventChange('phoneNumber', e.target.value)}
          className="w-full px-4 py-4 pl-12 pr-14 bg-gray-700/50 backdrop-blur-sm rounded-2xl border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
          style={{ animation: 'moving-glow 3s ease-in-out infinite' }}
        />
        {/* Floppy Disk Icon */}
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
        {/* Right Arrow Button */}
        <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Combined Input Box for Date, Location, Cost */}
      <div className="bg-gray-700/50 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden" style={{ animation: 'moving-glow 3s ease-in-out infinite' }}>
        {/* Date and Time */}
        <div className="relative border-b border-white/10">
          <div
            onClick={() => {
              if (event.dateTime) {
                const date = new Date(event.dateTime);
                const hours = date.getHours();
                const hour12 = hours % 12 || 12;
                const minutes = date.getMinutes().toString().padStart(2, '0');
                const ampm = hours >= 12 ? 'PM' : 'AM';
                setSelectedDate(event.dateTime.split('T')[0]);
                setSelectedTime({ hours: hour12.toString().padStart(2, '0'), minutes, ampm });
              }
              setShowDateTimePicker(true);
            }}
            className="w-full px-4 py-4 pl-12 bg-transparent text-white cursor-pointer min-h-[56px] flex items-center"
          >
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
              <FcCalendar className="w-5 h-5" />
              {!event.dateTime && (
                <span className="text-white/60 text-sm">Date and Time</span>
              )}
            </div>
            {event.dateTime && (
              <span className="absolute left-12 top-1/2 -translate-y-1/2 text-white pointer-events-none">
                {new Date(event.dateTime).toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Location */}
        <div className="relative border-b border-white/10">
          <input
            type="text"
            placeholder="Location"
            value={event.location}
            onChange={(e) => onEventChange('location', e.target.value)}
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    const { latitude, longitude } = position.coords;
                    onEventChange('location', `${latitude}, ${longitude}`);
                  },
                  (error) => {
                    console.error('Error getting location:', error);
                  }
                );
              }
            }}
            className="w-full px-4 py-4 pl-12 bg-transparent text-white placeholder-white/60 focus:outline-none cursor-pointer"
          />
          <GrLocationPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
        </div>

        {/* Cost per Person */}
        <div className="relative">
          <input
            type="text"
            placeholder="Cost per person"
            value={event.costPerPerson}
            onChange={(e) => onEventChange('costPerPerson', e.target.value)}
            className="w-full px-4 py-4 pl-12 bg-transparent text-white placeholder-white/60 focus:outline-none"
          />
          <BsCash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" style={{ filter: 'drop-shadow(0 0 1px white)' }} />
        </div>
      </div>

      {/* Description */}
      <textarea
        placeholder="Describe your event"
        value={event.description}
        onChange={(e) => onEventChange('description', e.target.value)}
        rows={3}
        className="w-full px-4 py-4 bg-gray-700/50 backdrop-blur-sm rounded-2xl border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
        style={{ animation: 'moving-glow 3s ease-in-out infinite' }}
      />

      {/* Dynamic Fields - Only show first 3 unused buttons */}
      <div className="flex items-center gap-3 flex-wrap">
        {unusedButtons.slice(0, 3).map((field) => (
          <button
            key={field}
            onClick={() => handleAddField(field)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-600/60 backdrop-blur-sm rounded-xl text-white hover:bg-gray-600/80 transition-colors text-sm"
          >
            {getButtonIcon(field)}
            <span>{getButtonLabel(field)}</span>
          </button>
        ))}
        {unusedButtons.length > 3 && (
          <button className="text-white/60 text-sm hover:text-white transition-colors">
            Show more
          </button>
        )}
      </div>

      {/* Active Fields Display */}
      {activeFields.includes('capacity') && (
        <div className="relative">
          <input
            type="number"
            placeholder="Enter capacity"
            value={event.capacity || ''}
            onChange={(e) => onEventChange('capacity', e.target.value ? parseInt(e.target.value) : null)}
            className="w-full px-4 py-4 pl-12 bg-gray-700/50 backdrop-blur-sm rounded-2xl border border-white/20 text-white placeholder-white/60 focus:outline-none"
            style={{ animation: 'moving-glow 3s ease-in-out infinite' }}
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60">
            {getButtonIcon('capacity')}
          </div>
        </div>
      )}

      {activeFields.includes('photoGallery') && (
        <div className="relative">
          <input
            type="text"
            placeholder="Add photo gallery URL"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const url = (e.target as HTMLInputElement).value.trim();
                if (url) {
                  onEventChange('photoGallery', [...event.photoGallery, url]);
                  (e.target as HTMLInputElement).value = '';
                }
              }
            }}
            className="w-full px-4 py-4 pl-12 bg-gray-700/50 backdrop-blur-sm rounded-2xl border border-white/20 text-white placeholder-white/60 focus:outline-none"
            style={{ animation: 'moving-glow 3s ease-in-out infinite' }}
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            {getButtonIcon('photoGallery')}
          </div>
        </div>
      )}

      {activeFields.includes('links') && (
        <div className="relative">
          <input
            type="text"
            placeholder="Add link (title:url)"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const value = (e.target as HTMLInputElement).value.trim();
                if (value.includes(':')) {
                  const [title, url] = value.split(':');
                  if (title && url) {
                    onEventChange('links', [...event.links, { id: crypto.randomUUID(), title: title.trim(), url: url.trim() }]);
                    (e.target as HTMLInputElement).value = '';
                  }
                }
              }
            }}
            className="w-full px-4 py-4 pl-12 bg-gray-700/50 backdrop-blur-sm rounded-2xl border border-white/20 text-white placeholder-white/60 focus:outline-none"
            style={{ animation: 'moving-glow 3s ease-in-out infinite' }}
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            {getButtonIcon('links')}
          </div>
        </div>
      )}

      {activeFields.includes('privacy') && (
        <div className="relative">
          <select
            value={event.privacy || ''}
            onChange={(e) => onEventChange('privacy', e.target.value || null)}
            className="w-full px-4 py-4 pl-12 bg-gray-700/50 backdrop-blur-sm rounded-2xl border border-white/20 text-white focus:outline-none appearance-none"
            style={{ animation: 'moving-glow 3s ease-in-out infinite' }}
          >
            <option value="">Select privacy setting</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="invite-only">Invite Only</option>
          </select>
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            {getButtonIcon('privacy')}
          </div>
        </div>
      )}

      {activeFields.includes('announcements') && (
        <div className="relative">
          <textarea
            placeholder="Add announcement"
            value={event.announcements || ''}
            onChange={(e) => onEventChange('announcements', e.target.value || null)}
            rows={2}
            className="w-full px-4 py-4 pl-12 bg-gray-700/50 backdrop-blur-sm rounded-2xl border border-white/20 text-white placeholder-white/60 focus:outline-none resize-none"
            style={{ animation: 'moving-glow 3s ease-in-out infinite' }}
          />
          <div className="absolute left-4 top-4">
            {getButtonIcon('announcements')}
          </div>
        </div>
      )}

      {/* Customize Section */}
      <div className="relative bg-gray-700/50 backdrop-blur-sm rounded-2xl p-10 min-h-[280px] border border-white/20" style={{ animation: 'moving-glow 3s ease-in-out infinite' }}>
        {/* Decorative Icons */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 text-white/20">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
        </div>

        <div className="absolute left-24 top-16 text-white/20">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>

        <div className="absolute left-20 bottom-16 text-white/20">
          <svg className="w-11 h-11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>

        <div className="absolute right-8 top-16 text-white/20">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>

        <div className="absolute right-12 bottom-20 text-white/20">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>

        <div className="absolute right-8 top-8 text-white/10 text-4xl font-bold opacity-30">
          RSVP
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <h3 className="text-2xl font-bold text-white mb-8">Customize your<br/>event your way</h3>
          <button
            onClick={() => onAddModule('sparkle')}
            className="px-8 py-3 bg-gray-600/60 backdrop-blur-sm rounded-xl text-white hover:bg-gray-600/80 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span>Customize</span>
          </button>
        </div>
      </div>

      {/* Go Live Button */}
      <button
        onClick={() => setShowPopup(true)}
        className="w-full px-6 py-4 bg-white/10 backdrop-blur-md rounded-2xl text-white border border-white/20 hover:bg-white/15 transition-all flex items-center justify-center gap-2 font-semibold shadow-lg"
        style={{
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        }}
      >
        <BsFillRocketTakeoffFill className="w-5 h-5 text-red-500" />
        <span>Go live</span>
      </button>

      {/* Transparent Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowPopup(false)}
          />

          {/* Popup Content */}
          <div
            className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 w-full max-w-md shadow-2xl"
            style={{
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Popup Title */}
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Go Live</h2>

            {/* Phone Input */}
            <div className="relative mb-6">
              <input
                type="tel"
                placeholder="Enter phone number"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                className="w-full px-4 py-4 pl-12 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>

            {/* Submit Button */}
            <button
              onClick={async () => {
                if (phoneInput.trim() && !isSubmitting) {
                  onEventChange('phoneNumber', phoneInput);
                  await onGoLive();
                  setShowPopup(false);
                  setPhoneInput('');
                }
              }}
              disabled={isSubmitting || !phoneInput.trim()}
              className="w-full px-6 py-4 bg-white/10 backdrop-blur-md rounded-2xl text-green-400 border border-white/20 hover:bg-white/15 transition-all flex items-center justify-center gap-2 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              }}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <BsFillRocketTakeoffFill className="w-5 h-5 text-red-500" />
                  <span>Submit</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Date and Time Picker Modal */}
      {showDateTimePicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowDateTimePicker(false)}
          />

          {/* Date/Time Picker Content */}
          <div
            className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-6 w-full max-w-2xl shadow-2xl"
            style={{
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
              <FcCalendar className="w-6 h-6" />
              <h3 className="text-xl font-semibold text-white">Date and Time</h3>
              <button
                onClick={() => setShowDateTimePicker(false)}
                className="ml-auto w-8 h-8 flex items-center justify-center text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Date and Time Picker */}
            <div className="flex gap-6">
              {/* Date Picker */}
              <div className="flex-1">
                <input
                  type="date"
                  value={selectedDate || event.dateTime?.split('T')[0] || ''}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    if (selectedTime.hours && selectedTime.minutes) {
                      const timeString = `${selectedTime.hours}:${selectedTime.minutes} ${selectedTime.ampm}`;
                      const [hours, minutes] = timeString.split(' ')[0].split(':');
                      const hour24 = selectedTime.ampm === 'PM' && parseInt(hours) !== 12
                        ? parseInt(hours) + 12
                        : selectedTime.ampm === 'AM' && parseInt(hours) === 12
                        ? 0
                        : parseInt(hours);
                      const dateTimeString = `${e.target.value}T${hour24.toString().padStart(2, '0')}:${minutes}`;
                      onEventChange('dateTime', dateTimeString);
                    }
                  }}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>

              {/* Time Picker */}
              <div className="flex-1 flex gap-2">
                {/* Hours */}
                <select
                  value={selectedTime.hours}
                  onChange={(e) => {
                    const newTime = { ...selectedTime, hours: e.target.value };
                    setSelectedTime(newTime);
                    if (selectedDate || event.dateTime?.split('T')[0]) {
                      const date = selectedDate || event.dateTime?.split('T')[0] || '';
                      const hour24 = newTime.ampm === 'PM' && parseInt(newTime.hours) !== 12
                        ? parseInt(newTime.hours) + 12
                        : newTime.ampm === 'AM' && parseInt(newTime.hours) === 12
                        ? 0
                        : parseInt(newTime.hours);
                      const dateTimeString = `${date}T${hour24.toString().padStart(2, '0')}:${newTime.minutes}`;
                      onEventChange('dateTime', dateTimeString);
                    }
                  }}
                  className="flex-1 px-3 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  {Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')).map(hour => (
                    <option key={hour} value={hour}>{hour}</option>
                  ))}
                </select>

                {/* Minutes */}
                <select
                  value={selectedTime.minutes}
                  onChange={(e) => {
                    const newTime = { ...selectedTime, minutes: e.target.value };
                    setSelectedTime(newTime);
                    if (selectedDate || event.dateTime?.split('T')[0]) {
                      const date = selectedDate || event.dateTime?.split('T')[0] || '';
                      const hour24 = newTime.ampm === 'PM' && parseInt(newTime.hours) !== 12
                        ? parseInt(newTime.hours) + 12
                        : newTime.ampm === 'AM' && parseInt(newTime.hours) === 12
                        ? 0
                        : parseInt(newTime.hours);
                      const dateTimeString = `${date}T${hour24.toString().padStart(2, '0')}:${newTime.minutes}`;
                      onEventChange('dateTime', dateTimeString);
                    }
                  }}
                  className="flex-1 px-3 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')).map(minute => (
                    <option key={minute} value={minute}>{minute}</option>
                  ))}
                </select>

                {/* AM/PM */}
                <select
                  value={selectedTime.ampm}
                  onChange={(e) => {
                    const newTime = { ...selectedTime, ampm: e.target.value };
                    setSelectedTime(newTime);
                    if (selectedDate || event.dateTime?.split('T')[0]) {
                      const date = selectedDate || event.dateTime?.split('T')[0] || '';
                      const hour24 = newTime.ampm === 'PM' && parseInt(newTime.hours) !== 12
                        ? parseInt(newTime.hours) + 12
                        : newTime.ampm === 'AM' && parseInt(newTime.hours) === 12
                        ? 0
                        : parseInt(newTime.hours);
                      const dateTimeString = `${date}T${hour24.toString().padStart(2, '0')}:${newTime.minutes}`;
                      onEventChange('dateTime', dateTimeString);
                    }
                  }}
                  className="px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => {
                  onEventChange('dateTime', '');
                  setSelectedDate('');
                  setSelectedTime({ hours: '08', minutes: '35', ampm: 'PM' });
                }}
                className="px-4 py-2 text-white/60 hover:text-white transition-colors"
              >
                Clear
              </button>
              <button
                onClick={() => {
                  const today = new Date().toISOString().split('T')[0];
                  const now = new Date();
                  const hours = now.getHours() % 12 || 12;
                  const minutes = now.getMinutes().toString().padStart(2, '0');
                  const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
                  setSelectedDate(today);
                  setSelectedTime({ hours: hours.toString().padStart(2, '0'), minutes, ampm });
                  const hour24 = ampm === 'PM' && hours !== 12 ? hours + 12 : ampm === 'AM' && hours === 12 ? 0 : hours;
                  const dateTimeString = `${today}T${hour24.toString().padStart(2, '0')}:${minutes}`;
                  onEventChange('dateTime', dateTimeString);
                }}
                className="px-4 py-2 text-white hover:text-white/80 transition-colors font-medium"
              >
                Today
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
