import { createBrowserRouter } from "react-router-dom";
import HomeLayout        from "../layouts/HomeLayout";
import Home              from "../pages/Home";
import ForgetPassword    from "../pages/ForgetPassword";
import Login             from "../pages/Login";
import Register          from "../pages/Register";
import AuthLayout        from "../layouts/AuthLayout";
import PrivateRoute      from "../provider/PrivateRoute";
import AdminRoute        from "../provider/AdminRoute";
import NotFound          from "../pages/NotFound";
import ApartmentsPage    from "../pages/ApartmentsPage";
import Announcements     from "../pages/dashboard/Announcements";
import MyProfile         from "../pages/dashboard/MyProfile";
import DashboardLayout   from "../layouts/DashboardLayout";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";   
import AdminProfile      from "../pages/admin/AdminProfile";          
import ManageMembers     from "../pages/admin/ManageMembers"; 
import MakeAnnouncement  from "../pages/admin/MakeAnnouncement"; 
import AgreementRequests from "../pages/admin/AgreementRequests";     
import ManageCoupons     from "../pages/admin/ManageCoupons";     

export const router = createBrowserRouter([
  /* ---------------- Home & public pages ---------------- */
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "apartments",
        loader: async () => {
          const res  = await fetch("http://localhost:3000/apartments");
          return res.json();
        },
        element: <ApartmentsPage />,
      },
    ],
  },

  /* ---------------- User / Member dashboard ---------------- */
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <MyProfile /> },
      { path: "profile",       element: <MyProfile /> },
      { path: "announcements", element: <Announcements /> },
    ],
  },

  /* ---------------- Admin dashboard (admin‑only) ---------------- */
  {
    path: "admin",
    element: (
      <PrivateRoute>
        <AdminRoute>
          <AdminDashboardLayout />
        </AdminRoute>
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <AdminProfile /> },
      { path: "members",       element: <ManageMembers /> },
      { path: "announcements", element: <MakeAnnouncement /> },
      { path: "agreements",    element: <AgreementRequests /> },
      { path: "coupons",       element: <ManageCoupons /> },
    ],
  },

  /* ---------------- Auth pages ---------------- */
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      { path: "login",   element: <Login /> },
      { path: "forget",  element: <ForgetPassword /> },
      { path: "register",element: <Register /> },
    ],
  },

  /* ---------------- 404 fallback ---------------- */
  { path: "*", element: <NotFound /> },
]);
