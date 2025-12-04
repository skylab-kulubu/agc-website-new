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
      className="relative flex flex-col items-center justify-center min-h-screen py-20 overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/hero/background.webp')" }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl px-4">
        <div className="mb-10">
          <img src="/assets/hero/hero_sticker.png" alt="Logo" className="h-48 sm:h-64 md:h-80 drop-shadow-2xl" />
        </div>

        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 font-light leading-relaxed">
            Algoritma ve programlama tutkunlarını bir araya getiren bu heyecan verici yarışmada sen de yerini al!
            <span className="block mt-4 text-gray-400 text-base">Yeteneklerini sergile, sınırlarını zorla ve büyük ödülleri kazanma şansını yakala.</span>
          </p>
        </div>

        {/* Countdown Section Title */}
        {!loadingCountdown && nextEventName && (
          <div className="text-center mb-8">
            <div className="inline-block px-6 py-2 rounded-full glass border border-yellow-500/30 bg-yellow-500/10">
              <p className="text-lg sm:text-xl text-yellow-400 font-semibold tracking-wide">
                {nextEventName.includes("No upcoming") || nextEventName.includes("Error") || nextEventName.includes("started") ? "" : "Sıradaki Etkinlik:"} <span className="text-white">{nextEventName}</span>
              </p>
            </div>
          </div>
        )}
        {loadingCountdown && (
          <div className="text-center mb-8">
            <p className="text-lg text-gray-400 animate-pulse">Yükleniyor...</p>
          </div>
        )}

        {/* Countdown Timer */}
        <div className="grid grid-cols-4 gap-4 sm:gap-6 w-full max-w-3xl">
          {countdownItems.map((item, index) => (
            <div
              key={index}
              className="glass flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <span className="text-3xl sm:text-5xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                {item.value}
              </span>
              <span className="text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-widest">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;
