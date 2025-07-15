import { Outlet, NavLink } from "react-router-dom";

const AdminDashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
        <nav className="flex flex-col gap-2">
          <NavLink to="/admin">Profile</NavLink>
          <NavLink to="/admin/members">Manage Members</NavLink>
          <NavLink to="/admin/announcements">Make Announcement</NavLink>
          <NavLink to="/admin/agreements">Agreement Requests</NavLink>
          <NavLink to="/admin/coupons">Manage Coupons</NavLink>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboardLayout;
