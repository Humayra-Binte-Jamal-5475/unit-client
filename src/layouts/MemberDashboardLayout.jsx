import { Link, Outlet } from "react-router-dom";
const MemberDashboardLayout = () => (
  <div className="flex min-h-screen">
    <aside className="w-64 bg-gray-800 text-white p-4 space-y-3">
      <h2 className="text-2xl font-bold">Member Dashboard</h2>
      <Link to="profile" className="block hover:underline">My Profile</Link>
      <Link to="make-payment" className="block hover:underline">Make Payment</Link>
      <Link to="payments" className="block hover:underline">Payment History</Link>
      <Link to="announcements" className="block hover:underline">Announcements</Link>
    </aside>
    <main className="flex-1 p-6 bg-gray-50">
      <Outlet />
    </main>
  </div>
);
export default MemberDashboardLayout;
