import React, { useState } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex flex-wrap justify-between items-center py-2 px-4 md:px-8 bg-white shadow-md relative">
      <div className="flex items-center">
        <img
          src="/assets/header/algolab_logo.png"
          alt="Logo"
          className="h-10 md:h-14"
        />
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden text-black p-2"
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

      {/* Navigation and Apply button - hidden on mobile unless menu is open */}
      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row w-full md:w-auto items-center md:items-center transition-all duration-300 ease-in-out`}
      >
        <nav className="nav w-full md:w-auto md:ml-auto">
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 py-2 md:py-0">
            <li>
              <a
                href="#hakkinda" // Updated
                className="block text-black hover:text-gray-700 py-1"
              >
                Hakkında
              </a>
            </li>
            <li>
              <a
                href="#puanlar" // Updated
                className="block text-black hover:text-gray-700 py-1"
              >
                Puanlar
              </a>
            </li>
            <li>
              <a
                href="#etkinlikler" // Updated
                className="block text-black hover:text-gray-700 py-1"
              >
                Etkinlikler
              </a>
            </li>
            <li>
              <a
                href="#sss" // Updated
                className="block text-black hover:text-gray-700 py-1"
              >
                SSS
              </a>
            </li>
            <li>
              <a
                href="#ekibimiz" // Updated
                className="block text-black hover:text-gray-700 py-1"
              >
                Ekibimiz
              </a>
            </li>
            <li>
              <a
                href="#galeri" // Updated
                className="block text-black hover:text-gray-700 py-1"
              >
                Galeri
              </a>
            </li>
          </ul>
        </nav>
        <button className="w-full md:w-auto text-black px-4 md:px-16 py-2 hover:text-gray-700 text-xl md:text-2xl cursor-pointer mt-2 md:mt-0">
          Başvur
        </button>
      </div>
    </header>
  );
}

export default Header;
