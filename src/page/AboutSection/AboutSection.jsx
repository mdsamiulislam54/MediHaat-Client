import React from "react";

const AboutSection = () => {
  return (
    <section className="w-11/12 mx-auto my-40">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Image */}
        <div className="flex justify-center">
          <img
            src="https://img.freepik.com/free-photo/pharmacist-holding-box-medicine-pharmacy-drugstore_1150-19197.jpg"
            alt="About Us"
            className="rounded-xl shadow-lg w-full max-w-md object-cover"
          />
        </div>

        {/* Right Content */}
        <div>
          <h2 className="text-3xl font-bold mb-4 text-primary">About MediHaat</h2>
          <p className="text-gray-600 mb-4">
            MediHaat is your trusted partner for online medicine shopping. We
            aim to deliver authentic and affordable medicines right at your
            doorstep.
          </p>
          <p className="text-gray-600 mb-4">
            With a wide range of categories and expert-verified products, we
            ensure quality, reliability, and timely delivery. Our dedicated
            support team is always here to assist you in your healthcare needs.
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>100% genuine medicines</li>
            <li>Easy prescription upload</li>
            <li>Fast & safe delivery</li>
            <li>Customer-first support</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
