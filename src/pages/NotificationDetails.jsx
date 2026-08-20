import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Bell,
  ArrowLeft,
  UserPlus,
  UserPen,
  UserMinus,
  Wallet,
  CreditCard,
} from "lucide-react";

import api from "../api/api";
import AdminDashboardLayout from "../components/layout/SuperAdmin/AdminDashboardLayout";

function NotificationDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  // --------------------------------
  // Get Icon
  // --------------------------------

  const getIcon = (actionType) => {
    switch (actionType) {
      case "ADD_STAFF":
        return <UserPlus size={22} />;

      case "UPDATE_STAFF":
        return <UserPen size={22} />;

      case "DELETE_STAFF":
        return <UserMinus size={22} />;

      case "ASSIGN_SALARY":
      case "UPDATE_SALARY":
        return <Wallet size={22} />;

      case "PAY_SALARY":
        return <CreditCard size={22} />;

      default:
        return <Bell size={22} />;
    }
  };

  // --------------------------------
  // Fetch Notification
  // --------------------------------

  const getNotification = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await api.get(`/notification/getNotificationById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotification(response.data.notification);
    } catch (error) {
      console.error("Get Notification Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotification();
  }, [id]);

  // --------------------------------
  // Loading
  // --------------------------------

  if (loading) {
    return (
      <AdminDashboardLayout>
        <div className="min-h-screen bg-[#F7FAF5] p-6">
          <div className="flex items-center justify-center py-20">
            <p className="text-gray-400">Loading notification...</p>
          </div>
        </div>
      </AdminDashboardLayout>
    );
  }

  // --------------------------------
  // Not Found
  // --------------------------------

  if (!notification) {
    return (
      <AdminDashboardLayout>
        <div className="min-h-screen bg-[#F7FAF5] p-6">
          <div className="max-w-3xl mx-auto">
            <button
              onClick={() => navigate("/admin/notifications")}
              className="
                flex
                items-center
                gap-2
                text-sm
                font-semibold
                text-[#5B7F46]
                hover:underline
                cursor-pointer
              "
            >
              <ArrowLeft size={18} />
              Back to Notifications
            </button>

            <div
              className="
                mt-6
                bg-white
                rounded-3xl
                border
                border-gray-100
                shadow-sm
                p-10
                text-center
              "
            >
              <Bell size={40} className="mx-auto text-gray-300" />

              <h2 className="mt-4 font-bold text-gray-700">
                Notification Not Found
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                This notification may have been deleted.
              </p>
            </div>
          </div>
        </div>
      </AdminDashboardLayout>
    );
  }

  return (
    <AdminDashboardLayout>
      <div className="min-h-screen bg-[#F7FAF5] p-4 sm:p-6">
        <div className="max-w-4xl ">
          {/* Back Button */}

          <button
            onClick={() => navigate("/admin/notifications")}
            className="
              flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-gray-600
              hover:text-[#5B7F46]
              transition
              cursor-pointer
              mb-6
            "
          >
            <ArrowLeft size={18} />
            Back to Notifications
          </button>

          {/* Main Card */}

          <div
            className="
              bg-white
              rounded-3xl
              border
              border-gray-100
              shadow-sm
              overflow-hidden
            "
          >
            {/* Header */}

            <div
              className="
                bg-[#F1F8ED]
                px-5
                sm:px-8
                py-6
                border-b
                border-[#D7E4D1]
              "
            >
              <div className="flex items-center gap-4">
                {/* Icon */}

                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
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
                  {getIcon(notification.ActionType)}
                </div>

                {/* Title */}

                <div>
                  <h1
                    className="
                      text-xl
                      sm:text-2xl
                      font-bold
                      text-gray-800
                    "
                  >
                    {notification.Title}
                  </h1>

                  <p className="text-sm text-gray-500 mt-1">
                    {notification.ActionType}
                  </p>
                </div>
              </div>
            </div>

            {/* Details */}

            <div className="p-5 sm:p-8">
              {/* Message */}

              <div>
                <p
                  className="
                    text-xs
                    font-semibold
                    text-gray-400
                    uppercase
                    tracking-wider
                  "
                >
                  Notification
                </p>

                <div
                  className="
                    mt-3
                    p-5
                    rounded-2xl
                    bg-[#F7FAF5]
                    border
                    border-[#E1EADB]
                  "
                >
                  <p className="text-sm sm:text-base text-gray-700 leading-7">
                    {notification.Message}
                  </p>
                </div>
              </div>

              {/* Information */}

              <div className="mt-8">
                <p
                  className="
                    text-xs
                    font-semibold
                    text-gray-400
                    uppercase
                    tracking-wider
                    mb-4
                  "
                >
                  Details
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Admin */}

                  <div
                    className="
                      p-4
                      rounded-2xl
                      bg-gray-50
                      border
                      border-gray-100
                    "
                  >
                    <p className="text-xs text-gray-400">Performed By</p>

                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {notification.SchoolAdminName}
                    </p>
                  </div>

                  {/* Action */}

                  <div
                    className="
                      p-4
                      rounded-2xl
                      bg-gray-50
                      border
                      border-gray-100
                    "
                  >
                    <p className="text-xs text-gray-400">Action</p>

                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {notification.ActionType}
                    </p>
                  </div>

                  {/* Notification ID */}

                  <div
                    className="
                      p-4
                      rounded-2xl
                      bg-gray-50
                      border
                      border-gray-100
                    "
                  >
                    <p className="text-xs text-gray-400">Notification ID</p>

                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      #{notification.NotificationId}
                    </p>
                  </div>

                  {/* Related ID */}

                  <div
                    className="
                      p-4
                      rounded-2xl
                      bg-gray-50
                      border
                      border-gray-100
                    "
                  >
                    <p className="text-xs text-gray-400">Related ID</p>

                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {notification.RelatedId || "-"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Date */}

              <div
                className="
                  mt-6
                  pt-5
                  border-t
                  border-gray-100
                "
              >
                <p className="text-xs text-gray-400">Created At</p>

                <p className="mt-1 text-sm font-medium text-gray-700">
                  {new Date(notification.CreatedAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}

export default NotificationDetails;
