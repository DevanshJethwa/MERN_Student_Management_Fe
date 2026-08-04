import React from "react";
import { School, UserStar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, Zoom } from "react-toastify";

import DashboardLayout from "../DashboardLayout";
import { adminMenu } from "../../../data/adminMenu";

function AdminDashboardLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("roleId");

    toast.error("You have been logged out", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      theme: "dark",
      transition: Zoom,
    });

    navigate("/login");
  };

  return (
    <DashboardLayout
      menuItems={adminMenu}
      logo={
        <div className="flex items-center gap-3">
          <div className=" rounded-xl bg-[#5B7F46]/20 flex items-center justify-center">
            <img src="/images/Sidebar_School_logo.png" className="w-15 h-15" alt="" />
          </div>

          <div>
            <h1 className="text-2xl font-bold ">
              SchoolHub
            </h1>

            <p className="text-xs text-gray-400">
              School Management System
            </p>
          </div>
        </div>
      }
      title={
        <>
          Admin{" "}
          <span className="text-[#5B7F46]">
            Dashboard
          </span>
        </>
      }
      HeaderIcon={UserStar}
      initial="A"
      name="Super Admin"
      email="admin@system.com"
      onLogout={handleLogout}
    >
      {children}
    </DashboardLayout>
  );
}

export default AdminDashboardLayout;