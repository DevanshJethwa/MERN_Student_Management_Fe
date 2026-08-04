import React, { useState } from "react";
import DashboardLayout from "../../components/layout/SuperAdmin/AdminDashboardLayout";
import StatCard from "../../components/ui/StatCard";

import {
  School,
  Users,
  GraduationCap,
  DollarSign,
  Bell,
  ArrowUpRight,
  TrendingUp,
  CalendarDays,
  BookOpen,
} from "lucide-react";

function AdminDashboard() {
  const [showFeaturesModal, setShowFeaturesModal] = useState(false);

  return (
    <>
      <section className="min-h-screen bg-[#F5F7FA]">

        <DashboardLayout>

          {/* ================= Welcome Banner ================= */}

<div className="bg-white border border-gray-100 rounded-3xl shadow-sm px-8 py-1 flex flex-col lg:flex-row justify-between items-center">

  {/* Left */}
  <div className="max-w-xl">

    <span className="text-[#5B7F46] font-semibold uppercase tracking-wide text-xs">
      SCHOOL ERP DASHBOARD
    </span>

    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2">
      Welcome Back 👋
    </h1>

    <p className="text-gray-500 mt-3 text-sm leading-6">
      Monitor your schools, staff members, departments and activities
      from one centralized dashboard.
    </p>

    <button
      onClick={() => setShowFeaturesModal(true)}
      className="mt-5 bg-[#5B7F46] hover:bg-[#4d6c3c] text-white px-5 py-2.5 rounded-xl font-medium text-sm transition"
    >
      Explore Features
    </button>

  </div>

  {/* Right */}

  <div className="mt-6 lg:mt-0">

    <div className="rounded-full bg-[#5B7F46]/20 flex items-center justify-center">

     <img src="/images/School_logo.png" className="w-60 h-60" alt="" srcSet="" />

    </div>

  </div>

</div>

          {/* ================= Statistics ================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

            <StatCard
              title="Total Schools"
              value="25"
            />

            <StatCard
              title="Departments"
              value="18"
            />

            <StatCard
              title="Staff"
              value="320"
            />

            <StatCard
              title="Monthly Salary"
              value="$85K"
            />

          </div>

          {/* ================= Overview Cards ================= */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

            {/* Students */}

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition p-6">

              <div className="flex justify-between">

                <div>

                  <p className="text-gray-500">
                    Students
                  </p>

                  <h2 className="text-4xl font-bold mt-2">
                    8,540
                  </h2>

                </div>

                <div className="w-14 h-14 rounded-full bg-[#5B7F46]/10 flex items-center justify-center">

                  <GraduationCap
                    className="text-[#5B7F46]"
                    size={28}
                  />

                </div>

              </div>

              <div className="flex items-center gap-2 mt-8 text-[#5B7F46]">

                <TrendingUp size={18} />

                <span className="text-sm font-medium">
                  +12% this month
                </span>

              </div>

            </div>

            {/* Teachers */}

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition p-6">

              <div className="flex justify-between">

                <div>

                  <p className="text-gray-500">
                    Teachers
                  </p>

                  <h2 className="text-4xl font-bold mt-2">
                    320
                  </h2>

                </div>

                <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">

                  <Users
                    className="text-blue-600"
                    size={28}
                  />

                </div>

              </div>

              <div className="flex items-center gap-2 mt-8 text-blue-600">

                <ArrowUpRight size={18} />

                <span className="text-sm font-medium">
                  +8 New Teachers
                </span>

              </div>

            </div>

            {/* Fee Collection */}

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition p-6">

              <div className="flex justify-between">

                <div>

                  <p className="text-gray-500">
                    Fee Collection
                  </p>

                  <h2 className="text-4xl font-bold mt-2">
                    $620K
                  </h2>

                </div>

                <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">

                  <DollarSign
                    className="text-green-600"
                    size={28}
                  />

                </div>

              </div>

              <div className="flex items-center gap-2 mt-8 text-green-600">

                <ArrowUpRight size={18} />

                <span className="text-sm font-medium">
                  92% Collected
                </span>

              </div>

            </div>

            {/* Notifications */}

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition p-6">

              <div className="flex justify-between">

                <div>

                  <p className="text-gray-500">
                    Notifications
                  </p>

                  <h2 className="text-4xl font-bold mt-2">
                    14
                  </h2>

                </div>

                <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center">

                  <Bell
                    className="text-orange-500"
                    size={28}
                  />

                </div>

              </div>

              <div className="flex items-center gap-2 mt-8 text-orange-500">

                <ArrowUpRight size={18} />

                <span className="text-sm font-medium">
                  4 New Alerts
                </span>

              </div>

            </div>
          </div>

          {/* ================= Charts Section ================= */}

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

            {/* Fee Collection Overview */}

            <div className="xl:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-8">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-bold text-gray-800">
                    Fee Collection Overview
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Monthly fee collection performance
                  </p>

                </div>

                <button className="px-4 py-2 rounded-xl bg-[#F3F8F1] text-[#5B7F46] font-medium">
                  This Year
                </button>

              </div>

              <div className="mt-10 h-72 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center">

                <TrendingUp
                  size={50}
                  className="text-[#5B7F46]"
                />

                <p className="mt-4 text-lg font-semibold text-gray-700">
                  Fee Collection Chart
                </p>

                <p className="text-gray-400 text-sm mt-1">
                  Replace with Recharts / Chart.js
                </p>

              </div>

            </div>

            {/* Students Overview */}

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">

              <h2 className="text-2xl font-bold text-gray-800">
                Students Overview
              </h2>

              <p className="text-gray-500 mt-1">
                Current Distribution
              </p>

              <div className="h-64 flex flex-col items-center justify-center">

                <div className="w-44 h-44 rounded-full border-[18px] border-[#5B7F46] border-t-gray-200"></div>

                <p className="mt-6 text-gray-400">
                  Pie Chart Placeholder
                </p>

              </div>

            </div>

          </div>

          {/* ================= Bottom Section ================= */}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

            {/* Recent Activities */}

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">

              <div className="flex items-center justify-between">

                <h2 className="text-xl font-bold">
                  Recent Activities
                </h2>

                <CalendarDays
                  className="text-[#5B7F46]"
                  size={22}
                />

              </div>

              <div className="mt-8 space-y-6">

                <div className="flex items-start gap-4">

                  <div className="w-11 h-11 rounded-full bg-[#F3F8F1] flex items-center justify-center">

                    <School
                      size={20}
                      className="text-[#5B7F46]"
                    />

                  </div>

                  <div>

                    <h3 className="font-semibold text-gray-800">
                      New School Registered
                    </h3>

                    <p className="text-gray-500 text-sm mt-1">
                      Bright Future School successfully joined SchoolHub.
                    </p>

                  </div>

                </div>

                <div className="flex items-start gap-4">

                  <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center">

                    <Users
                      size={20}
                      className="text-blue-600"
                    />

                  </div>

                  <div>

                    <h3 className="font-semibold text-gray-800">
                      New Teacher Added
                    </h3>

                    <p className="text-gray-500 text-sm mt-1">
                      8 teachers have been added this week.
                    </p>

                  </div>

                </div>

                <div className="flex items-start gap-4">

                  <div className="w-11 h-11 rounded-full bg-green-50 flex items-center justify-center">

                    <DollarSign
                      size={20}
                      className="text-green-600"
                    />

                  </div>

                  <div>

                    <h3 className="font-semibold text-gray-800">
                      Fees Updated
                    </h3>

                    <p className="text-gray-500 text-sm mt-1">
                      Monthly fee collection reached 92%.
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* Upcoming Events */}

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">

              <div className="flex items-center justify-between">

                <h2 className="text-xl font-bold">
                  Upcoming Events
                </h2>

                <BookOpen
                  size={22}
                  className="text-[#5B7F46]"
                />

              </div>

              <div className="mt-8 space-y-5">

                <div className="rounded-2xl bg-[#F3F8F1] p-5">

                  <p className="text-sm text-[#5B7F46] font-semibold">
                    15 JULY
                  </p>

                  <h3 className="font-bold mt-1">
                    Annual Sports Day
                  </h3>

                </div>

                <div className="rounded-2xl bg-gray-50 p-5">

                  <p className="text-sm text-[#5B7F46] font-semibold">
                    22 JULY
                  </p>

                  <h3 className="font-bold mt-1">
                    Parent Teacher Meeting
                  </h3>

                </div>

                <div className="rounded-2xl bg-gray-50 p-5">

                  <p className="text-sm text-[#5B7F46] font-semibold">
                    30 JULY
                  </p>

                  <h3 className="font-bold mt-1">
                    Science Exhibition
                  </h3>

                </div>

              </div>

            </div>

          </div>

                    {/* ================= Explore Features Modal ================= */}

         {showFeaturesModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-3">
    <div className="w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

      {/* Header */}
      <div className="px-5 pt-5 pb-4 text-center border-b border-gray-100">
        <div className="w-12 h-12 mx-auto rounded-full bg-[#F3F8F1] flex items-center justify-center">
          <School className="w-6 h-6 text-[#5B7F46]" />
        </div>

        <h2 className="mt-3 text-lg sm:text-xl font-bold text-gray-800">
          Welcome to SchoolHub
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Smart School Management Platform
        </p>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        <p className="text-xs sm:text-sm text-center text-gray-600 leading-6">
          SchoolHub helps you manage schools, teachers, students,
          departments and administration from one secure and
          modern dashboard.
        </p>

        <div className="mt-5 space-y-3">

          {/* School */}
          <div className="flex items-start gap-3 p-2.5 rounded-xl border border-gray-100 hover:bg-gray-50 transition">
            <div className="w-8 h-8 rounded-full bg-[#F3F8F1] flex items-center justify-center flex-shrink-0">
              <School className="w-4 h-4 text-[#5B7F46]" />
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-800">
                School Management
              </h4>
              <p className="text-[11px] text-gray-500">
                Manage multiple schools easily.
              </p>
            </div>
          </div>

          {/* Staff */}
          <div className="flex items-start gap-3 p-2.5 rounded-xl border border-gray-100 hover:bg-gray-50 transition">
            <div className="w-8 h-8 rounded-full bg-[#F3F8F1] flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 text-[#5B7F46]" />
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-800">
                Staff Management
              </h4>
              <p className="text-[11px] text-gray-500">
                Organize teachers and staff.
              </p>
            </div>
          </div>

          {/* Students */}
          <div className="flex items-start gap-3 p-2.5 rounded-xl border border-gray-100 hover:bg-gray-50 transition">
            <div className="w-8 h-8 rounded-full bg-[#F3F8F1] flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-4 h-4 text-[#5B7F46]" />
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-800">
                Student Records
              </h4>
              <p className="text-[11px] text-gray-500">
                Securely manage student records.
              </p>
            </div>
          </div>

          {/* Finance */}
          <div className="flex items-start gap-3 p-2.5 rounded-xl border border-gray-100 hover:bg-gray-50 transition">
            <div className="w-8 h-8 rounded-full bg-[#F3F8F1] flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-4 h-4 text-[#5B7F46]" />
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-800">
                Finance Tracking
              </h4>
              <p className="text-[11px] text-gray-500">
                Monitor fees and salary records.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="px-5 pb-5 flex gap-2">
        <button
          onClick={() => setShowFeaturesModal(false)}
          className="flex-1 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
        >
          Close
        </button>

        <button
          onClick={() => setShowFeaturesModal(false)}
          className="flex-1 py-2 rounded-lg bg-[#5B7F46] hover:bg-[#4C6B3C] text-sm font-semibold text-white transition"
        >
          Continue
        </button>
      </div>

    </div>
  </div>
)}

        </DashboardLayout>

      </section>

    </>
  );
}

export default AdminDashboard;