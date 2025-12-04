import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'; // Removed InformationCircleIcon as it's not used

function Events({ allEventsData, loading: propLoading, error: propError }) {
  const [events, setEvents] = useState([]);
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  // Use props for loading and error states
  const [loading, setLoading] = useState(propLoading);
  const [error, setError] = useState(propError);

  useEffect(() => {
    // Update local state when props change
    setLoading(propLoading);
    setError(propError);

    if (!propLoading && !propError && allEventsData) {
      const sortedEvents = [...allEventsData].sort((a, b) => { // Create a copy before sorting
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return dateB - dateA; // Sort descending (newest first)
      });
      setEvents(sortedEvents);
      if (sortedEvents.length > 0) {
        const firstActiveIndex = sortedEvents.findIndex(event => event.active);
        setActiveEventIndex(firstActiveIndex !== -1 ? firstActiveIndex : 0);
      } else {
        setActiveEventIndex(0);
      }
    } else if (!propLoading && !propError && !allEventsData) {
      // Handle case where data might be null/undefined but not an error explicitly
      setEvents([]);
    }
  }, [allEventsData, propLoading, propError]);

  const handlePrev = () => {
    setActiveEventIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, events.length - 1) : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveEventIndex((prevIndex) =>
      prevIndex === Math.max(0, events.length - 1) ? 0 : prevIndex + 1
    );
  };

  if (loading) {
    return <div className="text-center py-20 text-white bg-[#0E2A44]">Loading events...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-400 bg-[#0E2A44]">Error: {error}</div>;
  }

  if (events.length === 0) {
    return <div className="text-center py-20 text-gray-400 bg-[#0E2A44]">No events found.</div>;
  }

  const currentEvent = events[activeEventIndex];

  return (
    <div id="etkinlikler" className="flex flex-col items-center py-20 md:py-24 pb-28 md:pb-32">
      {/* Section Title/Sticker */}
      <div className="mb-12 md:mb-16 text-center px-4">
        {/* User should replace this with an actual events sticker or a styled title */}
        <img
          src="/assets/sss/sss_sticker.png"
          alt="Upcoming Events"
          className="w-auto h-40 md:h-48 mx-auto drop-shadow-xl"
        />
      </div>

      {/* Active Event Display */}
      {currentEvent && (
        <div className="w-full max-w-4xl px-4 mb-12 md:mb-16">
          <div className="glass-strong p-8 sm:p-10 rounded-2xl shadow-2xl text-white border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl pointer-events-none"></div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 tracking-tight relative z-10">{currentEvent.name}</h2>
            <div className="flex items-center text-gray-300 mb-6 text-sm sm:text-base relative z-10">
              <CalendarDaysIcon className="h-5 w-5 mr-2 text-blue-400" />
              <span>
                {new Date(currentEvent.startDate).toLocaleDateString("tr-TR", {
                  year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                })}
              </span>
              {!currentEvent.active && <span className="ml-3 text-xs bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 font-semibold px-3 py-1 rounded-full">(Geçmiş Etkinlik)</span>}
            </div>
            {currentEvent.description && (
              <p className="text-gray-300 mb-8 leading-relaxed text-base sm:text-lg line-clamp-3 hover:line-clamp-none transition-all duration-300 relative z-10">
                {currentEvent.description}
              </p>
            )}
            {currentEvent.formUrl && currentEvent.active && (
              <a
                href={currentEvent.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-8 rounded-full text-base sm:text-lg font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                Kayıt Ol & Detaylar
              </a>
            )}
            {currentEvent.formUrl && !currentEvent.active && (
              <span className="relative z-10 inline-block bg-gray-700/50 text-gray-400 border border-gray-600 py-3 px-8 rounded-full text-base sm:text-lg font-semibold cursor-not-allowed">
                Kayıtlar Kapandı
              </span>
            )}
          </div>
        </div>
      )}

      {/* Event Slider Controls and Thumbnails */}
      {events.length > 1 && (
        <div className="w-full max-w-5xl px-4">
          <div className="flex items-center justify-between sm:justify-center space-x-3 sm:space-x-4">
            <button
              onClick={handlePrev}
              disabled={activeEventIndex === 0 && events.length <= 1}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed border border-white/10"
              aria-label="Previous event"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>

            <div className="flex-grow overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out space-x-3 sm:space-x-4 py-2"
                style={{ transform: `translateX(calc(50% - ${activeEventIndex * (150 + 16)}px - 75px + 8px))` }} // 150px width, 16px gap (space-x-4), 75px half-width, 8px half-gap
              >
                {events.map((event, index) => (
                  <div
                    key={event.id}
                    className={`cursor-pointer p-4 rounded-xl transition-all duration-300 ease-in-out min-w-[140px] sm:min-w-[150px] text-center border
                      ${index === activeEventIndex
                        ? "bg-blue-600/20 border-blue-500/50 scale-105 shadow-lg shadow-blue-500/10"
                        : "bg-white/5 border-white/5 hover:bg-white/10 scale-95 opacity-60 hover:opacity-100"
                      }`}
                    onClick={() => setActiveEventIndex(index)}
                  >
                    <h4 className={`font-semibold text-xs sm:text-sm truncate mb-1 ${index === activeEventIndex ? "text-white" : "text-gray-400"}`}>
                      {event.name}
                    </h4>
                    <p className={`text-xs ${index === activeEventIndex ? "text-blue-300" : "text-gray-500"}`}>
                      {new Date(event.startDate).toLocaleDateString("tr-TR", { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={activeEventIndex === events.length - 1 && events.length <= 1}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed border border-white/10"
              aria-label="Next event"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;
