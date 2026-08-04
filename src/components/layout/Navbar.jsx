import React, { useState } from "react";
import { Menu, Bell, User, LogOut } from "lucide-react";

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

  return (
    <header
      className="
    sticky
    top-0
    z-40
    bg-white
    h-16
    px-6
    md:ps-15
    ps-3
    flex
    items-center
    justify-between
    border-b
    border-gray-200
    shadow-sm
  "
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <button className="lg:hidden" onClick={() => setMobileOpen(true)}>
          <Menu />
        </button>

        <h2 className="flex items-center gap-3 text-xl font-bold text-gray-800">
          <div className="p-2 rounded-lg bg-[#F1F8ED]">
            {HeaderIcon && (
              <HeaderIcon className="sm:w-8 sm:h-8 text-[#5B7F46]" />
            )}
          </div>

          <span className="text-[15px] sm:text-[25px]">
            {/* Admin{" "}
            <span className="text-[#5B7F46] hidden sm:inline">Dashboard</span> */}
            {title}
          </span>
        </h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Notification */}
        <button className="relative">
          <Bell size={22} />

          <span
            className="
              absolute
              -top-1
              -right-1
              w-2
              h-2
              rounded-full
              bg-red-500
            "
          />
        </button>

        {/* Profile */}
        <div className="relative flex justify-end">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3"
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

              bg-[#1F2D1B]
              text-white
              rounded-2xl sm:rounded-3xl
              overflow-hidden
              shadow-2xl
              z-[999]
              w-auto
              sm:w-80

              transition-all duration-300 ease-out

              ${
                open
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }
            `}
          >
            {/* Profile Info */}
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#5B7F46] flex items-center justify-center font-bold">
                  {initial}
                </div>

                <div className="min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base truncate">
                    {name}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-300 truncate">
                    {email}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu */}
            <div className="border-t border-gray-700">
              <button
                className="w-full px-4 sm:px-6 py-3 sm:py-4 hover:bg-[#2A3D24] flex gap-3 items-center text-sm sm:text-base"
                style={{ cursor: "pointer" }}
              >
                <User size={18} />
                Profile
              </button>

              <button
                onClick={onLogout}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 hover:bg-red-500/10 text-red-400 flex gap-3 items-center text-sm sm:text-base"
                style={{ cursor: "pointer" }}
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
