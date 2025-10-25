import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useState } from "react";
import Logo from "../../../components/Logo/Logo";
import { UserAuth } from "../../../hooks/userAuth/userAuth";
import Swal from "sweetalert2";
import { createUserIfNotExists } from "../../../hooks/useCreateUserWithGogle/useCreateUserWithGoogle";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shadowPassword, setShadowPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const { loginWithEmailPassword, signWithGoogle, user, setUser, setRole } = UserAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  // auto fill function
  const handleAutoFill = (role) => {
    if (role === "admin") {
      setEmail("admin.123@gmail.com");
      setPassword("Admin123");
    } else if (role === "seller") {
      setEmail("seller@gmail.com");
      setPassword("Seller123");
    } else if (role === "user") {
      setEmail("user123@gmail.com");
      setPassword("User123");
    }
  };

  const onSubmit = (e) => {

    e.preventDefault()
    console.log(email, password)
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

      const res = await signWithGoogle();
      const loggedInUser = res.user;

      const roles = await createUserIfNotExists(loggedInUser);

      setUser(loggedInUser);
      setRole(roles);

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
      });
      navigate(state?.pathname || '/');
      setLoading(false);
    } catch (error) {
      console.error("Google Login Error:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed!",
        text: error.message,
      });

    }
  };

  return (
    <div className="bg-gray-100 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 custom-container bg-white shadow relative min-h-[90vh] ">
        {/* Back Button */}
        <div className="absolute top-2 left-4 bg-gray-200 p-2 rounded-full z-10">
          <Link to="/">
            <FaArrowLeftLong className="text-sm" />
          </Link>
        </div>

        {/* Left: Image Section */}
        <div className="flex items-center justify-center h-full">
          <img
            src="https://img.freepik.com/free-vector/healthcare-smart-card-abstract-concept-illustration_335657-3843.jpg"
            alt="Login Illustration"
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Right: Form Section */}
        <div className="flex items-center justify-center h-full bg-white">
          <div className="w-full max-w-md p-6">
            {/* Logo + Heading */}
            <div className="text-center mb-6">
              <Logo color="text-primary" />
              <h2 className="text-2xl font-bold text-gray-800">Login</h2>
              <p className="text-gray-500 text-sm mt-1">
                Welcome back! Please login to your account.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={onSubmit}>
              {/* Role Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => handleAutoFill("user")}
                  className="btn btn-sm bg-primary/80 btn-outline border-gray-300 hover:bg-primary text-white"
                >
                  User
                </button>
                <button
                  type="button"
                  onClick={() => handleAutoFill("seller")}
                  className="btn btn-sm bg-primary/80 btn-outline border-gray-300 hover:bg-primary text-white"
                >
                  Seller
                </button>
                <button
                  type="button"
                  onClick={() => handleAutoFill("admin")}
                  className="btn btn-sm bg-primary/80 btn-outline border-gray-300 hover:bg-primary text-white"
                >
                  Admin
                </button>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type={shadowPassword ? "password" : "text"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary "
                  placeholder="Enter your password"
                />
                <div
                  className="absolute right-3 top-[50%] cursor-pointer"
                  onClick={() => setShadowPassword(!shadowPassword)}
                >
                  {shadowPassword ? (
                    <FaRegEyeSlash size={20} />
                  ) : (
                    <FaRegEye size={20} />
                  )}
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-primary text-white font-semibold py-2 rounded-md hover:bg-primary/90 transition"
              >
                Login
              </button>
            </form>

            <div className="divider">OR</div>
            <button
              onClick={handleGoogleLogin}
              className="btn bg-gray-800 text-white   btn-block  transition-all duration-300"
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
              Login with Google"
            </button>

            {/* Footer */}
            <p className="text-sm text-gray-600 text-center mt-4">
              Don’t have an account?{" "}
              <Link to="/signUp" className="text-primary hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login
