import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../api/api";

// =====================================================
// CREATE CONTEXT
// =====================================================

const NotificationContext = createContext(null);

// =====================================================
// PROVIDER
// =====================================================

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  // ===================================================
  // GET NOTIFICATIONS
  // ===================================================

  const fetchNotifications = useCallback(async () => {
    const token = localStorage.getItem("token");
    const roleId = localStorage.getItem("roleId");

    // Only fetch for logged-in Super Admin
    if (!token || roleId !== "1") {
      setNotifications([]);
      return;
    }

    try {
      setLoading(true);

      const response = await api.get(
        "/notification/getNotifications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications(
        response.data?.notifications || []
      );
    } catch (error) {
      console.error(
        "Fetch Notifications Error:",
        error.response?.data || error
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // ===================================================
  // MARK ONE NOTIFICATION AS READ
  // ===================================================

  const markAsRead = async (notificationId) => {
  try {
    await api.put(
      `/notification/markAsRead/${notificationId}`
    );

    // Update notification immediately in Context
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.NotificationId === notificationId
          ? {
              ...notification,
              IsRead: 1,
            }
          : notification
      )
    );

    return true;
  } catch (error) {
    console.error(
      "Mark Notification Read Error:",
      error.response?.data || error
    );

    return false;
  }
};

  // ===================================================
  // MARK ALL AS READ
  // ===================================================

  const markAllAsRead = useCallback(async () => {
    try {
      await api.put(
        "/notification/markAllAsRead"
      );

      // Update Context state immediately
      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          IsRead: 1,
        }))
      );

      return true;
    } catch (error) {
      console.error(
        "Mark All As Read Error:",
        error.response?.data || error
      );

      return false;
    }
  }, []);

  // ===================================================
  // DELETE SELECTED NOTIFICATIONS
  // ===================================================

  const deleteSelectedNotifications = useCallback(
    async (notificationIds) => {
      if (
        !notificationIds ||
        notificationIds.length === 0
      ) {
        return false;
      }

      try {
        await api.put(
          "/notification/deleteSelected",
          {
            notificationIds,
          }
        );

        // Remove from Context state immediately
        setNotifications((prev) =>
          prev.filter(
            (notification) =>
              !notificationIds.includes(
                notification.NotificationId
              )
          )
        );

        return true;
      } catch (error) {
        console.error(
          "Delete Selected Notifications Error:",
          error.response?.data || error
        );

        return false;
      }
    },
    []
  );

  // ===================================================
  // DELETE ALL NOTIFICATIONS
  // ===================================================

  const deleteAllNotifications = useCallback(
    async () => {
      try {
        await api.delete(
          "/notification/deleteAllAsNotifications"
        );

        // Clear Context state immediately
        setNotifications([]);

        return true;
      } catch (error) {
        console.error(
          "Delete All Notifications Error:",
          error.response?.data || error
        );

        return false;
      }
    },
    []
  );

  // ===================================================
  // UNREAD COUNT
  // ===================================================

  const unreadCount = notifications.filter(
    (notification) =>
      Number(notification.IsRead) === 0
  ).length;

  // ===================================================
  // INITIAL FETCH
  // ===================================================

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // ===================================================
  // AUTOMATIC REFRESH
  // ===================================================
  //
  // This checks the database every 10 seconds.
  //
  // So if:
  //
  // School Admin creates notification
  //          ↓
  // Database gets notification
  //          ↓
  // Super Admin is already logged in
  //          ↓
  // Context gets latest notification automatically
  //
  // ===================================================

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      const roleId = localStorage.getItem("roleId");

      if (token && roleId === "1") {
        fetchNotifications();
      }
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchNotifications]);

  // ===================================================
  // CONTEXT VALUE
  // ===================================================

  const value = {
    notifications,
    loading,
    unreadCount,

    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteSelectedNotifications,
    deleteAllNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// =====================================================
// CUSTOM HOOK
// =====================================================

export const useNotifications = () => {
  const context = useContext(
    NotificationContext
  );

  if (!context) {
    throw new Error(
      "useNotifications must be used inside NotificationProvider"
    );
  }

  return context;
};

export default NotificationContext;