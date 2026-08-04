import React from "react";
import SchoolAdminDashboardLayout from "../../components/layout/SchoolAdmin/SchoolAdminDashboardLayout";


function SchoolAdminDashboard() {
  return (
    <SchoolAdminDashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1F2D1B]">
          Welcome Back 👋
        </h1>

        <p className="text-gray-600 mt-2">
          Manage students, teachers,
          attendance and classes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-gray-500">
            Students
          </h3>

          <p className="text-3xl font-bold mt-2">
            1,254
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-gray-500">
            Teachers
          </h3>

          <p className="text-3xl font-bold mt-2">
            85
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-gray-500">
            Classes
          </h3>

          <p className="text-3xl font-bold mt-2">
            42
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-gray-500">
            Attendance
          </h3>

          <p className="text-3xl font-bold mt-2">
            94%
          </p>
        </div>
      </div>
    </SchoolAdminDashboardLayout>
  );
}

export default SchoolAdminDashboard;