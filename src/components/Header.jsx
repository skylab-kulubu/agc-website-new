import React, { useState } from "react";

function Header({ applicationUrl }) {
  return (
    <header className="glass-strong turbulence sticky top-0 z-50 flex justify-center md:justify-between items-center py-5 md:py-3 px-6 md:px-12 transition-all duration-300 shadow-xl border-b border-white/20">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <img
          src="/algolab.png"
          alt="Logo"
          className="h-12 md:h-16 brightness-0 invert"
        />
      </div>

      {/* Navigation and Apply button - Hidden on mobile */}
      <div className="hidden md:flex flex-row items-center ml-auto">
        <nav className="nav mr-8">
          <ul className="flex flex-row space-x-8 text-center">
            {[
              { name: "Hakkında", id: "hakkinda" },
              { name: "Puanlar", id: "puanlar" },
              { name: "Etkinlikler", id: "etkinlikler" },
              { name: "SSS", id: "sss" },
              { name: "Ekibimiz", id: "ekibimiz" },
              // { name: "Galeri", id: "galeri" },
            ].map((item) => (
              <li key={item.name}>
                <a
                  href={`#${item.id}`}
                  className="block text-gray-300 hover:text-white transition-colors duration-200 font-medium text-sm tracking-wide uppercase"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(item.id);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={applicationUrl || "#"}
          target={applicationUrl ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full font-semibold shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
        >
          Başvur
        </a>
      </div>
    </header>
  );
}
export default Header;
