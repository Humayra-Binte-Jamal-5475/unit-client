import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-200 p-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <ul className="space-y-2">
          <li>
            <Link to="/" className="block p-2 hover:bg-gray-300">Home</Link>
          </li>
          <li>
            <Link to="/dashboard/profile" className="block p-2 hover:bg-gray-300">My Profile</Link>
          </li>
          <li>
            <Link to="/dashboard/announcements" className="block p-2 hover:bg-gray-300">Announcements</Link>
          </li>
        </ul>
      </aside>
      <section className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </section>
    </div>
  );
};

export default DashboardLayout;

