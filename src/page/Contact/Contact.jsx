"use client";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);

    // success alert
    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Your message has been sent successfully.",
      confirmButtonColor: "#3b82f6",
    });

    reset();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Banner Section */}
      <div className="relative">
        <img
          className="w-full h-[200px] object-center object-cover"
          src="https://live.themewild.com/medion/assets/img/breadcrumb/01.jpg"
          alt=""
        />
        <div className="absolute inset-0 bg-black/40 text-white flex items-center justify-center">
          <h2 className="text-3xl font-bold flex items-center gap-2 font-syne">
            Contact Us
          </h2>
        </div>
      </div>

      {/* Contact Section */}
      <div className="custom-container py-10 font-syne">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="card bg-base-100 shadow-md p-5 hover:shadow-lg transition">
              <div className="flex flex-col justify-center items-center gap-3 text-center">
                <p className="p-4 bg-primary text-white rounded-full">
                  <FaMapMarkerAlt className="text-2xl" />
                </p>
                <h2 className="font-bold text-lg">Office Address</h2>
                <p>100/C Malibug Drive Road</p>
                <p>Dhaka, BD</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-md p-5 hover:shadow-lg transition">
              <div className="flex flex-col justify-center items-center gap-3 text-center">
                <p className="p-4 bg-primary text-white rounded-full">
                  <FaPhoneAlt className="text-2xl" />
                </p>
                <h2 className="font-bold text-lg">Call Us</h2>
                <p>+880-1239092930</p>
                <p>+880-1700020000</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-md p-5 hover:shadow-lg transition">
              <div className="flex flex-col justify-center items-center gap-3 text-center">
                <p className="p-4 bg-primary text-white rounded-full">
                  <FaEnvelope className="text-2xl" />
                </p>
                <h2 className="font-bold text-lg">Email Us</h2>
                <p>info.medihaat@gmail.com</p>
                <p>support.medi@gmail.com</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-md p-5 hover:shadow-lg transition">
              <div className="flex flex-col justify-center items-center gap-3 text-center">
                <p className="p-4 bg-primary text-white rounded-full">
                  <FaClock className="text-2xl" />
                </p>
                <h2 className="font-bold text-lg">Open Time</h2>
                <p>Mon - Sat (9AM - 10PM)</p>
                <p>
                  Sunday - <span className="text-error">Closed</span>
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 rounded-box shadow-md">
            <h1 className="text-2xl font-bold mb-3">Get In Touch</h1>
            <p className="mb-5 text-gray-600">
              Fill out the form below, and we’ll get back to you shortly.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name..."
                    className="input input-bordered w-full"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Your Email..."
                    className="input input-bordered w-full"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email format",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Your Subject..."
                  className="input input-bordered w-full"
                  {...register("subject", { required: "Subject is required" })}
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <textarea
                  placeholder="Write Your Message..."
                  className="textarea textarea-bordered w-full h-32"
                  {...register("message", { required: "Message is required" })}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
        <div className="my-10 bg-white p-4 rounded-box">
            <iframe className="w-full h-[300px]" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233667.49930571613!2d90.25487531119137!3d23.78106723705999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1759467865157!5m2!1sen!2sbd"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
