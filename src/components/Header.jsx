import React, { useState } from "react";

function Header({ applicationUrl }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="glass-strong sticky top-0 z-50 flex flex-wrap justify-between items-center py-3 px-6 md:px-12 transition-all duration-300">
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

      {/* Mobile menu button */}
      <button
        className="md:hidden text-white p-2 focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Navigation and Apply button */}
      <div
        className={`${isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row w-full md:w-auto items-center md:items-center transition-all duration-300 ease-in-out mt-4 md:mt-0`}
      >
        <nav className="nav w-full md:w-auto md:ml-auto">
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-center">
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
                    setIsMenuOpen(false);
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
          className="mt-4 md:mt-0 md:ml-8 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full font-semibold shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
        >
          Başvur
        </a>
      </div>
    </header>
  );
}
export default Header;
