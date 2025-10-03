import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex } from "react-icons/fa";
import Logo from "../Logo/Logo";
import { Link } from "react-router";
import Button from "../Button/Button";

const Footer = () => {
  return (
    <div className=" bg-primary  text-gray-100 pt-12 pb-6">
      <div className="custom-container grid md:grid-cols-4 gap-10">
        {/* Logo + Description */}
        <div>
          <div className="text-start inline-block mb-4">
            <Logo color={"text-white "} />
          </div>
          <p className="text-sm text-gray-100">
            Your trusted online medical store. Shop health products,
            supplements, and medicines at the best prices.
          </p>
          {/* Social Icons */}
          <div className="flex gap-4 mt-4 text-xl">
            <FaFacebook className=" cursor-pointer " />
            <FaInstagram className=" cursor-pointer" />
            <FaTwitter className=" cursor-pointer" />
            <FaLinkedin className=" cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-100">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-100">
            <li>
              <Link href="#" className="hover:text-gray-100">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-100">
                Contact
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-100">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-100">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Subscribe</h3>
          <p className="text-sm text-gray-100 mb-4">
            Get the latest updates and health offers directly to your inbox.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Your Email"
              className="px-4 py-2 rounded-md outline-none w-full text-white border "
            />
            <button className="px-4 py-2 bg-white text-black rounded-box">Join</button>
          </form>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="text-xl font-semibold mb-4">We Accept</h3>
          <div className="flex gap-4 text-4xl">
            <FaCcVisa className="hover:text-gray-200 cursor-pointer" />
            <FaCcMastercard className="hover:text-gray-200 cursor-pointer" />
            <FaCcPaypal className="hover:text-gray-200 cursor-pointer" />
            <FaCcAmex className="hover:text-gray-200 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-10 border-t border-gray-200 pt-4 text-center text-sm text-gray-100">
        &copy; {new Date().getFullYear()} MediHaat — All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
