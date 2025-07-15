import image from "../images/Swapskill.png";
import logo from "../logo/logo.svg";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useRef, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Layout = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
    localStorage.removeItem("is_superuser");
    setIsLoggedIn(false);
    setMenuOpen(false);
    navigate("/login");
  };

  // ✅ Check login status on mount
  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem("access_token"));
    };
    checkLogin();
  }, []);

  // ✅ Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      <div className="relative bg-gradient-to-b from-black/30 to-black/10 backdrop-blur-md">
        <header className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto mt-8 border-b border-white/20">
          {/* Left: Logo + Title + Sidebar Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleMenu}
              aria-label="Toggle Sidebar"
              className="text-gray-200 hover:text-green-500 text-2xl md:text-3xl transition-colors"
            >
              <i className="bi bi-list"></i>
            </button>

            <button
              aria-label="Theme Toggle"
              className="text-gray-200 hover:text-green-500 text-2xl md:text-3xl transition-colors"
            >
              <i className="bi bi-circle-half"></i>
            </button>

            <h1 className="text-white font-bold tracking-wide text-lg md:text-2xl">
              Dashboard
            </h1>
          </div>

          {/* Right: Search + Bell + Menu */}
          <div className="flex items-center gap-5 md:gap-6">
            {/* Search */}
            <div className="relative w-40 md:w-64">
              <input
                type="search"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm backdrop-blur-sm"
              />
              <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-white/60"></i>
            </div>

            {/* Notifications */}
            <div className="relative group">
              <button
                aria-label="Notifications"
                className="text-white hover:text-green-500 text-2xl md:text-3xl transition-colors"
              >
                <i className="bi bi-bell"></i>
              </button>
              <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded bg-black/80 text-white text-xs px-3 py-1 opacity-0 group-hover:opacity-100 transition">
                No message to view here
              </span>
            </div>

            {/* User Menu */}
            <button
              onClick={toggleMenu}
              aria-label="User Menu"
              className={`text-2xl md:text-3xl transition-colors ${
                menuOpen
                  ? "text-green-400 hover:text-green-200"
                  : "text-white hover:text-green-500"
              }`}
            >
              <i className="bi bi-hypnotize"></i>
            </button>
          </div>
        </header>

        {/* Dropdown Menu */}
        {menuOpen && (
          <nav
            ref={menuRef}
            className="absolute right-6 mt-4 w-40 bg-black/70 backdrop-blur-md border border-white/20 rounded-lg p-4 shadow-lg z-50"
          >
            <ul className="flex flex-col gap-3 text-center text-white font-medium ">
              <li className="hover:text-green-400 cursor-pointer transition">
                Profile
              </li>
              <li className="hover:text-green-400 cursor-pointer transition">
                Task
              </li>
              <li className="hover:text-green-400 cursor-pointer transition">
                Certificates
              </li>
              <li className="hover:text-green-400 cursor-pointer transition">
                Lookup
              </li>
              <li className="hover:text-green-400 cursor-pointer transition">
                Settings
              </li>
              <li className="hover:text-green-400 cursor-pointer transition">
                Save Up
              </li>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="hover:text-green-400 transition text-left"
                >
                  Sign out
                </button>
              ) : (
                <Link to="/login" className="hover:text-green-400 transition">
                  Sign in
                </Link>
              )}
            </ul>
          </nav>
        )}
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </>
  );
};
