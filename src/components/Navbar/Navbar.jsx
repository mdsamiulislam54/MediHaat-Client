import React, { useEffect, useState } from "react";
import Logo from "../../components/Logo/Logo";
import { Link } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItem = (
    <>
      <li>
        <Link to="/" className="hover:bg-primary/15 ">Home</Link>
      </li>
      <li>
        <Link to="/shop" className="hover:bg-primary/15 ">Shop</Link>
      </li>
      <li>
        <Link to="/about" className="hover:bg-primary/15 ">About</Link>
      </li>
      <li>
        <Link to="/services" className="hover:bg-primary/15 ">Services</Link>
      </li>
      <li>
        <Link to="/contact" className="hover:bg-primary/15 ">Contact</Link>
      </li>
      <li>
        <Link to="/faq" className="hover:bg-primary/15 ">FAQ</Link>
      </li>
    </>
  );

  const menuItem = (
    <>
      {/* Cart */}
      <li>
        <div className="indicator relative cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-primary xl:text-black"
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
          <span className="badge badge-sm indicator-item absolute md:-top-3 -top-5 md:right-2 transform translate-x-2 translate-y-2 bg-primary border-0 text-white">
            0
          </span>
        </div>
      </li>

      {/* Language Select */}
      <li>
        <select className="bg-white text-primary border-2 border-primary px-4 py-2 rounded-md text-sm">
          <option>English</option>
          <option>Bangla</option>
        </select>
      </li>

      {/* Join Button */}
      <li>
        <Link
          to="/login"
          className="btn bg-white text-primary border-2 border-primary px-6 py-2 rounded-md text-sm hover:bg-[#00a08a] hover:text-white"
        >
          Join Us
        </Link>
      </li>
    </>
  );

  return (
    <>
      <nav className={` ${scrollY > 50 ? "fixed-nav bg-gradient-to-br from-green-100 to-white shadow py-3" :'py-3  relative z-50'}`}>
        <div className="flex items-center justify-between w-11/12 mx-auto ">
          {/* logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              <Logo color="text-primary" />
            </Link>
          </div>

          {/* navItem (desktop only) */}
          <div className="hidden xl:flex">
            <ul className="menu menu-horizontal gap-5 text-[16px] font-medium ">
              {navItem}
            </ul>
          </div>

          {/* menuItem (desktop only) */}
          <div className="hidden xl:flex">
            <ul className="menu menu-horizontal gap-3 items-center">
              {menuItem}
            </ul>
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
            className="fixed top-0 left-0 w-3/4 h-full bg-white shadow z-[100] flex flex-col"
          >
            {/* header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-primary">
              <Logo color="text-primary" />
              <button
                onClick={() => setMenuOpen(false)}
                className="text-3xl text-primary"
              >
                <IoClose />
              </button>
            </div>

            {/* menu items */}
            <ul className="flex flex-col gap-5 text-primary text-lg font-medium p-5">
              {navItem}
            </ul>

            {/* right side content in mobile */}
            <ul className="flex  gap-4 p-5 border-t border-primary mt-auto">
              {menuItem}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
