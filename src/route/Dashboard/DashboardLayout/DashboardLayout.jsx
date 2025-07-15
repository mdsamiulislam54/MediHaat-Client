import React, { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../Sidebar/Sidebar";
import { IoMenu } from "react-icons/io5";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 max-md:mt-14">

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full  w-64 bg-white   shadow-md shadow-primary z-100
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}>

        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 text-3xl  z-50 btn bg-primary text-white"
      >
        <IoMenu />
      </button>

      {/* Content area */}
      <div className="flex-1 ml-0 md:ml-64 p-4">
        <Outlet />
      </div>

    </div>
  );
};

export default DashboardLayout;
