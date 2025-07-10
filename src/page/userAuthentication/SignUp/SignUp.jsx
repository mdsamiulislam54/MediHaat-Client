import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { FaArrowLeftLong, FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import Button from "../../../components/Button/Button";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Handle form submit
  const onSubmit = (data) => {
    console.log("Signup Data:", data);
    reset();
  };

  return (
    <div>
      <div className="flex justify-between items-center m-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-green-600 transition-all duration-300"
        >
          <FaArrowLeftLong />
          <span className="hidden sm:inline">Back to Home</span>
        </Link>
      </div>

      <div className="w-11/12 mx-auto my-10 flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Left Image */}
        <div className="flex-1">
          <img
            src="https://img.freepik.com/free-vector/healthcare-smart-card-abstract-concept-illustration_335657-3843.jpg"
            alt="SignUp"
            className="w-full max-w-[500px] mx-auto"
          />
        </div>

        {/* Right Form */}
        <div className="w-full max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 flex-1">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Create Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Role selection */}
            <div className="flex gap-4">
            <label className="text-sm font-bold ">Please choose a role ?</label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="user"
                  {...register("role", { required: "Select a role" })}
                  className="radio radio-primary"
                />
                Customer
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="seller"
                  {...register("role", { required: "Select a role" })}
                  className="radio radio-primary"
                />
                Seller
              </label>
            </div>

            {errors.role && (
              <span className="text-red-500 text-sm">
                {errors.role.message}
              </span>
            )}

            {/* Name */}
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
              placeholder="Full Name"
              className="input input-bordered w-full"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}

            {/* Photo */}
            <input
              type="file"
              {...register("photo", {
                required: "Photo is required",
              })}
              className="file-input file-input-bordered w-full"
            />
            {errors.photo && (
              <span className="text-red-500 text-sm">
                {errors.photo.message}
              </span>
            )}

            {/* Email */}
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Enter a valid email address",
                },
              })}
              placeholder="Email"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d).{6,}$/,
                    message:
                      "Password must contain at least 1 uppercase and 1 number",
                  },
                })}
                placeholder="Password"
                className="input input-bordered w-full"
              />
              <span
                className="absolute top-3 right-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}

            {/* Terms & Conditions */}
            <label className="flex gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register("terms", { required: "You must agree to terms" })}
                className="checkbox checkbox-primary"
              />
              <span>I agree to the Terms & Conditions</span>
            </label>
            {errors.terms && (
              <span className="text-red-500 text-sm">
                {errors.terms.message}
              </span>
            )}

            {/* Submit Button */}
            <div>
              <Button
                children={"Create Account"}
                type="submit"
                className={"w-full"}
              />
            </div>

            {/* Google Login */}
            <button
              type="button"
              className="btn w-full btn-outline btn-primary flex items-center gap-2"
            >
              <FcGoogle /> Sign in with Google
            </button>
          </form>

          {/* Already signup */}
          <p className="text-sm text-center mt-4">
            Already have an account?
            <Link to="/login" className="text-primary font-semibold ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
