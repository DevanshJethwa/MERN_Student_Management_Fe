import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";

import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";
import AdminDashboard from "../pages/SuperAdmin/AdminDashboard";
import AdminSchools from "../pages/SuperAdmin/AdminSchools";
import SchoolAdminDashboard from "../pages/SchoolAdmin/SchoolAdminDashboard";
import AdminStaff from "../pages/SuperAdmin/AdminStaff";
import AddStaff from "../pages/SchoolAdmin/AddStaff";
import SchoolAdmin_Staff from "../pages/SchoolAdmin/SchoolAdmin_Staff";
import StaffSalary from "../pages/SchoolAdmin/StaffSalary";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Notifications from "../pages/Notifications";
import NotificationDetails from "../pages/NotificationDetails";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root */}
        <Route path="/" element={<Navigate to="//admin/dashboard" replace />} />

        {/* Login page */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Protected routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="1">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/school-admin/dashboard"
          element={
            <ProtectedRoute allowedRole="2">
              <SchoolAdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/schools"
          element={
            <ProtectedRoute allowedRole="1">
              <AdminSchools />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/staff"
          element={
            <ProtectedRoute allowedRole="1">
              <AdminStaff />
            </ProtectedRoute>
          }
        />
        <Route
          path="/school-admin/staff/add"
          element={
            <ProtectedRoute allowedRole="2">
              <AddStaff />
            </ProtectedRoute>
          }
        />

        <Route
          path="/school-admin/staff/edit/:id"
          element={
            <ProtectedRoute allowedRole="2">
              <AddStaff />
            </ProtectedRoute>
          }
        />

        <Route
          path="/school-admin/staff"
          element={
            <ProtectedRoute allowedRole="2">
              <SchoolAdmin_Staff />
            </ProtectedRoute>
          }
        />
        <Route
          path="/school-admin/staff/salary/:id"
          element={
            <ProtectedRoute allowedRole="2">
              <StaffSalary />
            </ProtectedRoute>
          }
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route
          path="/admin/notifications"
          element={
            <ProtectedRoute allowedRole="1">
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/notifications/:id"
          element={
            <ProtectedRoute allowedRole="1">
              <NotificationDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
