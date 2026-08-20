import React, { useEffect, useState } from "react";

import {
  Bell,
  UserPlus,
  UserPen,
  UserMinus,
  Wallet,
  CreditCard,
  Trash2,
  Check,
  CheckCheck,
  ChevronRight,
  Circle,
  Loader2,
  Inbox,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import AdminDashboardLayout from "../components/layout/SuperAdmin/AdminDashboardLayout";

import {
  useNotifications,
} from "../context/NotificationContext";

const Notifications = () => {
  const navigate = useNavigate();

  // ===================================================
  // GET GLOBAL NOTIFICATIONS FROM CONTEXT
  // ===================================================

  const {
    notifications,
    loading,
    unreadCount,
    fetchNotifications,
    markAsRead,
    deleteSelectedNotifications,
  } = useNotifications();

  // ===================================================
  // LOCAL STATES
  // ===================================================

  const [selectedNotifications, setSelectedNotifications] =
    useState([]);

  const [deleting, setDeleting] = useState(false);

  // ===================================================
  // REFRESH WHEN PAGE OPENS
  // ===================================================

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // ===================================================
  // NOTIFICATION ICON
  // ===================================================

  const getIcon = (actionType) => {
    switch (actionType) {
      case "ADD_STAFF":
        return <UserPlus size={19} />;

      case "UPDATE_STAFF":
        return <UserPen size={19} />;

      case "DELETE_STAFF":
        return <UserMinus size={19} />;

      case "SUSPEND_STAFF":
        return <UserMinus size={19} />;

      case "ACTIVATE_STAFF":
        return <UserPlus size={19} />;

      case "ASSIGN_SALARY":
      case "UPDATE_SALARY":
        return <Wallet size={19} />;

      case "PAY_SALARY":
        return <CreditCard size={19} />;

      default:
        return <Bell size={19} />;
    }
  };

  // ===================================================
  // ICON STYLE
  // ===================================================

  const getIconStyle = (actionType) => {
    switch (actionType) {
      case "DELETE_STAFF":
      case "SUSPEND_STAFF":
        return "bg-red-50 text-red-500";

      case "PAY_SALARY":
        return "bg-blue-50 text-blue-500";

      case "ASSIGN_SALARY":
      case "UPDATE_SALARY":
        return "bg-amber-50 text-amber-600";

      default:
        return "bg-[#EAF2E5] text-[#5B7F46]";
    }
  };

  // ===================================================
  // FORMAT DATE
  // ===================================================

  const getTime = (date) => {
    return new Date(date).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  // ===================================================
  // OPEN NOTIFICATION
  // ===================================================

  const handleNotificationClick = async (
    notificationId
  ) => {
    await markAsRead(notificationId);

    navigate(
      `/admin/notifications/${notificationId}`
    );
  };

  // ===================================================
  // SELECT / UNSELECT
  // ===================================================

  const handleSelectNotification = (
    notificationId
  ) => {
    setSelectedNotifications((prev) => {
      if (prev.includes(notificationId)) {
        return prev.filter(
          (id) => id !== notificationId
        );
      }

      return [
        ...prev,
        notificationId,
      ];
    });
  };

  // ===================================================
  // SELECT / UNSELECT ALL
  // ===================================================

  const handleSelectAll = () => {
    if (
      selectedNotifications.length ===
      notifications.length
    ) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(
        notifications.map(
          (notification) =>
            notification.NotificationId
        )
      );
    }
  };

  // ===================================================
  // DELETE SELECTED
  // ===================================================

  const handleDeleteSelected = async () => {
    if (
      selectedNotifications.length === 0
    ) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${
        selectedNotifications.length
      } notification${
        selectedNotifications.length > 1
          ? "s"
          : ""
      }?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);

      const success =
        await deleteSelectedNotifications(
          selectedNotifications
        );

      if (success) {
        setSelectedNotifications([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDeleting(false);
    }
  };

  // ===================================================
  // STATISTICS
  // ===================================================

  const selectedCount =
    selectedNotifications.length;

  const allSelected =
    notifications.length > 0 &&
    selectedCount === notifications.length;

  const someSelected =
    selectedCount > 0 &&
    selectedCount < notifications.length;

  // ===================================================
  // RETURN
  // ===================================================

  return (
    <AdminDashboardLayout>
      <div className="min-h-screen  p-3 sm:p-5 lg:p-6 ">

        {/* ================================================= */}
        {/* PAGE HEADER */}
        {/* ================================================= */}

        <div className="max-w-6xl mx-auto mb-6 ">

          <div className="flex flex-col sm:flex-row  sm:items-center sm:justify-between gap-4">

            {/* LEFT */}

            <div className="flex items-center gap-3 ">

              <div
                className="
                  w-12
                  h-12
                  sm:w-14
                  sm:h-14
                  rounded-2xl
                  text-[#5B7F46]
                  flex
                  items-center
                  justify-center
                  
                "
              >
                <Bell size={25} />
              </div>

              <div>

                <div className="flex items-center gap-2">

                  <h1
                    className="
                      text-2xl
                      sm:text-3xl
                      font-bold
                      text-gray-800
                    "
                  >
                    Notifications
                  </h1>

                  {unreadCount > 0 && (
                    <span
                      className="
                        min-w-6
                        h-6
                        px-2
                        rounded-full
                        bg-[#5B7F46]
                        text-white
                        text-[11px]
                        font-bold
                        flex
                        items-center
                        justify-center
                      "
                    >
                      {unreadCount}
                    </span>
                  )}

                </div>

                <p className="text-sm text-gray-500 mt-1">
                  Stay updated with your latest
                  SchoolHub activities.
                </p>

              </div>

            </div>

            {/* RIGHT */}

            {!loading &&
              notifications.length > 0 && (
                <div
                  className="
                    self-start
                    sm:self-auto
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2.5
                    rounded-2xl
                    bg-white
                    border
                    border-gray-200
                    shadow-sm
                  "
                >

                  <Inbox
                    size={17}
                    className="text-[#5B7F46]"
                  />

                  <span className="text-sm font-semibold text-gray-700">
                    {notifications.length}
                  </span>

                  <span className="text-sm text-gray-400">
                    Total
                  </span>

                </div>
              )}

          </div>

        </div>

        {/* ================================================= */}
        {/* MAIN CONTAINER */}
        {/* ================================================= */}

        <div className="max-w-6xl mx-auto">

          <div
            className="
              bg-white
              rounded-3xl
              border
              border-gray-200
              shadow-[0_4px_25px_rgba(0,0,0,0.04)]
              overflow-hidden
            "
          >

            {/* ================================================= */}
            {/* TOOLBAR */}
            {/* ================================================= */}

            {!loading &&
              notifications.length > 0 && (

                <div
                  className="
                    px-4
                    sm:px-6
                    py-4
                    border-b
                    border-gray-100
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-3
                  "
                >

                  {/* SELECT ALL */}

                  <div className="flex items-center gap-3">

                    <button
                      type="button"
                      onClick={handleSelectAll}
                      className="
                        w-5
                        h-5
                        rounded-md
                        border
                        border-gray-300
                        flex
                        items-center
                        justify-center
                        hover:border-[#5B7F46]
                        transition
                      "
                    >

                      {allSelected && (
                        <div
                          className="
                            w-full
                            h-full
                            rounded-md
                            bg-[#5B7F46]
                            text-white
                            flex
                            items-center
                            justify-center
                          "
                        >
                          <Check
                            size={14}
                            strokeWidth={3}
                          />
                        </div>
                      )}

                      {someSelected && (
                        <div
                          className="
                            w-2.5
                            h-2.5
                            rounded-sm
                            bg-[#5B7F46]
                          "
                        />
                      )}

                    </button>

                    <button
                      type="button"
                      onClick={handleSelectAll}
                      className="
                        text-sm
                        font-medium
                        text-gray-600
                        hover:text-[#5B7F46]
                      "
                    >
                      {allSelected
                        ? "Unselect All"
                        : "Select All"}
                    </button>

                    {selectedCount > 0 && (
                      <span
                        className="
                          text-xs
                          font-semibold
                          px-2.5
                          py-1
                          rounded-full
                          bg-[#EAF2E5]
                          text-[#5B7F46]
                        "
                      >
                        {selectedCount} selected
                      </span>
                    )}

                  </div>

                  {/* DELETE */}

                  <button
                    type="button"
                    onClick={
                      handleDeleteSelected
                    }
                    disabled={
                      selectedCount === 0 ||
                      deleting
                    }
                    className={`
                      flex
                      items-center
                      justify-center
                      gap-2
                      px-4
                      py-2.5
                      rounded-xl
                      text-sm
                      font-semibold
                      transition
                      ${
                        selectedCount > 0 &&
                        !deleting
                          ? `
                            bg-red-50
                            text-red-600
                            hover:bg-red-100
                          `
                          : `
                            bg-gray-50
                            text-gray-300
                            cursor-not-allowed
                          `
                      }
                    `}
                  >

                    {deleting ? (
                      <>
                        <Loader2
                          size={16}
                          className="animate-spin"
                        />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 size={16} />
                        Delete Selected
                      </>
                    )}

                  </button>

                </div>
              )}

            {/* ================================================= */}
            {/* LOADING */}
            {/* ================================================= */}

            {loading && (
              <div
                className="
                  py-20
                  flex
                  flex-col
                  items-center
                  justify-center
                "
              >

                <div
                  className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-[#EAF2E5]
                    text-[#5B7F46]
                    flex
                    items-center
                    justify-center
                    mb-4
                  "
                >
                  <Loader2
                    size={23}
                    className="animate-spin"
                  />
                </div>

                <p className="text-sm font-medium text-gray-600">
                  Loading notifications...
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Please wait a moment
                </p>

              </div>
            )}

            {/* ================================================= */}
            {/* EMPTY */}
            {/* ================================================= */}

            {!loading &&
              notifications.length === 0 && (

                <div
                  className="
                    py-20
                    px-6
                    text-center
                  "
                >

                  <div
                    className="
                      w-20
                      h-20
                      mx-auto
                      rounded-3xl
                      bg-[#F1F7EC]
                      text-[#5B7F46]
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Bell size={32} />
                  </div>

                  <h3
                    className="
                      mt-5
                      text-lg
                      font-bold
                      text-gray-700
                    "
                  >
                    You're all caught up
                  </h3>

                  <p
                    className="
                      mt-2
                      max-w-sm
                      mx-auto
                      text-sm
                      text-gray-400
                    "
                  >
                    There are no notifications
                    available right now.
                    New SchoolHub activities
                    will appear here.
                  </p>

                </div>
              )}

            {/* ================================================= */}
            {/* LIST */}
            {/* ================================================= */}

            {!loading &&
              notifications.length > 0 && (

                <div className="p-3 sm:p-4">

                  <div className="flex flex-col gap-2">

                    {notifications.map(
                      (notification) => {

                        const isSelected =
                          selectedNotifications.includes(
                            notification.NotificationId
                          );

                        const isUnread =
                          Number(
                            notification.IsRead
                          ) === 0;

                        return (
                          <div
                            key={
                              notification.NotificationId
                            }
                            className={`
                              group
                              relative
                              rounded-2xl
                              border
                              transition-all
                              duration-200
                              ${
                                isSelected
                                  ? `
                                    border-[#A8C49A]
                                    bg-[#F5F9F2]
                                  `
                                  : isUnread
                                  ? `
                                    border-[#E2EBDC]
                                    bg-[#FAFCF9]
                                    hover:border-[#C8DDBE]
                                    hover:bg-[#F5F9F2]
                                  `
                                  : `
                                    border-transparent
                                    bg-white
                                    hover:border-gray-200
                                    hover:bg-gray-50
                                  `
                              }
                            `}
                          >

                            {/* UNREAD INDICATOR */}

                            {isUnread && (
                              <div
                                className="
                                  absolute
                                  left-0
                                  top-5
                                  bottom-5
                                  w-1
                                  rounded-r-full
                                  bg-[#5B7F46]
                                "
                              />
                            )}

                            <div className="p-4 sm:p-5">

                              <div className="flex gap-3 sm:gap-4">

                                {/* CHECKBOX */}

                                <div className="flex items-start pt-1">

                                  <button
                                    type="button"
                                    onClick={(event) => {
                                      event.stopPropagation();

                                      handleSelectNotification(
                                        notification.NotificationId
                                      );
                                    }}
                                    className="
                                      w-5
                                      h-5
                                      rounded-md
                                      border
                                      border-gray-300
                                      flex
                                      items-center
                                      justify-center
                                      hover:border-[#5B7F46]
                                    "
                                  >

                                    {isSelected && (
                                      <div
                                        className="
                                          w-full
                                          h-full
                                          rounded-md
                                          bg-[#5B7F46]
                                          text-white
                                          flex
                                          items-center
                                          justify-center
                                        "
                                      >
                                        <Check
                                          size={13}
                                          strokeWidth={3}
                                        />
                                      </div>
                                    )}

                                  </button>

                                </div>

                                {/* ICON */}

                                <div
                                  className={`
                                    flex-shrink-0
                                    w-11
                                    h-11
                                    rounded-2xl
                                    flex
                                    items-center
                                    justify-center
                                    ${getIconStyle(
                                      notification.ActionType
                                    )}
                                  `}
                                >
                                  {getIcon(
                                    notification.ActionType
                                  )}
                                </div>

                                {/* CONTENT */}

                                <div
                                  className="
                                    flex-1
                                    min-w-0
                                    cursor-pointer
                                  "
                                  onClick={() =>
                                    handleNotificationClick(
                                      notification.NotificationId
                                    )
                                  }
                                >

                                  {/* TITLE */}

                                  <div
                                    className="
                                      flex
                                      flex-col
                                      sm:flex-row
                                      sm:items-start
                                      sm:justify-between
                                      gap-1
                                    "
                                  >

                                    <div className="flex items-center gap-2">

                                      <h3
                                        className={`
                                          text-sm
                                          sm:text-[15px]
                                          ${
                                            isUnread
                                              ? "font-bold text-gray-800"
                                              : "font-semibold text-gray-700"
                                          }
                                        `}
                                      >
                                        {
                                          notification.Title
                                        }
                                      </h3>

                                      {isUnread && (
                                        <Circle
                                          size={7}
                                          fill="currentColor"
                                          className="text-[#5B7F46]"
                                        />
                                      )}

                                    </div>

                                    <span
                                      className="
                                        text-[11px]
                                        sm:text-xs
                                        text-gray-400
                                        whitespace-nowrap
                                      "
                                    >
                                      {getTime(
                                        notification.CreatedAt
                                      )}
                                    </span>

                                  </div>

                                  {/* MESSAGE */}

                                  <p
                                    className={`
                                      text-sm
                                      mt-1.5
                                      line-clamp-2
                                      leading-5
                                      ${
                                        isUnread
                                          ? "text-gray-600"
                                          : "text-gray-500"
                                      }
                                    `}
                                  >
                                    {
                                      notification.Message
                                    }
                                  </p>

                                  {/* FOOTER */}

                                  <div
                                    className="
                                      mt-3
                                      flex
                                      flex-col
                                      sm:flex-row
                                      sm:items-center
                                      sm:justify-between
                                      gap-2
                                    "
                                  >

                                    <div className="flex items-center gap-2">

                                      <div
                                        className="
                                          w-6
                                          h-6
                                          rounded-full
                                          bg-[#EAF2E5]
                                          text-[#5B7F46]
                                          flex
                                          items-center
                                          justify-center
                                          text-[10px]
                                          font-bold
                                        "
                                      >
                                        {notification
                                          .SchoolAdminName
                                          ?.charAt(0)
                                          ?.toUpperCase()}
                                      </div>

                                      <span className="text-xs text-gray-500">
                                        By{" "}
                                        <span className="font-semibold text-gray-600">
                                          {
                                            notification.SchoolAdminName
                                          }
                                        </span>
                                      </span>

                                    </div>

                                    <div
                                      className="
                                        flex
                                        items-center
                                        gap-1
                                        text-xs
                                        font-semibold
                                        text-[#5B7F46]
                                        group-hover:gap-2
                                        transition-all
                                      "
                                    >
                                      View details
                                      <ChevronRight
                                        size={14}
                                      />
                                    </div>

                                  </div>

                                </div>

                              </div>

                            </div>

                          </div>
                        );
                      }
                    )}

                  </div>

                </div>
              )}

            {/* ================================================= */}
            {/* FOOTER */}
            {/* ================================================= */}

            {!loading &&
              notifications.length > 0 && (

                <div
                  className="
                    px-5
                    sm:px-6
                    py-3
                    border-t
                    border-gray-100
                    bg-gray-50/50
                    flex
                    items-center
                    justify-between
                  "
                >

                  <div className="flex items-center gap-2">

                    <CheckCheck
                      size={15}
                      className="text-[#5B7F46]"
                    />

                    <span className="text-xs text-gray-400">

                      {unreadCount > 0
                        ? `${unreadCount} unread notification${
                            unreadCount > 1
                              ? "s"
                              : ""
                          }`
                        : "All notifications are read"}

                    </span>

                  </div>

                  <span className="text-xs text-gray-400">
                    {notifications.length} total
                  </span>

                </div>
              )}

          </div>

        </div>

      </div>
    </AdminDashboardLayout>
  );
};

export default Notifications;