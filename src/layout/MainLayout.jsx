import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className=" min-h-screen flex flex-col">
      <header>
        <NavBar></NavBar>
      </header>
      <main className="w-10/12 mx-auto flex flex-col flex-1">
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default MainLayout;
