import React from "react";
import { Link, Navigate, NavLink } from "react-router";
import {
  IoClose, IoHomeOutline, IoCartOutline, IoPeopleOutline, IoAddCircleOutline,
  IoPricetagsOutline, IoCashOutline, IoStatsChartOutline, IoImageOutline, IoLogOutOutline
} from "react-icons/io5";
import { UserAuth } from "../../../hooks/userAuth/userAuth";
import Swal from "sweetalert2";

const Sidebar = ({ closeSidebar }) => {
  const { user, logOut, role,setUser } = UserAuth();

   const handleLogOut = ()=>{
        logOut()
        .then(()=>{
          Swal.fire({
            icon:"success",
            title:"LogOut Successful!"
          })
          setUser(null)
          Navigate('/');
   
  
        }).catch(()=>{
          Swal.fire({
            icon:"error",
            title:"LogOut Failed!"
          })
        })
    }

  return (
    <div className="flex flex-col h-full p-4 relative ">

      {/* Top section */}
      <div className="flex items-center justify-between mb-6 absolute top-0 right-0 m-2">
        
        <button onClick={closeSidebar} className="text-2xl md:hidden">
          <IoClose />
        </button>
      </div>

      {/* Profile Image */}
      <div className="flex flex-col items-center gap-2 mb-6">
        <img
          src={user?.photoURL || "https://i.ibb.co/4ZfHgYk/user.png"}
          alt="Profile"
          className="w-16 h-16 rounded-full border-2 border-primary"
        />
        <h4 className="text-lg font-semibold text-gray-800">{user?.displayName || "User"}</h4>
        <p className="text-xs text-gray-500">{user?.email}</p>
      </div>

      {/* Sidebar Links */}
      <nav className="flex flex-col gap-2 text-gray-700 font-medium flex-1">

        <NavLink to="/dashboard" className="flex items-center gap-2 hover:bg-secondary p-2 hover:text-primary transition-all duration-300 ">
          <IoHomeOutline /> Home
        </NavLink>

        {role?.includes("user") && (
          <>
            <NavLink to="/dashboard/my-orders" className="flex items-center gap-2  hover:bg-secondary p-2 hover:text-primary transition-all duration-300 ">
              <IoCartOutline /> My Orders
            </NavLink>
            <NavLink to="/dashboard/profile" className="flex items-center gap-2 hover:bg-secondary p-2 hover:text-primary transition-all duration-300 ">
              <IoPeopleOutline /> My Profile
            </NavLink>
          </>
        )}

        {role?.includes("seller") && (
          <>
            <NavLink to="/dashboard/add-medicine" className="flex items-center gap-2 hover:bg-secondary p-2 hover:text-primary transition-all duration-300 ">
              <IoAddCircleOutline /> Add Medicine
            </NavLink>
            <NavLink to="/dashboard/my-medicines" className="flex items-center gap-2 hover:bg-secondary p-2 hover:text-primary transition-all duration-300 ">
              <IoPricetagsOutline /> My Medicines
            </NavLink>
            <NavLink to="/dashboard/payment-history" className="flex items-center gap-2 hover:bg-secondary p-2 hover:text-primary transition-all duration-300 ">
              <IoCashOutline /> Payment History
            </NavLink>
            <NavLink to="/dashboard/advertise-request" className="flex items-center gap-2 hover:bg-secondary p-2 hover:text-primary transition-all duration-300 ">
              <IoImageOutline /> Advertise Request
            </NavLink>
          </>
        )}

        {role?.includes("admin") && (
          <>
            <NavLink to="/dashboard/manage-users" className="flex items-center gap-2 hover:bg-secondary p-2 hover:text-primary transition-all duration-300 ">
              <IoPeopleOutline /> Manage Users
            </NavLink>
            <NavLink to="/dashboard/manage-category" className="flex items-center gap-2 hover:bg-secondary p-2 hover:text-primary transition-all duration-300 ">
              <IoPricetagsOutline /> Manage Categories
            </NavLink>
            <NavLink to="/dashboard/payment-management" className="flex items-center gap-2 hover:bg-secondary p-2 hover:text-primary transition-all duration-300 ">
              <IoCashOutline /> Payment Management
            </NavLink>
            <NavLink to="/dashboard/sales-report" className="flex items-center gap-2 hover:bg-secondary p-2 hover:text-primary transition-all duration-300 ">
              <IoStatsChartOutline /> Sales Report
            </NavLink>
            <NavLink to="/dashboard/manage-banner" className="flex items-center gap-2 hover:bg-secondary p-2 hover:text-primary transition-all duration-300 ">
              <IoImageOutline /> Manage Banner Ads
            </NavLink>
          </>
        )}

      </nav>

      {/* Logout Button at Bottom */}
      <div
        
        className="flex items-center justify-between gap-2 text-left text-red-600 mt-8"
      >
       <button onClick={handleLogOut} className="flex items-center gap-2"> <IoLogOutOutline /> Logout</button>
       <Link to={'/'} className="text-primary cursor-pointer" title='Back To Home'><IoHomeOutline/></Link>
      </div>
    </div>
  );
};

export default Sidebar;
