import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import logo from "../assets/logo.jpg";
import { FaCircleUser } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import Swal from "sweetalert2";

/***************************
 *  NavBar — Unité (Slate & Sandstone palette)
 ***************************/
const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          text: "You have been logged out.",
          icon: "success",
          confirmButtonText: "Close",
        });
        setOpen(false);
      })
      .catch((err) => console.error("Logout error:", err));
  };

  const navLinkStyle = ({ isActive }) =>
    `hover:text-[#DAA49A] transition-colors ${
      isActive ? "text-[#334155] font-semibold" : "text-[#1F1F1F]"
    }`;

  return (
    <nav className="bg-[#F4EDE4]/80 backdrop-blur shadow-md px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* Logo + brand */}
      <Link to="/" className="text-xl font-bold text-[#334155] flex items-center gap-2">
        <img src={logo} alt="Unité logo" className="w-8 h-8 rounded-full object-cover" />
        <span>Unité</span>
      </Link>

      {/* Navigation Links */}
      <ul className="hidden md:flex space-x-6 items-center font-medium">
        <li>
          <NavLink to="/" className={navLinkStyle} end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/apartments" className={navLinkStyle}>
            Apartment
          </NavLink>
        </li>
      </ul>

      {/* Auth section */}
      {user ? (
        <div className="relative">
          <button onClick={() => setOpen(!open)} className="flex items-center gap-2">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="User"
                className="h-9 w-9 rounded-full border-2 border-[#334155] object-cover"
              />
            ) : (
              <FaCircleUser className="h-8 w-8 text-[#334155]" />
            )}
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white shadow-lg overflow-hidden">
              <div className="px-4 py-3 text-sm font-medium text-[#1F1F1F] border-b">
                {user.displayName || user.name}
              </div>

              {/* role‑aware dashboard link */}
              <Link
                to={user.role === "admin" ? "/admin" : "/dashboard"}
                className="flex items-center gap-2 px-4 py-3 hover:bg-[#F4EDE4] text-[#1F1F1F]"
                onClick={() => setOpen(false)}
              >
                <MdDashboard />
                {user.role === "admin" ? "Admin Panel" : "Dashboard"}
              </Link>

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-3 hover:bg-[#F4EDE4] text-[#B35648]"
              >
                <FiLogOut /> Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link to="/auth/login" className="p-2 rounded-full hover:bg-[#F4EDE4]">
          <FaCircleUser className="h-7 w-7 text-[#334155]" />
        </Link>
      )}
    </nav>
  );
};

export default NavBar;




