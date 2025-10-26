import React, { use, useContext, useEffect, useState } from "react";
import Logo from "../../components/Logo/Logo";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { FiLogOut, FiUser, FiHome } from "react-icons/fi";
import { FaCartPlus } from "react-icons/fa6";
import { UserAuth } from "../../hooks/userAuth/userAuth";

import Swal from "sweetalert2";

import { CartContext } from "../../Contextapi/AddToCart/cartContext";
import Button from "../Button/Button";
import { toast } from "react-toastify";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
    const {pathname}= useLocation()
  const [scrollY, setScrollY] = useState(0);
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const { user, logOut, setUser } = UserAuth();
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  useEffect(() => {

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = () => {
    logOut()
      .then(() => {
       toast.success("Logout Successful!");
        setUser(null);
        navigate("/");
        setDropdownMenu(false);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "LogOut Failed!",
        });
      });
  };

  const navItem = (
    <>
      <li>
        <Link to="/" className="hover:border-b-2 border-primary transition p-2 ">
          Home
        </Link>
      </li>
      <li>
        <Link to="/shop" className="hover:border-b-2 border-primary transition p-2 ">
          Shop
        </Link>
      </li>
      <li>
        <Link to="/about" className="hover:border-b-2 border-primary transition p-2  ">
          About
        </Link>
      </li>
      <li>
        <Link to="/shop" className="hover:border-b-2 border-primary transition p-2  ">
          Services
        </Link>
      </li>
      <li>
        <Link to="/contact" className="hover:border-b-2 border-primary transition p-2  ">
          Contact
        </Link>
      </li>
      <li>
        <Link to="/faq" className="hover:border-b-2 border-primary transition p-2  ">
          FAQ
        </Link>
      </li>
    </>
  );

  const menuItem = (
    <>
      {/* Cart */}
      <li className="list">
        <Link to={"/cart-page"} className="indicator relative cursor-pointer">
          <FaCartPlus className="text-2xl" />
          <span className="  absolute md:-top-7 -top-5 md:right-0 transform translate-x-2 translate-y-2 border-0 text-primary text-xl font-bold font-syne">
            {cart.length}
          </span>
        </Link>
      </li>

     

      {/* Join Button */}
      {!user ? (
        <li>
          <Link
            to="/login"
           
          >
            <Button children={"Join Us"} className={"text-white"}/>
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
            ? "fixed-nav bg-gradient-to-br relative bg-white shadow py-2"
            : pathname === '/'? "py-3 absolute w-full bg-white/10 text-white  z-100 ": " shadow py-2 relative z-100 "
        }`}
      >
        <div className="flex items-center justify-between custom-container   ">
          {/* logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              <Logo color={`${scrollY > 50 ? " text-black": pathname === '/'? "text-white":"text-black"}`} />
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
            className="fixed top-0 left-0 w-[85%] sm:w-2/4 h-full bg-white to-white shadow-lg z-[200] flex flex-col"
          >
            {/* header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-primary ">
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
