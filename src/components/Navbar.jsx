import { Link, NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import logo from "../assets/logo.jpg";
import { FaCircleUser } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { BsMoonStars, BsSun } from "react-icons/bs";
import Swal from "sweetalert2";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Apply theme to <html>
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme); 
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({ text: "You have been logged out.", icon: "success", confirmButtonText: "Close" });
        setOpen(false);
      })
      .catch((err) => console.error(err));
  };

  const navLinkStyle = ({ isActive }) =>
    `hover:text-[#DAA49A] transition-colors ${isActive ? "text-[#334155] font-semibold dark:text-[#F4EDE4]" : "text-[#1F1F1F] dark:text-gray-200"}`;

  return (
    <nav className="bg-[#F4EDE4]/80 dark:bg-[#1f1f1f]/90 backdrop-blur shadow-md px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold flex items-center gap-2 text-[#334155] dark:text-white">
        <img src={logo} alt="logo" className="w-8 h-8 rounded-full object-cover" />
        <span>Unité</span>
      </Link>

      {/* Links */}
      <ul className="hidden md:flex space-x-6 items-center font-medium">
        <li><NavLink to="/" className={navLinkStyle} end>Home</NavLink></li>
        <li><NavLink to="/apartments" className={navLinkStyle}>Apartment</NavLink></li>

        {!user && (
          <>
            <li><NavLink to="/auth/login" className={navLinkStyle}>Login</NavLink></li>
          </>
        )}

        {user && (
          <>
            <li>
              <button
                onClick={handleLogout}
                className="text-[#B35648] hover:text-[#DAA49A] transition-colors"
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>

      {/* Right: Theme + user dropdown */}
      <div className="flex items-center gap-3">
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-[#e5ddd4] dark:hover:bg-[#2a2a2a]">
          {theme === "dark" ? <BsSun className="h-6 w-6 text-yellow-400" /> : <BsMoonStars className="h-6 w-6 text-[#334155]" />}
        </button>

        {user && (
          <div className="relative">
            <button onClick={() => setOpen(!open)} className="flex items-center gap-2">
              {user.photoURL ? (
                <img src={user.photoURL} alt="User" className="h-9 w-9 rounded-full border-2 border-[#334155] object-cover" />
              ) : (
                <FaCircleUser className="h-8 w-8 text-[#334155] dark:text-gray-200" />
              )}
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white dark:bg-[#2a2a2a] shadow-lg overflow-hidden">
                <div className="px-4 py-3 text-sm font-medium text-[#1F1F1F] dark:text-gray-200 border-b dark:border-gray-700">
                  {user.displayName || user.name}
                </div>
                <Link
                  to={user.role === "admin" ? "/admin" : user.role === "member" ? "/member" : "/dashboard"}
                  className="flex items-center gap-2 px-4 py-3 hover:bg-[#F4EDE4] dark:hover:bg-[#3a3a3a] text-[#1F1F1F] dark:text-gray-200"
                  onClick={() => setOpen(false)}
                >
                  <MdDashboard />
                  Dashboard
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;






