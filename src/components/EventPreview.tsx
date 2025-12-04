// import type { Event } from "../types/event";

// interface EventPreviewProps {
//   event: Event;
//   onFlyerImageChange: () => void;
//   onBackgroundChange: () => void;
// }

// export const EventPreview = ({
//   event,
//   onFlyerImageChange,
//   onBackgroundChange,
// }: EventPreviewProps) => {
//   // Default background image - a beautiful gradient as base64
//   const defaultBackground =
//     "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM2NjdlZWEiLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzc2NGJhMiIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2YwOTNmYiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=";

//   const previewStyle: React.CSSProperties = {
//     backgroundImage: `url(${event.backgroundImage || defaultBackground})`,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//   };

//   return (
//     <div className="flex flex-col items-center gap-6">
//       {/* Event Invitation Card */}
//       <div
//         className="relative w-[600px] h-[600px] rounded-2xl overflow-hidden shadow-2xl"
//         style={previewStyle}
//       >
//         {/* Flyer Image Overlay */}
//         {event.flyerImage && (
//           <div className="absolute inset-0">
//             <img
//               src={event.flyerImage}
//               alt="Event flyer"
//               className="w-full h-full object-cover"
//             />
//           </div>
//         )}

//         {/* Invitation Text - Only show when no flyer image */}
//         {!event.flyerImage && (
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="text-center">
//               <h2 className="text-6xl font-bold text-white leading-tight">
//                 YOU'RE
//                 <br />
//                 INVITED
//               </h2>
//             </div>
//           </div>
//         )}

//         {/* Edit Flyer Button */}
//         <button
//           onClick={onFlyerImageChange}
//           className="absolute bottom-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
//           aria-label="Edit flyer"
//         >
//           <svg
//             className="w-5 h-5 text-white"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 4.732z"
//             />
//           </svg>
//         </button>
//       </div>

//       {/* Change Background Button */}
//       <button
//         onClick={onBackgroundChange}
//         className="flex items-center gap-2 px-6 py-3 bg-purple-600/30 backdrop-blur-sm rounded-xl text-white hover:bg-purple-600/40 transition-colors"
//       >
//         <svg
//           className="w-5 h-5"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//           />
//         </svg>
//         <span>Change background</span>
//       </button>
//     </div>
//   );
// };


import type { Event } from '../types/event';

interface EventPreviewProps {
  event: Event;
  onBackgroundChange: () => void;
}

export const EventPreview = ({ event, onBackgroundChange }: EventPreviewProps) => {
  const previewStyle: React.CSSProperties = {
    backgroundImage: event.backgroundImage ? `url(${event.backgroundImage})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Event Invitation Card - Adjusted to match Figma */}
      <div
        className="relative w-[600px] h-[600px] rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md border border-white/20"
        style={{
          ...previewStyle,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        }}
      >
        {/* Invitation Text - Only show when no background image */}
        {!event.backgroundImage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-7xl font-bold text-white leading-tight tracking-tight">
                YOU'RE<br />INVITED
              </h2>
            </div>
          </div>
        )}

        {/* Edit Background Button - Bottom right corner */}
        <button
          onClick={onBackgroundChange}
          className="absolute bottom-4 right-4 w-12 h-12 bg-gray-700/60 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-gray-700/80 transition-colors"
          aria-label="Change background"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 4.732z" />
          </svg>
        </button>
      </div>

      {/* Change Background Button - Matching Figma style */}
      <button
        onClick={onBackgroundChange}
        className="w-[600px] flex items-center justify-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-md rounded-2xl text-white border border-white/20 hover:bg-white/15 transition-all font-medium shadow-lg"
        style={{
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>Change background</span>
      </button>
    </div>
  );
};
