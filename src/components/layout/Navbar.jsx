import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  Bell,
  User,
  LogOut,
  ChevronRight,
} from "lucide-react";

function Navbar({
  setMobileOpen,
  title,
  HeaderIcon,
  initial,
  name,
  email,
  onLogout,
}) {
  const [open, setOpen] = useState(false);

  // Reference for dropdown
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener(
        "mousedown",
        handleClickOutside
      );
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [open]);

  return (
    <header
      className="
        w-full
        h-16
        bg-white
        border-b
        border-gray-200
        flex
        items-center
        justify-between
        px-4
        sm:px-6
        lg:px-8
        relative
        z-40
      "
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu */}
        <button
          className="
            lg:hidden
            p-2
            rounded-lg
            hover:bg-[#F1F8ED]
            transition
          "
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* Page Title */}
        <h2
          className="
            flex
            items-center
            gap-3
            text-xl
            font-bold
            text-gray-800
          "
        >
          <div className="p-2 rounded-lg bg-[#F1F8ED]">
            {HeaderIcon && (
              <HeaderIcon
                className="
                  w-6
                  h-6
                  sm:w-8
                  sm:h-8
                  text-[#5B7F46]
                "
              />
            )}
          </div>

          <span className="text-[15px] sm:text-[25px]">
            {title}
          </span>
        </h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Notification */}
        <button
          type="button"
          className="
            relative
            p-2
            rounded-xl
            text-gray-600
            hover:bg-[#F1F8ED]
            hover:text-[#5B7F46]
            transition-all
            duration-200
          "
          style={{ cursor: "pointer" }}
        >
          <Bell size={22} />

          {/* Notification Dot */}
          <span
            className="
              absolute
              top-1
              right-1
              w-2
              h-2
              rounded-full
              bg-red-500
              border-2
              border-white
            "
          />
        </button>

        {/* Profile Dropdown Wrapper */}
        <div
          ref={dropdownRef}
          className="relative flex justify-end"
        >
          {/* Profile Button */}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="
              flex
              items-center
              gap-3
              rounded-full
              transition-all
              duration-200
              hover:opacity-90
            "
            style={{ cursor: "pointer" }}
          >
            <div
              className="
                w-10
                h-10
                rounded-full
                bg-[#5B7F46]
                text-white
                flex
                items-center
                justify-center
                font-semibold
                shadow-sm
              "
            >
              {initial}
            </div>
          </button>

          {/* Dropdown */}
          <div
            className={`
              fixed
              top-16
              left-3
              right-3

              sm:absolute
              sm:top-14
              sm:left-auto
              sm:right-0

              w-auto
              sm:w-[350px]

              bg-[#EAF2E5]
              text-gray-800

              rounded-[28px]

              border-2
              border-[#BBD2AE]

              shadow-[0_20px_45px_rgba(91,127,70,0.25)]

              overflow-hidden
              z-[999]

              transition-all
              duration-300
              ease-out

              ${
                open
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 -translate-y-3 scale-95 pointer-events-none"
              }
            `}
          >
            {/* Top Section */}
            <div className="p-5">
              <div
                className="
                  bg-[#5B7F46]
                  rounded-[22px]
                  p-4
                  text-white
                  shadow-md
                "
              >
                <div className="flex items-center gap-4">

                  {/* Avatar */}
                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-white
                      text-[#5B7F46]
                      flex
                      items-center
                      justify-center
                      font-bold
                      text-xl
                      shadow-md
                      flex-shrink-0
                    "
                  >
                    {initial}
                  </div>

                  {/* User Info */}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-white/70 mb-1">
                      Welcome back
                    </p>

                    <h3 className="font-bold text-base truncate">
                      {name}
                    </h3>

                    <p className="text-xs text-white/75 truncate mt-1">
                      {email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="px-5 pb-5">

              <p
                className="
                  text-xs
                  font-semibold
                  text-[#5B7F46]
                  uppercase
                  tracking-wider
                  mb-3
                  px-1
                "
              >
                Account
              </p>

              {/* Profile */}
              <button
                type="button"
                className="
                  w-full
                  flex
                  items-center
                  gap-3
                  p-3
                  mb-2

                  bg-white
                  rounded-2xl

                  border
                  border-[#D7E4D1]

                  text-gray-700

                  shadow-sm

                  transition-all
                  duration-300

                  hover:bg-[#F5F9F3]
                  hover:border-[#5B7F46]
                  hover:shadow-md
                  hover:-translate-y-0.5

                  group
                "
                style={{ cursor: "pointer" }}
              >
                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-[#EAF2E5]
                    text-[#5B7F46]

                    flex
                    items-center
                    justify-center

                    transition-all
                    duration-300

                    group-hover:bg-[#BBD2AE]
                    group-hover:scale-105
                  "
                >
                  <User size={18} />
                </div>

                <div className="text-left flex-1">
                  <p className="text-sm font-semibold">
                    Profile
                  </p>

                  <p className="text-xs text-gray-400 mt-0.5">
                    Manage your profile
                  </p>
                </div>

                <ChevronRight
                  size={18}
                  className="
                    text-gray-300
                    transition-all
                    duration-300
                    group-hover:text-[#5B7F46]
                    group-hover:translate-x-1
                  "
                />
              </button>

              {/* Logout */}
              <button
                type="button"
                onClick={onLogout}
                className="
                  w-full
                  flex
                  items-center
                  gap-3
                  p-3

                  bg-white
                  rounded-2xl

                  border
                  border-[#D7E4D1]

                  text-gray-700

                  shadow-sm

                  transition-all
                  duration-300

                  hover:bg-red-50
                  hover:border-red-400
                  hover:shadow-md
                  hover:-translate-y-0.5

                  group
                "
                style={{ cursor: "pointer" }}
              >
                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-gray-100
                    text-gray-500

                    flex
                    items-center
                    justify-center

                    transition-all
                    duration-300

                    group-hover:bg-red-200
                    group-hover:text-red-500
                    group-hover:scale-105
                  "
                >
                  <LogOut size={18} />
                </div>

                <div className="text-left flex-1">
                  <p className="text-sm font-semibold">
                    Logout
                  </p>

                  <p className="text-xs text-gray-400 mt-0.5">
                    Sign out of SchoolHub
                  </p>
                </div>

                <ChevronRight
                  size={18}
                  className="
                    text-gray-300
                    transition-all
                    duration-300
                    group-hover:text-red-400
                    group-hover:translate-x-1
                  "
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;