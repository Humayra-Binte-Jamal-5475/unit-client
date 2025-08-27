import { NavLink, Outlet } from "react-router-dom";

const MemberDashboardLayout = () => (
  <div className="flex min-h-screen">
    <aside className="w-64 bg-gray-800 text-white p-4 space-y-3">
      <h2 className="text-2xl font-bold">Member Dashboard</h2>
      <nav className="flex flex-col gap-2">
      <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-orange-200 font-semibold" : "hover:text-orange-200"
            }
          >Home</NavLink>
      <NavLink
            to="profile"
            className={({ isActive }) =>
              isActive ? "text-orange-200 font-semibold" : "hover:text-orange-200"
            }
          >My Profile</NavLink>
      <NavLink
            to="make-payment"
            className={({ isActive }) =>
              isActive ? "text-orange-200 font-semibold" : "hover:text-orange-200"
            }
          >Make Payment</NavLink>
      <NavLink
            to="payments"
            className={({ isActive }) =>
              isActive ? "text-orange-200 font-semibold" : "hover:text-orange-200"
            }
          >Payment History</NavLink>
      <NavLink
            to="announcements"
            className={({ isActive }) =>
              isActive ? "text-orange-200 font-semibold" : "hover:text-orange-200"
            }
          >Announcements</NavLink>
          </nav>
    </aside>
    <main className="flex-1 p-6 bg-gray-50">
      <Outlet />
    </main>
  </div>
);

export default MemberDashboardLayout;

