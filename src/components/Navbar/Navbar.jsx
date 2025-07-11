import React, { use, useEffect, useState } from "react";
import Logo from "../../components/Logo/Logo";
import { Link, NavLink, useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { FiLogOut, FiUser, FiHome } from "react-icons/fi";

import { UserAuth } from "../../hooks/userAuth/userAuth";
import Button from "../../components/Button/Button";
import Swal from "sweetalert2";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const { user,logOut,setUser } = UserAuth();
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = ()=>{
      logOut()
      .then(()=>{
        Swal.fire({
          icon:"success",
          title:"LogOut Successful!"
        })
        setUser(null)
        navigate('/');
        setDropdownMenu(false)

      }).catch(()=>{
        Swal.fire({
          icon:"error",
          title:"LogOut Failed!"
        })
      })
  }

  const navItem = (
    <>
      <li>
        <Link to="/" className="hover:bg-primary/15 p-2 ">
          Home
        </Link>
      </li>
      <li>
        <Link to="/shop" className="hover:bg-primary/15 p-2 ">
          Shop
        </Link>
      </li>
      <li>
        <Link to="/about" className="hover:bg-primary/15 p-2  ">
          About
        </Link>
      </li>
      <li>
        <Link to="/services" className="hover:bg-primary/15 p-2  ">
          Services
        </Link>
      </li>
      <li>
        <Link to="/contact" className="hover:bg-primary/15 p-2  ">
          Contact
        </Link>
      </li>
      <li>
        <Link to="/faq" className="hover:bg-primary/15 p-2  ">
          FAQ
        </Link>
      </li>
    </>
  );

  const menuItem = (
    <>
      {/* Cart */}
      <li className="list">
        <div className="indicator relative cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-primary xl:text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="badge badge-sm indicator-item absolute md:-top-5 -top-5 md:right-0 transform translate-x-2 translate-y-2 bg-primary border-0 text-white">
            0
          </span>
        </div>
      </li>

      {/* Language Select */}
      <li className="list-none">
        <select className="bg-white text-primary border-2 border-primary px-4 py-2 rounded-md text-sm">
          <option>English</option>
          <option>Bangla</option>
        </select>
      </li>

      {/* Join Button */}
      {!user ? (
        <li>
          <Link
            to="/login"
            className="btn bg-white text-primary border-2 border-primary px-6 py-2 rounded-md text-sm hover:bg-[#00a08a] hover:text-white"
          >
            Join Us
          </Link>
        </li>
      ) : (
        <div className="relative">
          <button
            className="cursor-pointer"
            onClick={() => setDropdownMenu(!dropdownMenu)}
          >
            <img
              src={user?.photoURL}
              alt=""
              className="w-10 h-10 rounded-full"
            />
          </button>
          {/* dropdown menu */}
          <AnimatePresence>
            {dropdownMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute max-md:-top-50 right-0 max-md:-right-32 bg-gradient-to-br from-white to-gray-100 p-4 rounded-xl shadow-lg shadow-primary/20 z-50"
              >
                <ul className="flex flex-col gap-3 w-48">
                  <NavLink
                    to="/dashboard"
                    className="flex items-center gap-3 text-gray-700 hover:text-primary hover:bg-gray-50 p-2 rounded-lg transition"
                  >
                    <FiHome className="text-lg" />
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/update-profile"
                    className="flex items-center gap-3 text-gray-700 hover:text-primary hover:bg-gray-50 p-2 rounded-lg transition"
                  >
                    <FiUser className="text-lg" />
                    Update Profile
                  </NavLink>
                  <button
                  onClick={handleLogOut}
                  
                    className="flex items-center gap-3 text-gray-700 hover:text-primary hover:bg-gray-50 p-2 rounded-lg transition cursor-pointer"
                  >
                    <FiLogOut className="text-lg" />
                    Logout
                  </button>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );

  return (
    <>
      <nav
        className={` ${
          scrollY > 50
            ? "fixed-nav bg-gradient-to-br relative from-green-100 to-white shadow py-3"
            : "py-3  relative z-100"
        }`}
      >
        <div className="flex items-center justify-between w-11/12 mx-auto ">
          {/* logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              <Logo color="text-primary" />
            </Link>
          </div>

          {/* navItem (desktop only) */}
          <div className="hidden xl:flex">
            <ul className=" flex gap-5 text-[16px]  font-medium  ">
              {navItem}
            </ul>
          </div>

          {/* menuItem (desktop only) */}
          <div className="hidden xl:flex">
            <ul className="flex gap-3 items-center">{menuItem}</ul>
          </div>

          {/* mobile menu button */}
          <div className="xl:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* mobile sidebar menu */}
    <AnimatePresence>
  {menuOpen && (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-[85%] sm:w-3/4 h-full bg-white shadow-lg z-[100] flex flex-col"
    >
      {/* header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-primary pt-[env(safe-area-inset-top)]">
        <Logo color="text-primary" />
        <button
          onClick={() => setMenuOpen(false)}
          className="text-3xl text-primary cursor-pointer"
        >
          <IoClose />
        </button>
      </div>

      {/* scrollable menu area */}
      <div className="flex-1 overflow-y-auto">
        <ul className="flex flex-col gap-5 text-primary text-base sm:text-lg font-medium p-5">
          {navItem}
        </ul>
      </div>

      {/* mobile bottom actions */}
      <div className="border-t border-primary p-5 flex flex-wrap gap-4">
        {menuItem}
      </div>
    </motion.div>
  )}
</AnimatePresence>

    </>
  );
};

export default Navbar;
