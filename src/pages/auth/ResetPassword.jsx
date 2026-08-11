import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import api from "../../api/api";

const ResetPassword = () => {
  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(true);

  const [tokenValid, setTokenValid] = useState(false);
  const [errorType, setErrorType] = useState("");

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await api.get(`/auth/verify-reset-token/${token}`);

        setTokenValid(true);
      } catch (err) {
        setTokenValid(false);

        setErrorType(err.response?.data?.type || "invalid");

        setError(err.response?.data?.message || "Invalid reset link.");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!password) {
      setError("Please enter a new password");
      return;
    }

    if (!confirmPassword) {
      setError("Please confirm your password");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setSubmitting(true);
      const response = await api.post(`/auth/reset-password/${token}`, {
        password,
        confirmPassword,
      });

      setMessage(response.data.message);

      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Reset Password Error:", error);

      setError(error.response?.data?.message || "Unable to reset password");
    } finally {
      setSubmitting(false);
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">Checking reset link...</h2>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="min-h-screen bg-[#F7FAF5] flex items-center justify-center px-6">
        <div className="max-w-4xl w-full">
          <div className="bg-white rounded-[40px] shadow-xl overflow-hidden">
            {/* Top Banner */}
            <div className="h-3 bg-[#5B7F46]"></div>

            <div className="px-10 py-14 text-center">
              {/* Icon */}
<div
  className={`mx-auto w-28 h-28 rounded-full flex items-center justify-center border-4 ${
    errorType === "expired"
      ? "bg-[#EEF5EA] border-red-500"
      : "bg-[#FFF7ED] border-orange-500"
  }`}
>
  {errorType === "expired" ? (
    // Expired Icon
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-14 h-14 text-red-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8v4m0 4h.01M6.938 4h10.124c1.54 0 2.502 1.667 1.732 3L13.732 17a2 2 0 01-3.464 0L5.206 7c-.77-1.333.192-3 1.732-3z"
      />
    </svg>
  ) : (
    // Invalid Link Icon
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-14 h-14 text-orange-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.828 10.172a4 4 0 010 5.656l-1.414 1.414a4 4 0 01-5.657-5.657l1.414-1.414m3.536-3.536a4 4 0 015.657 5.657l-1.414 1.414m-2.122-2.122l-4.243-4.243"
      />
    </svg>
  )}
</div>

{/* Heading */}
<h1
  className={`mt-8 text-4xl font-bold ${
    errorType === "expired" ? "text-red-500" : "text-orange-500"
  }`}
>
  {errorType === "expired"
    ? "Password Reset Link Expired"
    : "Invalid Password Reset Link"}
</h1>

<p className="mt-5 text-gray-500 max-w-xl mx-auto leading-7">
  {error}
</p>

{/* Info Box */}
<div className="mt-10 bg-[#F7FAF5] border border-[#E5EEDF] rounded-2xl p-6 text-left">
  <h3 className="font-semibold text-[#5B7F46]">
    {errorType === "expired"
      ? "Why did this happen?"
      : "What does this mean?"}
  </h3>

  {errorType === "expired" ? (
    <ul className="mt-4 space-y-3 text-gray-600">
      <li>• Reset links expire after 15 minutes.</li>
      <li>• Only the latest email contains a valid reset link.</li>
      <li>• This helps keep your SchoolHub account secure.</li>
    </ul>
  ) : (
    <ul className="mt-4 space-y-3 text-gray-600">
      <li>• This reset link is not valid.</li>
      <li>• The URL may have been modified or is incomplete.</li>
      <li>• Please use the reset link sent to your email.</li>
    </ul>
  )}
</div>

              {/* Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/forgot-password"
                  className="px-8 py-4 rounded-2xl bg-[#5B7F46] text-white font-semibold hover:bg-[#49673A] transition"
                >
                  Request New Link
                </Link>

                <Link
                  to="/login"
                  className="px-8 py-4 rounded-2xl border border-[#5B7F46] text-[#5B7F46] font-semibold hover:bg-[#F1F7EC] transition"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-[#F7FAF5]
      px-4
    "
    >
      <div
        className="
        w-full
        max-w-md
        bg-white
        p-8
        rounded-2xl
        shadow-lg
      "
      >
        <h1
          className="
          text-2xl
          font-bold
          text-gray-800
          text-center
        "
        >
          Reset Password
        </h1>

        {message && (
          <div
            className="
            mt-5
            p-3
            rounded-lg
            bg-green-50
            text-green-700
            text-sm
          "
          >
            {message}
          </div>
        )}

        {error && (
          <div
            className="
            mt-5
            p-3
            rounded-lg
            bg-red-50
            text-red-600
            text-sm
          "
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="
            mt-6
            space-y-5
          "
        >
          <div>
            <label
              className="
              block
              text-sm
              font-medium
              text-gray-700
              mb-2
            "
            >
              New Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="
                w-full
                px-4
                py-3
                border
                border-gray-300
                rounded-xl
                outline-none
                focus:border-[#5B7F46]
              "
            />
          </div>

          <div>
            <label
              className="
              block
              text-sm
              font-medium
              text-gray-700
              mb-2
            "
            >
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="
                w-full
                px-4
                py-3
                border
                border-gray-300
                rounded-xl
                outline-none
                focus:border-[#5B7F46]
              "
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="
              w-full
              py-3
              bg-[#5B7F46]
              hover:bg-[#49673A]
              text-white
              rounded-xl
              font-semibold
              disabled:opacity-50
            "
          >
            {submitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <Link
          to="/login"
          className="
            block
            text-center
            mt-5
            text-sm
            text-[#5B7F46]
            font-semibold
          "
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
