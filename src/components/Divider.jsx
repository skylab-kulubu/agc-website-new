import React from "react";

function Divider({ className = "" }) { // Added className prop for flexibility
  return (
    <div className={`w-full ${className}`}>
      <img
        src="/assets/section_divider.png"
        alt="Section Divider"
        // Adjusted to be more generally applicable, specific offsets can be handled by parent or className
        className="w-full h-auto object-contain" 
      />
    </div>
  );
}

export default Divider;
