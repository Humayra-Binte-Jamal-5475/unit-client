import { Outlet } from "react-router";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

const HomeLayout = () => {

    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default HomeLayout;