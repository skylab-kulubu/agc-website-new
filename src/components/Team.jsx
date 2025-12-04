import React, { useState, useRef, useEffect } from "react";

// LinkedIn SVG Icon
const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const Team = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const sliderRef = useRef(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch(
          "https://api.yildizskylab.com/api/event-types/AGC/coordinators"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.success && result.data) {
          setTeamMembers(result.data);
        } else {
          setError(result.message || "Failed to fetch team members");
        }
      } catch (e) {
        setError(e.message);
        console.error("Error fetching team members:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const totalSlides = teamMembers.length;
  const slidesToShow = 4; // Number of slides visible at once

  // Corrected maxIndex for navigation and scrollbar logic.
  // This represents the maximum value currentIndex can reach.
  const navMaxIndex = Math.max(0, totalSlides - slidesToShow);

  const scrollToIndex = (index) => {
    if (sliderRef.current) {
      setIsScrolling(true);
      const scrollWidth = sliderRef.current.scrollWidth;
      const itemWidth = scrollWidth / totalSlides;
      sliderRef.current.scrollTo({
        left: itemWidth * index,
        behavior: "smooth",
      });
      setTimeout(() => setIsScrolling(false), 500);
    }
  };

  const handleScroll = () => {
    if (sliderRef.current && !isScrolling) {
      const scrollPosition = sliderRef.current.scrollLeft;
      const scrollWidth = sliderRef.current.scrollWidth;
      const itemWidth = scrollWidth / totalSlides;
      const newIndex = Math.round(scrollPosition / itemWidth);
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", handleScroll);
      return () => {
        slider.removeEventListener("scroll", handleScroll);
      };
    }
  }, [currentIndex, isScrolling]);

  const goToPrevious = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const goToNext = () => {
    // Use navMaxIndex to prevent scrolling beyond the last possible item
    const newIndex = Math.min(navMaxIndex, currentIndex + 1);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  if (loading) {
    return <div className="text-center py-10">Loading team members...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  // Calculate thumb style
  let thumbWidthStyle = "0%";
  let thumbLeftStyle = "0%";

  if (totalSlides > 0) {
    if (navMaxIndex === 0) { // Not enough items to scroll, or all items fit
      thumbWidthStyle = "100%";
      thumbLeftStyle = "0%";
    } else {
      const thumbWidthPercentage = (slidesToShow / totalSlides) * 100;
      thumbWidthStyle = `${thumbWidthPercentage}%`;
      // Calculate left position based on currentIndex relative to navMaxIndex
      // and the remaining track space after accounting for thumb width.
      thumbLeftStyle = `${(currentIndex / navMaxIndex) * (100 - thumbWidthPercentage)}%`;
    }
  } else { // No team members
    // Scrollbar effectively hidden or non-existent as thumb width is 0
  }

  return (
    <div id="ekibimiz" className="bg-[#0e2a44] py-12 px-4">
      {/* Logo */}
      <div className="mb-4 mr-auto ml-24">
        <img
          src="/assets/team/team_sticker.png"
          alt="SSS"
          className="w-auto h-56"
        />
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          {/* Slider Container */}
          <div
            ref={sliderRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-8 pb-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {teamMembers.map((member) => (
              <div key={member.id} className="flex-shrink-0 w-64 snap-start">
                <div className=" overflow-hidden">
                  <div
                    className="relative w-full"
                    style={{ paddingBottom: "133.33%" }}
                  >
                    <img
                      src={member.profilePictureUrl || "/assets/default-avatar.png"}
                      alt={`${member.firstName} ${member.lastName}`}
                      className="absolute top-0 left-0 w-full h-full object-cover object-center border-white border-6"
                      onError={(e) => { e.target.onerror = null; e.target.src = "/assets/default-avatar.png"; }}
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-xl font-bold text-white">
                      {member.firstName} {member.lastName}
                    </h3>
                    <p className="text-white">{member.department}</p>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block text-[#0077b5] hover:text-[#005582] transition-colors"
                        aria-label={`${member.firstName} ${member.lastName}'s LinkedIn Profile`}
                      >
                        <LinkedInIcon />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Horizontal Scrollbar - only render if there are slides */}
        {totalSlides > 0 && (
          <div className="max-w-2xl mx-auto mt-8 relative h-2">
            {/* Background track - clickable for jumping to position */}
            <div
              className="absolute w-full h-full bg-gray-600/30 rounded-full cursor-pointer"
              onClick={(e) => {
                if (navMaxIndex === 0) return; // Don't do anything if not scrollable
                const rect = e.currentTarget.getBoundingClientRect();
                const clickPosition = (e.clientX - rect.left) / rect.width;
                // Ensure newIndex is within [0, navMaxIndex]
                const newIndex = Math.min(
                  navMaxIndex,
                  Math.max(0, Math.round(clickPosition * navMaxIndex))
                );
                setCurrentIndex(newIndex);
                scrollToIndex(newIndex);
              }}
            ></div>

            {/* Thumb/handle - draggable */}
            <div
              className="absolute h-full bg-white rounded-full transition-all duration-100 cursor-grab active:cursor-grabbing"
              style={{
                width: thumbWidthStyle,
                left: thumbLeftStyle,
              }}
              onMouseDown={(startEvent) => {
                if (navMaxIndex === 0) return; // Don't do anything if not scrollable
                startEvent.preventDefault();
                const thumbEl = startEvent.currentTarget;
                const trackEl = thumbEl.parentElement;
                const trackRect = trackEl.getBoundingClientRect();
                const trackWidth = trackRect.width;

                // Calculate the draggable range
                const maxLeft = trackWidth - thumbEl.offsetWidth;

                // Calculate offset within the thumb where user clicked
                const initialX = startEvent.clientX;
                const thumbLeft = thumbEl.offsetLeft;
                const offsetX = initialX - thumbLeft - trackRect.left;

                const handleMouseMove = (moveEvent) => {
                  const x = moveEvent.clientX - trackRect.left - offsetX;
                  const thumbPosition = Math.max(0, Math.min(maxLeft, x));
                  let percentage = 0;
                  if (maxLeft > 0) { // Avoid division by zero if maxLeft is 0
                    percentage = thumbPosition / maxLeft;
                  }

                  // Use navMaxIndex for calculating the new index
                  const newIndex = Math.min(navMaxIndex, Math.max(0, Math.round(percentage * navMaxIndex)));

                  if (newIndex !== currentIndex) {
                    setCurrentIndex(newIndex);
                    scrollToIndex(newIndex);
                  }
                };

                const handleMouseUp = () => {
                  document.removeEventListener("mousemove", handleMouseMove);
                  document.removeEventListener("mouseup", handleMouseUp);
                };

                document.addEventListener("mousemove", handleMouseMove);
                document.addEventListener("mouseup", handleMouseUp);
              }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;
