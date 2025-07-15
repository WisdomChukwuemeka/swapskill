import image from "../images/Swapskill.png";
import logo from "../logo/logo.svg";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";

export const Layout = () => {
  const [menu, setMenu] = useState(true);
  const menubar = () => {
    setMenu(!menu);
  };

  return (
    <>
      <div className="bg-gradient-to-b from-black/30 to-black/10 backdrop-blur-md shadow-md">
        <header className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <button onClick={menubar} className="text-gray-200 hover:text-green-500 text-2xl md:text-3xl lg:text-4xl">
              <i className="bi bi-list"></i>
            </button>

            <button className="text-gray-200 hover:text-green-500 text-2xl md:text-3xl lg:text-4xl">
              <i className="bi bi-circle-half"></i>
            </button>

            <h2 className="text-white font-semibold text-lg tracking-wide md:text-3xl lg:text-4xl">Swapskill</h2>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-6">
            {/* Search input */}
            <div className="relative w-full max-w-xs">
              <input
                type="search"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm backdrop-blur-md"
              />
              <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-white/60"></i>
            </div>

            {/* Bell icon with tooltip */}
            <div className="relative group">
              <i className="bi bi-bell text-white hover:text-green-500 text-xl md:text-3xl lg:text-4xl cursor-pointer transition-colors"></i>
              <p className="absolute left-1/2 top-full mt-2 md:text-sm lg:text-lg -translate-x-1/2 whitespace-nowrap rounded bg-black/80 text-white text-xs px-3 py-1 opacity-0 group-hover:opacity-100 transition">
                No message to view here
              </p>
            </div>

            {/* Extra icon */}
            <i className="bi bi-hypnotize text-white hover:text-green-500 text-xl md:text-3xl lg:text-4xl cursor-pointer transition-colors"></i>
          </div>
        </header>
      </div>
    </>
  );
};
