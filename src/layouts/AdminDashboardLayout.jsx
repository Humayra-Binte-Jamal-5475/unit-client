import { Outlet, NavLink } from "react-router-dom";

const AdminDashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
        <nav className="flex flex-col gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-yellow-300 font-semibold" : "hover:text-yellow-200"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/admin/admin-profile"
            className={({ isActive }) =>
              isActive ? "text-yellow-300 font-semibold" : "hover:text-yellow-200"
            }
          >
            Admin Profile
          </NavLink>
          <NavLink
            to="/admin/members"
            className={({ isActive }) =>
              isActive ? "text-yellow-300 font-semibold" : "hover:text-yellow-200"
            }
          >
            Manage Members
          </NavLink>
          <NavLink
            to="/admin/announcements"
            className={({ isActive }) =>
              isActive ? "text-yellow-300 font-semibold" : "hover:text-yellow-200"
            }
          >
            Make Announcement
          </NavLink>
          <NavLink
            to="/admin/agreements"
            className={({ isActive }) =>
              isActive ? "text-yellow-300 font-semibold" : "hover:text-yellow-200"
            }
          >
            Agreement Requests
          </NavLink>
          <NavLink
            to="/admin/coupons"
            className={({ isActive }) =>
              isActive ? "text-yellow-300 font-semibold" : "hover:text-yellow-200"
            }
          >
            Manage Coupons
          </NavLink>
          <NavLink
            to="/admin/overview"
            className={({ isActive }) =>
              isActive ? "text-yellow-300 font-semibold" : "hover:text-yellow-200"
            }
          >
           Overview
          </NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboardLayout;

