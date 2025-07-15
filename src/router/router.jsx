import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home"
import ForgetPassword from '../pages/ForgetPassword.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';
import PrivateRoute from '../provider/PrivateRoute.jsx';
import NotFound from '../pages/NotFound.jsx';
import ApartmentsPage from "../pages/ApartmentsPage.jsx";
import Announcements from "../pages/dashboard/Announcements.jsx";
import MyProfile from "../pages/dashboard/MyProfile.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
export const router = createBrowserRouter([
        {
            path: "/",
            element: <HomeLayout />,
            children: [
                {
                    index: true,
                    element: <Home></Home>
                },
                {
                    path: "apartments",
                    loader: async () => {
                        const res = await fetch('http://localhost:3000/apartments');
                        const data = await res.json();
                        return data;
                    },
                    element: <ApartmentsPage></ApartmentsPage>
                },
            ]
        },
        {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          { path: "profile",       element: <MyProfile/> },
          { path: "announcements", element: <Announcements/> },
          { index: true, element: <MyProfile /> } // default dashboard page
        ],
      },
        {
            path: '/auth',
            element: <AuthLayout></AuthLayout>,
            children: [
                {
                    path: "/auth/login",
                    element: <Login />,
                },
                {
                    path: "/auth/forget",
                    element: <ForgetPassword />,
                },
                {
                    path: "/auth/register",
                    element: <Register />,
                },
            ]
        },
        {
            path: '*',
            element: <NotFound />
        }
]);