import React from "react";
import { School, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, Zoom } from "react-toastify";

import DashboardLayout from "../DashboardLayout";
import { schoolAdminMenu } from "../../../data/schoolAdminMenu";

function SchoolAdminDashboardLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("roleId");

    toast.error("You have been logged out", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Zoom,
    });

    navigate("/login");
  };

  return (
    <DashboardLayout
      menuItems={schoolAdminMenu}
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
          School Admin{" "}
          <span className="text-[#5B7F46]">
            Dashboard
          </span>
        </>
      }
      HeaderIcon={GraduationCap}
      initial="S"
      name="School Admin"
      email="schooladmin@gmail.com"
      onLogout={handleLogout}
    >
      {children}
    </DashboardLayout>
  );
}

export default SchoolAdminDashboardLayout;