import React, { useState } from "react";

import { Link } from "react-router-dom";

import api from "../../api/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/forgot-password", {
        email: email.trim(),
      });

      setMessage(response.data.message);

      setEmail("");
    } catch (error) {
      console.error("Forgot Password Error:", error);

      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="min-h-screen bg-[#F7FAF5] flex items-center justify-center px-4 py-10 sm:px-6 sm:py-12">
        <div className="relative w-full max-w-md">
        {/* Top Badge */}
        <div
          className="
          mt-4
        absolute
        -top-10
        left-1/2
        -translate-x-1/2
        w-20
        h-20
        rounded-3xl
        bg-[#5B7F46]
        shadow-xl
        flex
        items-center
        justify-center
        rotate-6
      "
        >
          <span className="text-4xl -rotate-6">🔑</span>
        </div>

        {/* Card */}
        {/* Card */}
<div
  className="
    bg-white
    rounded-[32px]
    shadow-xl
    border
    border-gray-100
    pt-16
    pb-8
    px-5
    sm:px-8
    w-full
  "
>
  <div className="text-center">
    <span
      className="
        inline-block
        px-4
        py-1
        rounded-full
        bg-[#5B7F46]/10
        text-[#5B7F46]
        text-xs
        font-semibold
      "
    >
      SCHOOLHUB SECURITY
    </span>

    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-4">
      Forgot Password
    </h1>

    <p className="text-gray-500 mt-3 leading-6 text-sm">
      Enter your registered email address. We'll send you a secure
      password reset link.
    </p>
  </div>

  {/* Success Message */}
  {message && (
    <div
      className="
        mt-6
        rounded-2xl
        bg-[#F1F8ED]
        border
        border-[#CFE1C5]
        p-4
      "
    >
      <div className="flex items-start gap-3">

        {/* Success Icon */}
        <div
          className="
            flex-shrink-0
            w-9
            h-9
            rounded-full
            bg-[#5B7F46]
            flex
            items-center
            justify-center
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Success Content */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[#49673A] text-sm">
            Password reset link sent!
          </p>

          <p className="mt-1 text-[#5B7F46] text-xs sm:text-sm leading-5">
            Password reset link has been sent to your email.
          </p>
        </div>

      </div>
    </div>
  )}

  <form
    onSubmit={handleSubmit}
    className="mt-8 space-y-6"
  >
    <div>
      <label
        className="
          block
          text-sm
          font-semibold
          text-gray-700
          mb-2
        "
      >
        Email Address
      </label>

      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);

          if (error) {
            setError("");
          }

          if (message) {
            setMessage("");
          }
        }}
        placeholder="name@example.com"
        className={`
          w-full
          rounded-2xl
          px-4
          sm:px-5
          py-3.5
          sm:py-4
          bg-[#FAFAFA]
          outline-none
          transition-all
          border
          text-sm
          sm:text-base
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-200"
              : "border-gray-300 focus:border-[#5B7F46] focus:bg-white focus:ring-4 focus:ring-[#5B7F46]/15"
          }
        `}
      />

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>

    <button
      type="submit"
      disabled={loading}
      className="
        w-full
        py-3.5
        sm:py-4
        rounded-2xl
        bg-[#5B7F46]
        text-white
        font-semibold
        transition-all
        duration-300
        hover:bg-[#4B6A3B]
        hover:shadow-lg
        active:scale-[0.98]
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
    >
      {loading ? "Sending..." : "Send Reset Link"}
    </button>
  </form>

  <div
    className="
      mt-8
      flex
      flex-col
      sm:flex-row
      items-center
      justify-center
      gap-1
      sm:gap-2
      text-sm
    "
  >
    <span className="text-gray-400">
      Remember your password?
    </span>

    <Link
      to="/login"
      className="font-semibold text-[#5B7F46] hover:underline"
    >
      Sign In
    </Link>
  </div>
</div>
      </div>
    </div>
  );
};

export default ForgotPassword;
