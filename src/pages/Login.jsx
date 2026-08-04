import React, { useState } from "react";
import { Eye, EyeOff, GraduationCap } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Zoom } from "react-toastify";
import api from "../api/api";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const signin = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (!email.trim()) {
      setEmailError(true);
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError(true);
      isValid = false;
    }

    if (!isValid) {
      return;
    }
    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        // localStorage.setItem("token", response.data.token);
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);

        localStorage.setItem("roleId", response.data.user.RoleId);

        const roleId = response.data.user.RoleId;
        console.log(roleId);

        setTimeout(() => {
          toast.success(response.data.message || "Login Successful", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: true,
            theme: "dark",
            transition: Zoom,
          });

          setLoading(false);

          if (roleId === 1) {
            navigate("/admin/dashboard");
          } else if (roleId === 2) {
            navigate("/school-admin/dashboard");
          }
        }, 1800);

        console.log(response.data);

        return;
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message;

      toast.error(message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
      });

      console.error("Login failed:", message);

      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#F4F1EA] flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-full bg-[#E6E9DD] flex items-center justify-center">
              <GraduationCap className="text-[#5B7F46]" size={24} />
            </div>

            <h1 className="text-3xl font-bold text-[#1F2D1B]">SchoolHub</h1>
          </div>

          {/* Heading */}
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-[#1F2D1B] mb-3">
              Sign in to your account
            </h2>

            <p className="text-[#66736A] text-lg">
              Enter your email and password to access the dashboard.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={signin}>
            {/* Email */}
            <div>
              <label className="block mb-2 text-[#1F2D1B] font-semibold">
                Email*
              </label>

              <input
                type="email"
                placeholder="admin@school.edu"
                className={`w-full h-14 px-4 rounded-xl border bg-white outline-none transition
        ${
          emailError
            ? "border-red-500"
            : "border-[#D8D8D2] focus:ring-2 focus:ring-[#5B7F46]"
        }`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);

                  if (e.target.value.trim()) {
                    setEmailError(false);
                  }
                }}
              />

              {emailError && (
                <span className="text-[13px] text-red-600 ms-1">
                  Enter your email
                </span>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-[#1F2D1B] font-semibold">
                  Password*
                </label>

                <button
                  type="button"
                  className="text-[#5B7F46] hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className={`w-full h-14 px-4 pr-12 rounded-xl border bg-white outline-none
        ${
          passwordError
            ? "border-red-500"
            : "border-[#D8D8D2] focus:ring-2 focus:ring-[#5B7F46]"
        }`}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);

                    if (e.target.value.trim()) {
                      setPasswordError(false);
                    }
                  }}
                />

                {passwordError && (
                  <span className="text-[13px] text-red-600 ms-1">
                    Enter your password
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                                w-full h-14 rounded-xl
                                bg-[#5B7F46]
                                text-white
                                font-semibold
                                text-lg
                                hover:bg-[#4B6B39]
                                transition
                                shadow-md
                                disabled:opacity-70
                                disabled:cursor-not-allowed
                                flex items-center justify-center
                            "
            >
              {loading ? (
                <>
                  <div
                    className="
                                            w-5 h-5
                                            border-2
                                            border-white
                                            border-t-transparent
                                            rounded-full
                                            animate-spin
                                            mr-2
                                        "
                  />
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-12 text-center">
            <p className="text-[#66736A]">
              Need help?{" "}
              <span className="text-[#5B7F46] font-semibold cursor-pointer">
                Contact your administrator
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
