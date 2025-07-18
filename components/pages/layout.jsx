import image from "../images/Swapskill.png";
import logo from "../logo/logo.svg";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useRef, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Layout = () => {
  const navigate = useNavigate();
  const [isrole, setIsRole] = useState(
    !!localStorage.getItem("role")
  )
  const [active, setActive] = useState(false)

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const leftbarRef = useRef();
  const [leftbarOpen, setLeftBarOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const leftbarbutton = () => {
    setLeftBarOpen(!leftbarOpen)
  }

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

  useEffect(() => {
    const checkrole = () => {
      const role = localStorage.getItem("role")
      if (role === "create"){
        setActive(true)
      }
      else if(role === "offer"){
        setActive(false)
      }
    }
    checkrole()
  },[])

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (leftbarRef.current && !leftbarRef.current.contains(event.target)) {
        setLeftBarOpen(false);
      }
    };

    if (leftbarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [leftbarOpen]);

  return (
    <>
      <div className="relative bg-gradient-to-b from-black/30 to-black/10 backdrop-blur-md">
        <header className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto mt-8 border-b border-white/20">
          {/* Left: Logo + Title + Sidebar Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={leftbarbutton}
              aria-label="Toggle Sidebar"
              className="text-gray-200 hover:text-green-500 text-2xl md:text-3xl transition-colors"
            >
              {leftbarOpen ? (<i className="bi bi-list"></i>) : (<i className="bi bi-list"></i>)}
              
            </button>

            <button
              aria-label="Theme Toggle"
              className="text-gray-200 hover:text-green-500 text-2xl md:text-3xl transition-colors"
            >
              <i className="bi bi-circle-half"></i>
            </button>

            <h1 className="text-white font-bold tracking-wide text-lg md:text-2xl">
              Swapskill
            </h1>
          </div>

          {/* Right: Search + Bell + Menu */}
          <div className="flex items-center gap-5 md:gap-6">
            {/* Search */}
            <div className="relative w-40 md:w-64 hidden md:flex">
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
  className="absolute right-6 mt-4 w-44  bg-white/13 backdrop-blur-md rounded-xl p-4 shadow-xl z-50"
>
  <ul className="flex flex-col gap-2 text-center text-gray-200 font-medium">
    <li className="hover:bg-green-600/80 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200">
      Profile
    </li>
    <li className="hover:bg-green-600/80 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200">
      Task
    </li>
    <li className="hover:bg-green-600/80 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200">
      Certificates
    </li>
    <li className="hover:bg-green-600/80 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200">
      Lookup
    </li>
    <li className="hover:bg-green-600/80 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200">
      Settings
    </li>
    <li className="hover:bg-green-600/80 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200">
      Save Up
    </li>
    {isLoggedIn ? (
      <button
        onClick={handleLogout}
        className="w-full text-center px-3 py-2 mt-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
      >
        Sign out
      </button>
    ) : (
      <Link
        to="/login"
        className="block px-3 py-2 mt-2 bg-green-600 hover:bg-green-700 rounded-lg text-center transition-colors duration-200"
      >
        Sign in
      </Link>
    )}
  </ul>
</nav>

        )}
      </div>



      {setIsLoggedIn && active && (
        <div>
        {!leftbarOpen ? ("") : 
        (<div
          ref={leftbarRef}
          className="absolute left-0 w-full max-w-sm bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8 md:p-12 text-white z-10">
            <ul class="flex flex-col justify-evenly items-center gap-8 text-md">
              <div class="hover:bg-gradient-to-r hover:from-green-700 hover:to-green-950  w-full duration-500 p-2 rounded">
                <Link to="/" >
                <li class="flex gap-4"><i class="bi bi-house"></i>Home</li>
                </Link>
              </div>
              
              <div class="hover:bg-gradient-to-r hover:from-green-700 hover:to-green-950 w-full duration-500 p-2 rounded">
                <Link to="/addskill" ><li class="flex gap-4"><i class="bi bi-plus-circle"></i>Add skill</li></Link>
              </div>
              <div class="hover:bg-gradient-to-r hover:from-green-700 hover:to-green-950 w-full duration-500 p-2 rounded">
                <li class="flex gap-4"><i class="bi bi-pencil-square"></i>Edit skill</li>
              </div>
              <div class="hover:bg-gradient-to-r hover:from-green-700 hover:to-green-950 w-full duration-500 p-2 rounded">
                <Link to="/dashboard"><li>Dashboard</li></Link>
              </div>
              <div class="hover:bg-gradient-to-r hover:from-green-700 hover:to-green-950 w-full duration-500 p-2 rounded">
                <li>Ai chat</li>
              </div>
              <div class="hover:bg-gradient-to-r hover:from-green-700 hover:to-green-950 w-full duration-500 p-2 rounded">
                <li>Report</li>
              </div>
              <div class="hover:bg-gradient-to-r hover:from-green-700 hover:to-green-950 w-full duration-500 p-2 rounded">
                <li>Request</li>
              </div>
              <div class="hover:bg-gradient-to-r hover:from-green-700 hover:to-green-950 w-full duration-500 p-2 rounded">
                <li>Offer</li>
              </div>
            </ul>
          </div>)}
      </div>
      )}
      


      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </>
  );
};
