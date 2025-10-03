import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { FaHandshake, FaShieldAlt, FaUserCheck, FaUniversalAccess, FaTruck, FaHeadset, FaCreditCard, FaTags, FaUndo, FaUserShield } from "react-icons/fa";
import Button from "../../components/Button/Button";



const AboutPage = () => {
    return (
        <div className="bg-gray-50 text-gray-800">
            {/* Hero Section */}
            <section className="bg-primary py-12 px-6 text-center">
                <motion.h1
                    className="text-3xl sm:text-4xl font-bold font-rubik mb-4 text-white"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    About MediHaat
                </motion.h1>
                <motion.p
                    className="text-sm font-rubik text-white max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Your trusted partner for genuine pharmacy products online
                </motion.p>
            </section>

            {/* Who We Are */}
            <section className="custom-container  py-12 px-6 grid md:grid-cols-2 gap-10">
                <img
                    src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=847&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="about page title images"
                    loading="lazy"
                    className="rounded-2xl h-[400px] w-full object-cover "
                />
                <div>
                    <h2 className="text-xl font-bold font-rubik tracking-wide mb-4">Who We Are</h2>
                    <p className="text-sm  leading-relaxed mb-3">
                        MediHaat is a reliable and customer-focused online pharmacy platform
                        dedicated to making healthcare products more accessible to everyone.
                        We provide a wide range of pharmacy and healthcare essentials,
                        ensuring that every product is 100% authentic, safe, and delivered
                        to your doorstep with care.
                    </p>
                    <p className="text-sm  leading-relaxed mb-3">
                        We started MediHaat with a vision to bridge the gap between people
                        and trusted pharmacy products. Whether it’s essential medicines,
                        healthcare supplements, or wellness products, MediHaat brings
                        everything under one platform for your convenience.
                    </p>

                    <h2 className="text-md font-bold mb-2">Our Mission</h2>
                    <ul className="  text-sm">
                        <li className="flex items-start gap-2">
                            <FaCheckCircle className="text-primary mt-1" /> Deliver genuine and
                            verified pharmacy products at fair prices.
                        </li>
                        <li className="flex items-start gap-2">
                            <FaCheckCircle className="text-primary mt-1" /> Ensure safe, secure,
                            and fast delivery at your doorstep.
                        </li>
                        <li className="flex items-start gap-2">
                            <FaCheckCircle className="text-primary mt-1" /> Build a trusted
                            healthcare marketplace where customers can shop with confidence.
                        </li>
                    </ul>
                </div>
            </section>


            {/* Values */}
            <section className="max-w-7xl mx-auto py-12 px-6">
                <h2 className="text-[24px] font-rubik font-bold text-center mb-8">
                    Our Values
                </h2>

                <div className="grid   md:grid-cols-2 lg:grid-cols-4 gap-6 text-center font-rubik">
                    {[
                        {
                            title: "Trust & Transparency",
                            icon: <FaHandshake size={30} className="mx-auto mb-2 text-primary" />,
                        },
                        {
                            title: "Quality Assurance",
                            icon: <FaShieldAlt size={30} className="mx-auto mb-2 text-primary" />,
                        },
                        {
                            title: "Customer First",
                            icon: <FaUserCheck size={30} className="mx-auto mb-2 text-primary" />,
                        },
                        {
                            title: "Accessibility",
                            icon: <FaUniversalAccess size={30} className="mx-auto mb-2 text-primary" />,
                        },
                    ].map((value, index) => (
                        <motion.div
                            key={index}
                            className=" text-black bg-white p-4 rounded-md shadow hover:shadow-sm transition cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                        >
                            {value.icon}
                            <p className="font-semibold text-sm">{value.title}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="max-w-7xl mx-auto py-12 px-6 text-center">
                <h2 className="text-[24px] font-bold font-rubik mb-6">Why Choose MediHaat</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[
                        {
                            title: "100% Genuine & Licensed Products",
                            icon: <FaShieldAlt size={30} className="mx-auto mb-3 text-green-600" />,
                        },
                        {
                            title: "Easy & Secure Payment Methods",
                            icon: <FaCreditCard size={30} className="mx-auto mb-3 text-green-600" />,
                        },
                        {
                            title: "Fast & Reliable Home Delivery",
                            icon: <FaTruck size={30} className="mx-auto mb-3 text-green-600" />,
                        },
                        {
                            title: "Dedicated Customer Support",
                            icon: <FaHeadset size={30} className="mx-auto mb-3 text-green-600" />,
                        },
                        {
                            title: "Affordable & Transparent Pricing",
                            icon: <FaTags size={30} className="mx-auto mb-3 text-green-600" />,
                        },
                        {
                            title: "Easy Return & Refund Policy",
                            icon: <FaUndo size={30} className="mx-auto mb-3 text-green-600" />,
                        },
                        {
                            title: "Data Privacy & Security",
                            icon: <FaUserShield size={30} className="mx-auto mb-3 text-green-600" />,
                        },
                        {
                            title: "Trusted by Thousands of Customers",
                            icon: <FaCheckCircle size={30} className="mx-auto mb-3 text-green-600" />,
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-4 shadow hover:shadow-md cursor-pointer transition"
                        >
                            {item.icon}
                            <p className="text-sm font-rubik font-medium">{item.title}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Commitment */}
            <section className="max-w-4xl mx-auto py-12 px-6 text-center">
                <h2 className="text-[24px] font-bold font-rubik mb-4">Our Commitment</h2>
                <p className="text-sm  leading-relaxed">
                    At MediHaat, we understand that your health comes first. That’s why we
                    are committed to providing only authentic, quality products and the
                    best service possible. We are not just an e-commerce platform; we are
                    your healthcare partner.
                </p>
            </section>

            {/* Call to Action */}
            <section className=" custom-container rounded-box bg-gradient-to-r from-primary to-primary/90 py-12 px-6 text-center text-white mb-10">
                <h2 className="text-[24px] font-rubik tracking-wide font-bold mb-4">
                    Your health is our priority.
                </h2>
                <p className="mb-6 text-sm">
                    Shop with confidence at MediHaat and get genuine pharmacy products
                    delivered to your doorstep.
                </p>
                <button className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-black cursor-pointer  ">
                    Shop Now
                </button>
            </section>
        </div>
    );
};

export default AboutPage;
