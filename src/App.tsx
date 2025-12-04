// import { useState, useEffect } from 'react';
// import type { Event, CustomModule, Link } from './types/event';
// import { EventPreview } from './components/EventPreview';
// import { EventForm } from './components/EventForm';
// import { handleImageUpload } from './utils/imageUpload';
// import './App.css';

// function App() {
//   const [event, setEvent] = useState<Event>(() => ({
//     id: crypto.randomUUID(),
//     name: '',
//     phoneNumber: '',
//     dateTime: '',
//     location: '',
//     costPerPerson: '',
//     description: '',
//     flyerImage: null,
//     backgroundImage: null,
//     photoGallery: [],
//     links: [],
//     customModules: [],
//   }));

//   const handleEventChange = (field: keyof Event, value: string | number | string[] | null | CustomModule[] | Link[]) => {
//     setEvent((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleFlyerImageChange = () => {
//     handleImageUpload((url) => {
//       handleEventChange('flyerImage', url);
//     });
//   };

//   const handleBackgroundChange = () => {
//     handleImageUpload((url) => {
//       console.log('Background image uploaded:', url);
//       handleEventChange('backgroundImage', url);
//     });
//   };

//   const handleAddModule = (type: CustomModule['type']) => {
//     const title = prompt(`Enter title for ${type} module:`);
//     const content = prompt(`Enter content for ${type} module:`);

//     if (title && content) {
//       const newModule: CustomModule = {
//         id: crypto.randomUUID(),
//         type,
//         title,
//         content,
//       };
//       handleEventChange('customModules', [...event.customModules, newModule]);
//     }
//   };

//   const handleGoLive = () => {
//     console.log('Event going live:', event);
//     alert('Event is now live! (Check console for event data)');
//   };

//   // Debug: Log background image changes
//   useEffect(() => {
//     console.log('Background image changed:', event.backgroundImage);
//   }, [event.backgroundImage]);

//   // Default background gradient
//   const defaultBackground = 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)';

//   return (
//     <div className="min-h-screen w-full relative overflow-hidden">
//       {/* Blurred Background Layer */}
//       <div
//         className="fixed inset-0"
//         style={{ zIndex: -10 }}
//       >
//         {event.backgroundImage ? (
//           <>
//             {/* Blurred background image */}
//             <div
//               className="absolute inset-0 transition-opacity duration-500"
//               style={{
//                 backgroundImage: `url(${event.backgroundImage})`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//                 backgroundRepeat: 'no-repeat',
//                 filter: 'blur(20px)',
//                 transform: 'scale(1.1)',
//                 width: '100%',
//                 height: '100%',
//               }}
//             />
//             {/* Overlay for better visibility */}
//             <div className="absolute inset-0 bg-purple-900/30" />
//           </>
//         ) : (
//           <div
//             className="w-full h-full transition-opacity duration-500"
//             style={{
//               background: defaultBackground,
//               backgroundAttachment: 'fixed',
//               minHeight: '100vh',
//             }}
//           />
//         )}
//       </div>

//       {/* Navigation Header */}
//       <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-6">
//         <div className="flex items-center gap-8">
//           <h1 className="text-2xl font-bold text-white">let's hang</h1>
//           <nav className="flex items-center gap-8">
//             <a href="#" className="text-white/80 hover:text-white transition-colors">Home</a>
//             <a href="#" className="text-white/80 hover:text-white transition-colors">People</a>
//             <a href="#" className="text-white/80 hover:text-white transition-colors">Search</a>
//           </nav>
//         </div>
//         <button className="px-6 py-2 bg-pink-500/80 rounded-full text-white hover:bg-pink-500 transition-colors">
//           Sign in
//         </button>
//       </header>

//       {/* Content */}
//       <div className="relative z-10 min-h-screen w-full p-8 pt-24">

//         {/* Main Content */}
//         <div className="flex gap-8 flex-col lg:flex-row items-start lg:items-center justify-center">
//           {/* Left Panel - Preview */}
//           <div className="flex-1 flex justify-center">
//             <EventPreview
//               event={event}
//               onFlyerImageChange={handleFlyerImageChange}
//               onBackgroundChange={handleBackgroundChange}
//             />
//           </div>

//           {/* Right Panel - Form */}
//           <div className="flex-1 flex justify-center ">
//             <EventForm
//               event={event}
//               onEventChange={handleEventChange}
//               onAddModule={handleAddModule}
//               onGoLive={handleGoLive}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import { useState, useEffect } from 'react';
import type { Event, CustomModule, Link } from './types/event';
import { EventPreview } from './components/EventPreview';
import { EventForm } from './components/EventForm';
import { EventsListPopup } from './components/EventsListPopup';
import { handleImageUpload } from './utils/imageUpload';
import { useToast } from './context/ToastContext';
import { eventService } from './services/eventService';
import './App.css';

