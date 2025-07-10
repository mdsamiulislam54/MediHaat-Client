import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex } from "react-icons/fa";
import Logo from "../Logo/Logo";
import { Link } from "react-router";
import Button from "../Button/Button";

const Footer = () => {
  return (
    <div className=" bg-gradient-to-br from-green-100 to-white  text-gray-700 pt-12 pb-6">
      <div className="w-11/12 mx-auto grid md:grid-cols-4 gap-10">
        {/* Logo + Description */}
        <div>
          <div className="text-start inline-block">
            <Logo color={"text-primary "} />
          </div>
          <p className="text-sm text-gray-800">
            Your trusted online medical store. Shop health products,
            supplements, and medicines at the best prices.
          </p>
          {/* Social Icons */}
          <div className="flex gap-4 mt-4 text-xl">
            <FaFacebook className="text-blue-500 cursor-pointer " />
            <FaInstagram className="text-pink-500 cursor-pointer" />
            <FaTwitter className="text-sky-400 cursor-pointer" />
            <FaLinkedin className="text-blue-600 cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <Link href="#" className="hover:text-gray-700">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-700">
                Contact
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-700">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-700">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Subscribe</h3>
          <p className="text-sm text-gray-700 mb-4">
            Get the latest updates and health offers directly to your inbox.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Your Email"
              className="px-4 py-2 rounded-md outline-none w-full text-black border border-primary"
            />
            <Button children={"Join"} />
          </form>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="text-xl font-semibold mb-4">We Accept</h3>
          <div className="flex gap-4 text-4xl">
            <FaCcVisa className="hover:text-primary" />
            <FaCcMastercard className="hover:text-primary" />
            <FaCcPaypal className="hover:text-primary" />
            <FaCcAmex className="hover:text-primary" />
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-10 border-t border-primary pt-4 text-center text-sm text-gray-800">
        &copy; {new Date().getFullYear()} MediHaat — All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
