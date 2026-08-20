import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Menu,
  Bell,
  User,
  LogOut,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  useNotifications,
} from "../../context/NotificationContext";

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
  const [notificationOpen, setNotificationOpen] =
    useState(false);

  const notificationRef = useRef(null);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  // ===================================================
  // ROLE
  // ===================================================

  const role = localStorage.getItem("roleId");

  // ===================================================
  // GLOBAL NOTIFICATIONS
  // ===================================================

 const {
  notifications,
  unreadCount,
  fetchNotifications,
  markAsRead,
  markAllAsRead,
  deleteAllNotifications,
} = useNotifications();

  // ===================================================
  // REFRESH NOTIFICATIONS WHEN NAVBAR LOADS
  // ===================================================

  useEffect(() => {
    if (role === "1") {
      fetchNotifications();
    }
  }, [role, fetchNotifications]);

  // ===================================================
  // CLOSE NOTIFICATION DROPDOWN
  // ===================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target
        )
      ) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // ===================================================
  // CLOSE PROFILE DROPDOWN
  // ===================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
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

  // ===================================================
  // MARK ALL AS READ
  // ===================================================

  const handleReadAll = async () => {
    await markAllAsRead();
  };

  // ===================================================
  // DELETE ALL
  // ===================================================

  const handleDeleteAllNotifications = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all notifications?"
    );

    if (!confirmDelete) {
      return;
    }

    const success =
      await deleteAllNotifications();

    if (success) {
      setNotificationOpen(false);
    }
  };

  // ===================================================
  // RETURN
  // ===================================================

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

      {/* ================================================= */}
      {/* LEFT */}
      {/* ================================================= */}

      <div className="flex items-center gap-3">

        {/* MOBILE MENU */}

        <button
          className="
            lg:hidden
            p-2
            rounded-lg
            hover:bg-[#F1F8ED]
            transition
          "
          onClick={() =>
            setMobileOpen(true)
          }
        >
          <Menu size={24} />
        </button>

        {/* PAGE TITLE */}

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

      {/* ================================================= */}
      {/* RIGHT */}
      {/* ================================================= */}

      <div className="flex items-center gap-5">

        {/* ================================================= */}
        {/* NOTIFICATIONS */}
        {/* ================================================= */}

        {role === "1" && (

          <div
            className="relative flex-shrink-0"
            ref={notificationRef}
          >

            {/* NOTIFICATION BUTTON */}

            <button
              type="button"
              onClick={() =>
                setNotificationOpen(
                  (prev) => !prev
                )
              }
              className="
                relative
                w-11
                h-11
                rounded-xl
                bg-[#F7FAF5]
                border
                border-[#D7E4D1]
                flex
                items-center
                justify-center
                text-[#5B7F46]
                hover:bg-[#EAF2E5]
                hover:border-[#BBD2AE]
                hover:shadow-md
                transition-all
                duration-300
                cursor-pointer
              "
            >

              <Bell size={21} />

              {/* UNREAD BADGE */}

              {unreadCount > 0 && (
                <span
                  className="
                    absolute
                    -top-1
                    -right-1
                    min-w-5
                    h-5
                    px-1
                    rounded-full
                    bg-red-500
                    text-white
                    border-2
                    border-white
                    text-[10px]
                    font-bold
                    flex
                    items-center
                    justify-center
                  "
                >
                  {unreadCount > 99
                    ? "99+"
                    : unreadCount}
                </span>
              )}

            </button>

            {/* ================================================= */}
            {/* NOTIFICATION DROPDOWN */}
            {/* ================================================= */}

            <div
              className={`
                absolute
                top-14
                right-0
                z-[9999]
                w-[390px]
                max-w-[calc(100vw-20px)]
                bg-white
                rounded-[24px]
                border
                border-[#dadbda]
                shadow-[0_20px_60px_rgba(91,127,70,0.25)]
                overflow-hidden
                transition-all
                duration-300
                ease-out
                origin-top-right

                ${
                  notificationOpen
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-3 pointer-events-none"
                }
              `}
            >

              {/* ================================================= */}
              {/* HEADER */}
              {/* ================================================= */}

              <div
                className="
                  px-5
                  py-4
                  bg-[#DDEBD7]
                  border-b
                  border-[#c8edb7]
                "
              >

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        w-11
                        h-11
                        rounded-xl
                        bg-white
                        border
                        border-[#D7E4D1]
                        text-[#5B7F46]
                        flex
                        items-center
                        justify-center
                        shadow-sm
                      "
                    >
                      <Bell size={20} />
                    </div>

                    <div>

                      <h3 className="text-lg font-bold text-gray-800">
                        Notifications
                      </h3>

                      <p className="text-xs text-gray-500 mt-0.5">
                        Recent activity and updates
                      </p>

                    </div>

                  </div>

                  {/* COUNT */}

                  <span
                    className="
                      min-w-8
                      h-8
                      px-2
                      rounded-full
                      bg-[#5B7F46]
                      text-white
                      flex
                      items-center
                      justify-center
                      text-xs
                      font-bold
                    "
                  >
                    {notifications.length}
                  </span>

                </div>

              </div>

              {/* ================================================= */}
              {/* ACTION BAR */}
              {/* ================================================= */}

              {notifications.length > 0 && (

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    px-5
                    py-3
                    bg-white
                    border-b
                    border-gray-300
                  "
                >

                  <span className="text-xs text-gray-400">
                    {unreadCount} unread
                  </span>

                  <button
                    type="button"
                    onClick={handleReadAll}
                    disabled={unreadCount === 0}
                    className={`
                      text-xs
                      font-semibold
                      transition
                      ${
                        unreadCount > 0
                          ? `
                            text-[#5B7F46]
                            hover:text-[#49673A]
                            hover:underline
                            cursor-pointer
                          `
                          : `
                            text-gray-300
                            cursor-not-allowed
                          `
                      }
                    `}
                  >
                    Read all
                  </button>

                </div>
              )}

              {/* ================================================= */}
              {/* LIST */}
              {/* ================================================= */}

              <div className="max-h-[380px] overflow-y-auto p-3">

                {notifications.length === 0 ? (

                  <div className="py-12 text-center">

                    <div
                      className="
                        w-16
                        h-16
                        mx-auto
                        rounded-2xl
                        bg-[#F1F8ED]
                        text-[#5B7F46]
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Bell size={26} />
                    </div>

                    <h4 className="mt-4 text-sm font-bold text-gray-700">
                      No notifications
                    </h4>

                    <p className="mt-1 text-xs text-gray-400">
                      You're all caught up!
                    </p>

                  </div>

                ) : (

                  notifications
                    .slice(0, 5)
                    .map((notification) => (

                      <div
                        key={
                          notification.NotificationId
                        }
                        onClick={async () => {
  // Mark this notification as read
  await markAsRead(notification.NotificationId);

  // Close notification dropdown
  setNotificationOpen(false);

  // Go to notification details
  navigate(
    `/admin/notifications/${notification.NotificationId}`
  );
}}
                        className={`
                          relative
                          flex
                          gap-3
                          p-4
                          mb-2
                          rounded-2xl
                          border
                          transition-all
                          duration-200
                          hover:shadow-sm
                          hover:-translate-y-[1px]
                          cursor-pointer

                          ${
                            Number(
                              notification.IsRead
                            ) === 0
                              ? `
                                bg-[#F7FAF5]
                                border-[#D7E4D1]
                              `
                              : `
                                bg-white
                                border-gray-100
                              `
                          }
                        `}
                      >

                        {/* UNREAD DOT */}

                        {Number(
                          notification.IsRead
                        ) === 0 && (

                          <span
                            className="
                              absolute
                              top-4
                              right-4
                              w-2
                              h-2
                              rounded-full
                              bg-[#5B7F46]
                            "
                          />

                        )}

                        {/* ICON */}

                        <div
                          className={`
                            w-10
                            h-10
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            flex-shrink-0

                            ${
                              Number(
                                notification.IsRead
                              ) === 0
                                ? `
                                  bg-[#EAF2E5]
                                  text-[#5B7F46]
                                `
                                : `
                                  bg-gray-100
                                  text-gray-400
                                `
                            }
                          `}
                        >
                          <Bell size={17} />
                        </div>

                        {/* CONTENT */}

                        <div className="min-w-0 flex-1 pr-4">

                          <h4 className="text-sm font-semibold text-gray-800">
                            {notification.Title}
                          </h4>

                          <p className="text-xs text-gray-500 mt-1.5 leading-5 line-clamp-2">
                            {notification.Message}
                          </p>

                          <p className="text-[10px] text-gray-400 mt-2">
                            {new Date(
                              notification.CreatedAt
                            ).toLocaleString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>

                        </div>

                      </div>

                    ))

                )}

              </div>

              {/* ================================================= */}
              {/* FOOTER */}
              {/* ================================================= */}

              {notifications.length > 0 && (

                <div
                  className="
                    bg-[#F7FAF5]
                    border-t
                    border-gray-300
                  "
                >

                  {/* DELETE ALL */}

                  <button
                    onClick={
                      handleDeleteAllNotifications
                    }
                    type="button"
                    className="
                      w-full
                      py-3
                      text-xs
                      font-semibold
                      text-red-500
                      hover:bg-red-50
                      transition
                      cursor-pointer
                    "
                  >
                    Delete all notifications
                  </button>

                  {/* VIEW ALL */}

                  <button
                    type="button"
                    onClick={() => {
                      setNotificationOpen(false);

                      navigate(
                        "/admin/notifications"
                      );
                    }}
                    className="
                      w-full
                      py-3.5
                      bg-[#EAF2E5]
                      text-[#5B7F46]
                      text-sm
                      font-bold
                      border-t
                      border-[#d0e8c6]
                      hover:bg-[#DDEBD7]
                      transition-all
                      duration-300
                      cursor-pointer
                    "
                  >
                    View all notifications

                    <span className="ml-2">
                      →
                    </span>

                  </button>

                </div>
              )}

            </div>

          </div>
        )}

        {/* ================================================= */}
        {/* PROFILE DROPDOWN */}
        {/* ================================================= */}

        <div
          ref={dropdownRef}
          className="relative flex justify-end"
        >

          {/* PROFILE BUTTON */}

          <button
            type="button"
            onClick={() =>
              setOpen((prev) => !prev)
            }
            className="
              flex
              items-center
              gap-3
              rounded-full
              transition-all
              duration-200
              hover:opacity-90
              cursor-pointer
            "
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

          {/* PROFILE DROPDOWN */}

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

            {/* TOP */}

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

            {/* ACCOUNT */}

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

              {/* PROFILE */}

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
                  cursor-pointer
                "
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
                    group-hover:text-[#5B7F46]
                    group-hover:translate-x-1
                  "
                />

              </button>

              {/* LOGOUT */}

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
                  cursor-pointer
                "
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