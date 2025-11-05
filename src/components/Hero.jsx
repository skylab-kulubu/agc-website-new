import React, { useState, useEffect } from "react";

const initialCountdownItems = [
  { label: "Gün", value: "00" },
  { label: "Saat", value: "00" },
  { label: "Dakika", value: "00" },
  { label: "Saniye", value: "00" },
];

function Hero({ nextEventNameProp, targetDateProp, loadingCountdownProp }) {
  const [countdownItems, setCountdownItems] = useState(initialCountdownItems);
  const [nextEventName, setNextEventName] = useState("");
  // Use the loading prop from App.jsx for initial state
  const [loadingCountdown, setLoadingCountdown] = useState(loadingCountdownProp);

  useEffect(() => {
    // Update local state when props change
    setNextEventName(nextEventNameProp || "");
    setLoadingCountdown(loadingCountdownProp);

    if (targetDateProp && !loadingCountdownProp) {
      const interval = setInterval(() => {
        const nowMillis = new Date().getTime();
        const distance = targetDateProp - nowMillis;

        if (distance < 0) {
          clearInterval(interval);
          setCountdownItems(initialCountdownItems);
          // Update event name if it was counting down and now finished
          if (nextEventNameProp && !nextEventNameProp.includes("No upcoming") && !nextEventNameProp.includes("Error")) {
            setNextEventName("The event has started!");
          }
          return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdownItems([
          { label: "Gün", value: String(days).padStart(2, '0') },
          { label: "Saat", value: String(hours).padStart(2, '0') },
          { label: "Dakika", value: String(minutes).padStart(2, '0') },
          { label: "Saniye", value: String(seconds).padStart(2, '0') },
        ]);
      }, 1000);
      return () => clearInterval(interval);
    } else if (!loadingCountdownProp) {
      // If no targetDateProp or still loading, set default or error message
      setCountdownItems(initialCountdownItems);
      if (!nextEventNameProp) { // If prop is empty and not loading, means error or no data
          setNextEventName("Countdown not available.");
      }
    }
  }, [nextEventNameProp, targetDateProp, loadingCountdownProp]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center py-10"
      style={{
        backgroundImage: "url('/assets/hero/background.webp')",
      }}
    >
      <div className="mb-8">
        <img src="/assets/hero/hero_sticker.png" alt="Logo" className="h-60 sm:h-80" />
      </div>
      <div className="text-center mb-6 max-w-screen-md mx-auto px-4">
        <p className="text-xl sm:text-2xl text-white">
          Algoritma ve programlama tutkunlarını bir araya getiren bu heyecan verici yarışmada sen de yerini al! Yeteneklerini sergile, sınırlarını zorla ve büyük ödülleri kazanma şansını yakala.
        </p>
      </div>

      {/* Countdown Section Title */}
      {!loadingCountdown && nextEventName && (
        <div className="text-center mb-4">
          <p className="text-lg sm:text-xl text-yellow-400 font-semibold animate-pulse">
            {nextEventName.includes("No upcoming") || nextEventName.includes("Error") || nextEventName.includes("started") ? "" : "Next Event:"} {nextEventName}
          </p>
        </div>
      )}
       {loadingCountdown && (
        <div className="text-center mb-4">
          <p className="text-lg sm:text-xl text-gray-300">Loading countdown...</p>
        </div>
      )}


      {/* Countdown Timer */}
      <div className="flex flex-wrap justify-center space-x-0">
        {countdownItems.map((item, index) => (
          <div
            key={index}
            className={`text-center p-3 sm:p-4 md:p-6 border-2 sm:border-4 border-white bg-gradient-to-r from-[#0A2033] to-[#071522] 
                w-1/4 max-w-[100px] sm:max-w-[120px]
                ${index === 0 ? "rounded-l-lg border-r-0" : ""} 
                ${
                  index === countdownItems.length - 1
                    ? "rounded-r-lg border-l-0"
                    : ""
                }
                ${(index > 0 && index < countdownItems.length -1) ? "border-l-0 border-r-0" : ""}
                `}
          >
            <span className="block text-2xl sm:text-3xl md:text-4xl font-bold text-white">{item.value}</span>
            <span className="block text-xs sm:text-sm text-gray-300">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
