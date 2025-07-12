import React from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

const AuthLayout = () => {
    return (
        <div>
            <NavBar/>
             <Outlet/>
             <Footer/>            
        </div>
    );
};

export default AuthLayout;