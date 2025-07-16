import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import Button from "../../../components/Button/Button";
import Logo from "../../../components/Logo/Logo";
import { FaArrowLeftLong } from "react-icons/fa6";
import { UserAuth } from "../../../hooks/userAuth/userAuth";
import Swal from "sweetalert2";
import { createUserIfNotExists } from "../../../hooks/useCreateUserWithGogle/useCreateUserWithGoogle";
import Loader from "../../../components/Loader/Loader";
import PageTitle from "../../../components/PageTitle/PageTitle";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const { loginWithEmailPassword, signWithGoogle, user, setUser, setRole } =
    UserAuth();
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const { state } = useLocation();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { email, password } = data;
    setLoading(true);
    loginWithEmailPassword(email, password)
      .then(() => {
        Swal.fire({
          title: "Login Successful!",
          icon: "success",
        });
        navigate(state?.pathname || "/");
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Login Failed!",
          text: error.message,
          icon: "error",
        });
        setLoading(false);
      });
  };

  const handleGoogleLogin = async () => {
    if (user) {
      return Swal.fire({
        icon: "error",
        title: "Already Logged In!",
      });
    }

    try {
      setLoadingGoogle(true);
      const res = await signWithGoogle();
      const loggedInUser = res.user;

      const roles = await createUserIfNotExists(loggedInUser);

      setUser(loggedInUser);
      setRole(roles);

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
      });
      navigate(state?.pathname || "/");
      setLoading(false);
    } catch (error) {
      console.error("Google Login Error:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed!",
        text: error.message,
      });
      setLoadingGoogle(false);
    }
  };

  const termsAccepted = watch("terms");

  return (
    <div>
      <div className="w-11/12 mx-auto my-5">
        <PageTitle title={"Login"} />
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-green-600 transition-all duration-300"
        >
          <FaArrowLeftLong className="text-lg" />
          <span className="hidden sm:inline">Back to Home</span>
        </Link>
      </div>
      <div className="min-h-screen flex flex-col-reverse md:flex-row items-center bg-background w-11/12 mx-auto">
        {/* Left: Image Section */}
        <div className="w-full md:w-4/12 h-[300px] md:h-screen flex-1">
          <img
            src="https://img.freepik.com/free-vector/healthcare-smart-card-abstract-concept-illustration_335657-3843.jpg"
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Form Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center py-10 flex-1">
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-6">
              <Logo color="text-primary" />
              <h2 className="text-2xl font-bold text-text">Login</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <div>
                <label className="text-text font-medium">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", { required: "Email is required" })}
                  className="input input-bordered w-full mt-1"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="text-text font-medium">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="input input-bordered w-full mt-1"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-3 right-3 text-gray-500 cursor-pointer text-lg"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  {...register("terms", {
                    required: "You must accept Terms & Conditions",
                  })}
                  className="checkbox checkbox-primary"
                />
                <p className="text-sm">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary underline">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
              {errors.terms && (
                <p className="text-red-500 text-sm">{errors.terms.message}</p>
              )}

              {/* Login Button */}
              <Button
                type="submit"
                children={!loading && "Login"}
                loader={loading}
                disabled={!termsAccepted}
                className={"w-full  "}
              ></Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-4">
              <div className="border border-gray-300 w-full"></div>
              <p className="text-gray-400 text-sm">OR</p>
              <div className="border border-gray-300 w-full"></div>
            </div>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleLogin}
              className="btn bg-white text-black border-[#e5e5e5] btn-block hover:bg-primary hover:text-white transition-all duration-300"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              {loadingGoogle ? <Loader /> : " Login with Google"}
            </button>

            {/* New User */}
            <p className="text-center text-sm text-gray-500 mt-4">
              New here?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