function App() {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEventsPopup, setShowEventsPopup] = useState(false);
  const [event, setEvent] = useState<Event>(() => ({
    id: crypto.randomUUID(),
    name: '',
    phoneNumber: '',
    dateTime: '',
    location: '',
    costPerPerson: '',
    description: '',
    flyerImage: null,
    backgroundImage: null,
    photoGallery: [],
    links: [],
    customModules: [],
  }));

  const handleEventChange = (field: keyof Event, value: string | number | string[] | null | CustomModule[] | Link[]) => {
    setEvent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBackgroundChange = () => {
    handleImageUpload((url) => {
      console.log('Background image uploaded:', url);
      handleEventChange('backgroundImage', url);
    });
  };

  const handleAddModule = (type: CustomModule['type']) => {
    const title = prompt(`Enter title for ${type} module:`);
    const content = prompt(`Enter content for ${type} module:`);

    if (title && content) {
      const newModule: CustomModule = {
        id: crypto.randomUUID(),
        type,
        title,
        content,
      };
      handleEventChange('customModules', [...event.customModules, newModule]);
    }
  };

  const handleGoLive = async () => {
    if (!event.phoneNumber) {
      showToast('Please enter a phone number', 'error');
      return;
    }

    // Check if Supabase is configured
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file');
      showToast('Database not configured. Please check your environment variables.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      console.log('Saving event as draft...', event);

      // First, save as draft (or create if new)
      const savedEvent = await eventService.saveDraft(event.phoneNumber, event);

      if (!savedEvent) {
        console.error('Failed to save event');
        showToast('Failed to save event. Please check console for details.', 'error');
        setIsSubmitting(false);
        return;
      }

      console.log('Event saved successfully:', savedEvent);

      // Update local state with saved event (includes the database ID)
      setEvent(savedEvent);

      // Then publish the event
      console.log('Publishing event...', savedEvent.id);
      const publishedEvent = await eventService.publishEvent(savedEvent.id);

      if (!publishedEvent) {
        console.error('Failed to publish event');
        showToast('Failed to publish event. Please check console for details.', 'error');
        setIsSubmitting(false);
        return;
      }

      // Update local state with published event
      setEvent(publishedEvent);

      console.log('Event published successfully:', publishedEvent);
      showToast('Event is now live! 🚀', 'success');
    } catch (error) {
      console.error('Error publishing event:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      showToast(`Error: ${errorMessage}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Debug: Log background image changes
  useEffect(() => {
    console.log('Background image changed:', event.backgroundImage);
  }, [event.backgroundImage]);

  // Updated background gradient - darker teal to dark purple (matching Figma)
  const defaultBackground = 'linear-gradient(135deg, #1a4d4d 0%, #2d1b3d 50%, #3d2645 100%)';

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Blurred Background Layer */}
      <div
        className="fixed inset-0"
        style={{ zIndex: -10 }}
      >
        {event.backgroundImage ? (
          <>
            {/* Blurred background image */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                backgroundImage: `url(${event.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: 'blur(20px)',
                transform: 'scale(1.1)',
                width: '100%',
                height: '100%',
              }}
            />
            {/* Darker overlay for better contrast */}
            <div className="absolute inset-0 bg-black/40" />
          </>
        ) : (
          <div
            className="w-full h-full transition-opacity duration-500"
            style={{
              background: defaultBackground,
              backgroundAttachment: 'fixed',
              minHeight: '100vh',
            }}
          />
        )}
      </div>

      {/* Navigation Header */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-8">
          <h1 className="font-syne font-bold text-white text-center" style={{ fontSize: '32px', lineHeight: '100%', letterSpacing: '-0.29px' }}>let's hang</h1>
          <nav className="flex items-center gap-8">
            <a href="#" className="font-sf-pro text-white/80 hover:text-white transition-colors" style={{ fontSize: '16px', lineHeight: '100%', letterSpacing: '0%' }}>Home</a>
            <a href="#" className="font-sf-pro text-white/80 hover:text-white transition-colors" style={{ fontSize: '16px', lineHeight: '100%', letterSpacing: '0%' }}>People</a>
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowEventsPopup(true);
              }}
              className="font-sf-pro text-white/80 hover:text-white transition-colors" style={{ fontSize: '16px', lineHeight: '100%', letterSpacing: '0%' }}
            >
              Search
            </button>
          </nav>
        </div>
        <button className="px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20 hover:bg-white/15 transition-all text-sm font-medium shadow-lg" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}>
          Sign in
        </button>
      </header>

      {/* Content */}
      <div className="relative z-10 min-h-screen w-full px-8 py-24">
        {/* Main Content */}
        <div className="flex gap-12 flex-col lg:flex-row items-start justify-center max-w-[1400px] mx-auto">
          {/* Left Panel - Preview */}
          <div className="flex-shrink-0">
            <EventPreview
              event={event}
              onBackgroundChange={handleBackgroundChange}
            />
          </div>

          {/* Right Panel - Form */}
          <div className="flex-1 max-w-2xl">
            <EventForm
              event={event}
              onEventChange={handleEventChange}
              onAddModule={handleAddModule}
              onGoLive={handleGoLive}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>

      {/* Events List Popup */}
      <EventsListPopup
        isOpen={showEventsPopup}
        onClose={() => setShowEventsPopup(false)}
      />
    </div>
  );
}

export default App;
