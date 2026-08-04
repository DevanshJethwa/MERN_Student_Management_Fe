import React, { useEffect, useState } from "react";
import SchoolAdminDashboardLayout from "../../components/layout/SchoolAdmin/SchoolAdminDashboardLayout";
import { useNavigate } from "react-router-dom";
import { Banknote, Filter, IndianRupee, Pen, Plus, Search, Trash2, Users, Wallet, Wallet2, X } from "lucide-react";
import api from "../../api/api";
import { toast } from "react-toastify";

function SchoolAdmin_Staff() {
  const navigate = useNavigate();

  const [staff, setStaff] = useState([]);

  const getStaff = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/staff/getAllStaff", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("staff details", response);

      if (response.status === 200) {
        setStaff(response.data.Staff);
        console.log(response.data.Staff);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStaff();
  }, []);

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("DESC");

  // Temporary values for modal
  const [tempStatusFilter, setTempStatusFilter] = useState("All");
  const [tempSortOrder, setTempSortOrder] = useState("DESC");

  const [searchStaff, setSearchStaff] = useState("");

  const filteredStaff = staff
    .filter((item) => item.Department !== null)
    .filter((item) => {
      if (searchStaff.trim() === "") return true;

      const keyword = searchStaff.toLowerCase();

      return (
        item.StaffId?.toString().includes(keyword) ||
        item.FirstName?.toLowerCase().includes(keyword) ||
        item.LastName?.toLowerCase().includes(keyword) ||
        `${item.FirstName} ${item.LastName}`.toLowerCase().includes(keyword) ||
        item.Email?.toLowerCase().includes(keyword) ||
        item.Phone?.toLowerCase().includes(keyword) ||
        item.School?.toLowerCase().includes(keyword)
      );
    })
    .filter((item) => {
      if (statusFilter === "All") return true;
      return item.Status === statusFilter;
    })
    .sort((a, b) => {
      if (sortOrder === "ASC") {
        return a.StaffId - b.StaffId; // Oldest -> Newest
      }

      return b.StaffId - a.StaffId; // Newest -> Oldest
    });

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const totalPages = Math.ceil(filteredStaff.length / recordsPerPage);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentStaff = filteredStaff.slice(
    indexOfFirstRecord,
    indexOfLastRecord,
  );

  // ------------------------------------------------------ Delete Staff -------------------------------------------------
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState(null);

  const deleteStaff = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.delete(
        `/staff/deleteStaff/${selectedStaffId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        getStaff();
        setshowDeleteModal(false);
        setSelectedStaffId(null);
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  const suspendStaff = async (staffId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.patch(
        `/staff/changeSuspendStatus/${staffId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        toast.success(response.data.message);

        setStaff((prev) =>
          prev.map((item) =>
            item.StaffId === staffId ? { ...item, Status: "Suspend" } : item,
          ),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const activeStaff = async (staffId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.patch(
        `/staff/changeActiveStatus/${staffId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        toast.success(response.data.message);

        setStaff((prev) =>
          prev.map((item) =>
            item.StaffId === staffId ? { ...item, Status: "Active" } : item,
          ),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, sortOrder, searchStaff, staff]);

  console.log("statusFilter:", statusFilter);

  console.table(
    staff.map((item) => ({
      id: item.StaffId,
      status: item.Status,
      department: item.Department,
    })),
  );

  console.table(
    filteredStaff.map((item) => ({
      id: item.StaffId,
      status: item.Status,
    })),
  );

  console.table(
    currentStaff.map((item) => ({
      id: item.StaffId,
      status: item.Status,
    })),
  );
  return (
    <>
      <section className="bg-[#E9E9E9] min-h-screen">
        <SchoolAdminDashboardLayout>
          <div className="w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              {/* Left Side */}
              <div className="flex items-center gap-4">
                <div
                  className="
          flex items-center justify-center
          h-12 w-12 sm:h-14 sm:w-14
          rounded-2xl
          bg-gradient-to-br
          from-[#5B7F46]
          to-[#7BA35F]
          shadow-md
        "
                >
                  <Users className="text-white h-6 w-6 sm:h-8 sm:w-8" />
                </div>

                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                    School's Staff
                  </h1>

                  <p className="text-xs sm:text-sm text-gray-500">
                    Manage all staff members
                  </p>
                </div>
              </div>

              {/* Right Side */}
              <button
                onClick={() => navigate("/school-admin/staff/add")}
                className="
        flex items-center gap-0 sm:gap-2
        bg-[#5B7F46]
        text-white
        text-xs sm:text-sm md:text-base
        px-2 sm:px-4 md:px-5
        py-1 sm:py-2.5 md:py-3
        rounded-xl
        shadow-md
        hover:shadow-lg
        hover:-translate-y-0.5
        hover:bg-[#4A6938]
        transition-all
        duration-200
        cursor-pointer
      "
              >
                <Plus className="h-4 w-4 sm:h-5 sm:w-5 mx-0" />
                <span>Add Staff</span>
              </button>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              {/* Search */}
              <div className="relative w-full md:max-w-md">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search by Staff ID, Name, Email or Phone..."
                  value={searchStaff}
                  onChange={(e) => setSearchStaff(e.target.value)}
                  className="
    w-full
    pl-11
    pr-4
    py-3
    rounded-xl
    border
    border-[#D8E6CF]
    bg-white
    text-sm
    outline-none
    transition
    focus:border-[#5B7F46]
    focus:ring-4
    focus:ring-[#5B7F46]/10
  "
                />
              </div>

              {/* Filter Button */}
              <button
                onClick={() => setShowFilterModal(true)}
                className="
    flex
    items-center
    justify-center
    gap-2
    px-5
    py-3
    rounded-xl
    bg-[#5B7F46]
    text-white
    font-medium
    shadow-md
    hover:bg-[#4A6938]
    transition-all
    whitespace-nowrap
  "
              >
                <Filter size={18} />
                Filters
              </button>
            </div>
          </div>

          
{/* ================= DESKTOP TABLE ================= */}
<div className="hidden lg:block rounded-2xl overflow-hidden">
  <table className="w-full">
    <thead className="bg-[#708f5e]">
      <tr className="border-b-2 border-[#5B7F46]">
        <th className="px-3 py-4 text-left text-sm text-white font-semibold">
          Sr.no
        </th>

        <th className="px-3 py-4 text-left text-sm text-white font-semibold">
          Staff ID
        </th>

        <th className="px-3 py-4 text-left text-sm text-white font-semibold">
          Staff Name
        </th>

        <th className="px-3 py-4 text-left text-sm text-white font-semibold">
          Email
        </th>

        <th className="px-3 py-4 text-left text-sm text-white font-semibold">
          Phone
        </th>

        <th className="px-3 py-4 text-left text-sm text-white font-semibold">
          School
        </th>

        <th className="px-3 py-4 text-left text-sm text-white font-semibold">
          Role
        </th>

        <th className="px-3 py-4 text-left text-sm text-white font-semibold">
          Department
        </th>

        <th className="px-3 py-4 text-center text-sm text-white font-semibold">
          Status
        </th>

        <th className="px-3 py-4 text-center text-sm text-white font-semibold">
          Actions
        </th>
      </tr>
    </thead>

    <tbody>
      {currentStaff.length > 0 ? (
        currentStaff.map((staff, index) => (
          <tr
            key={staff.StaffId}
            className="bg-white hover:bg-[#cce2bd] transition-all duration-200"
          >
            <td className="px-3 py-4">
              {indexOfFirstRecord + index + 1}
            </td>

            <td className="px-3 py-4">
              {staff.StaffId}
            </td>

            <td className="px-3 py-4 font-semibold">
              {staff.FirstName} {staff.LastName}
            </td>

            <td className="px-3 py-4">
              <span className="block max-w-[180px] truncate">
                {staff.Email}
              </span>
            </td>

            <td className="px-3 py-4">
              {staff.Phone}
            </td>

            <td className="px-3 py-4">
              {staff.School}
            </td>

            <td className="px-3 py-4">
              {staff.Role}
            </td>

            <td className="px-3 py-4">
              {staff.Department ?? "NULL"}
            </td>

            {/* Status */}
            <td className="px-3 py-4 text-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={staff.Status === "Active"}
                  onChange={() => {
                    if (staff.Status === "Active") {
                      suspendStaff(staff.StaffId);
                    } else {
                      activeStaff(staff.StaffId);
                    }
                  }}
                  className="sr-only peer"
                />

                <div
                  className="
                    w-12 h-6
                    bg-gray-300
                    rounded-full
                    peer
                    peer-checked:bg-[#5B7F46]
                    transition-all
                    duration-300
                    after:content-['']
                    after:absolute
                    after:top-[2px]
                    after:left-[2px]
                    after:bg-white
                    after:h-5
                    after:w-5
                    after:rounded-full
                    after:transition-all
                    peer-checked:after:translate-x-6
                  "
                />
              </label>
            </td>

            {/* Actions */}
            <td className="px-3 py-4">
              <div className="flex justify-center items-center gap-2">

                {/* Edit */}
                <button
                  onClick={() =>
                    navigate(
                      `/school-admin/staff/edit/${staff.StaffId}`
                    )
                  }
                  className="
                    w-9 h-9
                    flex items-center justify-center
                    rounded-lg
                    border border-[#D8E6CF]
                    bg-[#F3F8F1]
                    text-[#5B7F46]
                    hover:bg-[#5B7F46]
                    hover:text-white
                    transition-all
                  "
                >
                  <Pen size={17} />
                </button>

                {/* Delete */}
                <button
                  onClick={() => {
                    setSelectedStaffId(staff.StaffId);
                    setshowDeleteModal(true);
                  }}
                  className="
                    w-9 h-9
                    flex items-center justify-center
                    rounded-lg
                    border border-[#D8E6CF]
                    bg-[#F3F8F1]
                    text-red-500
                    hover:bg-red-500
                    hover:text-white
                    transition-all
                  "
                >
                  <Trash2 size={17} />
                </button>

                {/* Salary */}
                <button
                  onClick={() =>
                    navigate(
                      `/school-admin/staff/salary/${staff.StaffId}`
                    )
                  }
                  className="
                    w-9 h-9
                    flex items-center justify-center
                    rounded-lg
                    border border-[#D8E6CF]
                    bg-[#F3F8F1]
                    text-[#5B7F46]
                    hover:bg-[#5B7F46]
                    hover:text-white
                    transition-all
                  "
                >
                  <IndianRupee size={17} />
                </button>

              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="10" className="py-12 text-center">
            <div className="flex flex-col items-center justify-center">
              <Users className="h-14 w-14 text-gray-300 mb-3" />

              <h3 className="text-lg font-semibold text-gray-600">
                No Staff Found
              </h3>

              <p className="text-sm text-gray-400 mt-1">
                No staff match the selected filters.
              </p>
            </div>
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>


{/* ================= MOBILE CARDS ================= */}
<div className="lg:hidden space-y-4">
  {currentStaff.length > 0 ? (
    currentStaff.map((staff, index) => (
      <div
        key={staff.StaffId}
        className="
          bg-white
          rounded-2xl
          border border-gray-200
          p-4
          shadow-sm
          hover:shadow-md
          transition-all
        "
      >

        {/* Card Header */}
        <div className="flex items-start justify-between gap-3">

          <div className="flex items-center gap-3 min-w-0">
            <div
              className="
                w-11 h-11
                rounded-xl
                bg-[#EEF5EA]
                flex
                items-center
                justify-center
                text-[#5B7F46]
                font-bold
              "
            >
              {indexOfFirstRecord + index + 1}
            </div>

            <div className="min-w-0">
              <h3 className="font-bold text-gray-800 truncate">
                {staff.FirstName} {staff.LastName}
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                Staff ID: #{staff.StaffId}
              </p>
            </div>
          </div>

          {/* Status */}
          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
            <input
              type="checkbox"
              checked={staff.Status === "Active"}
              onChange={() => {
                if (staff.Status === "Active") {
                  suspendStaff(staff.StaffId);
                } else {
                  activeStaff(staff.StaffId);
                }
              }}
              className="sr-only peer"
            />

            <div
              className="
                w-11 h-6
                bg-gray-300
                rounded-full
                peer
                peer-checked:bg-[#5B7F46]
                transition-all
                after:content-['']
                after:absolute
                after:top-[2px]
                after:left-[2px]
                after:bg-white
                after:h-5
                after:w-5
                after:rounded-full
                after:transition-all
                peer-checked:after:translate-x-5
              "
            />
          </label>
        </div>


        {/* Staff Information */}
        <div className="grid grid-cols-2 gap-3 mt-5">

          <div>
            <p className="text-xs text-gray-400">
              Email
            </p>

            <p className="text-sm font-medium text-gray-700 break-all mt-1">
              {staff.Email}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">
              Phone
            </p>

            <p className="text-sm font-medium text-gray-700 mt-1">
              {staff.Phone}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">
              School
            </p>

            <p className="text-sm font-medium text-gray-700 mt-1">
              {staff.School}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">
              Role
            </p>

            <p className="text-sm font-medium text-gray-700 mt-1">
              {staff.Role}
            </p>
          </div>

          <div className="col-span-2">
            <p className="text-xs text-gray-400">
              Department
            </p>

            <p className="text-sm font-medium text-gray-700 mt-1">
              {staff.Department ?? "NULL"}
            </p>
          </div>

        </div>


        {/* Actions */}
        <div className="flex gap-2 mt-5 pt-4 border-t border-gray-100">

          {/* Edit */}
          <button
            onClick={() =>
              navigate(
                `/school-admin/staff/edit/${staff.StaffId}`
              )
            }
            className="
              flex-1
              h-10
              flex items-center justify-center gap-2
              rounded-lg
              border border-[#D8E6CF]
              bg-[#F3F8F1]
              text-[#5B7F46]
              font-semibold
              text-sm
              hover:bg-[#5B7F46]
              hover:text-white
              transition-all
            "
          >
            <Pen size={17} />
            Edit
          </button>


          {/* Delete */}
          <button
            onClick={() => {
              setSelectedStaffId(staff.StaffId);
              setshowDeleteModal(true);
            }}
            className="
              flex-1
              h-10
              flex items-center justify-center gap-2
              rounded-lg
              border border-[#D8E6CF]
              bg-[#F3F8F1]
              text-red-500
              font-semibold
              text-sm
              hover:bg-red-500
              hover:text-white
              transition-all
            "
          >
            <Trash2 size={17} />
            Delete
          </button>


          {/* Salary */}
          <button
            onClick={() =>
              navigate(
                `/school-admin/staff/salary/${staff.StaffId}`
              )
            }
            className="
              flex-1
              h-10
              flex items-center justify-center gap-2
              rounded-lg
              border border-[#D8E6CF]
              bg-[#F3F8F1]
              text-[#5B7F46]
              font-semibold
              text-sm
              hover:bg-[#5B7F46]
              hover:text-white
              transition-all
            "
          >
            <IndianRupee size={17} />
            Salary
          </button>

        </div>

      </div>
    ))
  ) : (
    <div className="py-12 text-center">
      <Users className="h-14 w-14 text-gray-300 mx-auto mb-3" />

      <h3 className="text-lg font-semibold text-gray-600">
        No Staff Found
      </h3>

      <p className="text-sm text-gray-400 mt-1">
        No staff match the selected filters.
      </p>
    </div>
  )}
</div>

{/* ================= PAGINATION ================= */}
{totalPages > 1 && (
  <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

    {/* Showing Text */}
    <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
      Showing{" "}
      <span className="font-semibold text-[#5B7F46]">
        {filteredStaff.length === 0
          ? 0
          : indexOfFirstRecord + 1}
      </span>{" "}
      to{" "}
      <span className="font-semibold text-[#5B7F46]">
        {Math.min(indexOfLastRecord, filteredStaff.length)}
      </span>{" "}
      of{" "}
      <span className="font-semibold text-[#5B7F46]">
        {filteredStaff.length}
      </span>{" "}
      entries
    </div>

    {/* Pagination */}
    <div className="flex flex-wrap items-center justify-center gap-2">

      {/* Previous */}
      <button
        disabled={currentPage === 1}
        onClick={() =>
          setCurrentPage((prev) => prev - 1)
        }
        className={`
          px-3 sm:px-4
          py-2
          text-xs sm:text-sm
          rounded-xl
          border
          font-medium
          transition-all duration-200
          ${
            currentPage === 1
              ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-[#5B7F46]"
          }
        `}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() =>
            setCurrentPage(index + 1)
          }
          className={`
            h-9 w-9
            sm:h-10 sm:w-10
            rounded-xl
            text-xs sm:text-sm
            font-semibold
            border
            transition-all duration-200
            ${
              currentPage === index + 1
                ? "bg-[#5B7F46] text-white shadow-sm"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-[#5B7F46]"
            }
          `}
        >
          {index + 1}
        </button>
      ))}

      {/* Next */}
      <button
        disabled={
          currentPage === totalPages ||
          totalPages === 0
        }
        onClick={() =>
          setCurrentPage((prev) => prev + 1)
        }
        className={`
          px-3 sm:px-4
          py-2
          text-xs sm:text-sm
          rounded-xl
          border
          font-medium
          transition-all duration-200
          ${
            currentPage === totalPages ||
            totalPages === 0
              ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-[#5B7F46]"
          }
        `}
      >
        Next
      </button>

    </div>
  </div>
)}

        </SchoolAdminDashboardLayout>
      </section>

      {/* --------------------------------------------- Filter Modal ----------------------------------------------------- */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div
            className="
        w-full
        max-w-lg
        rounded-3xl
        bg-white
        shadow-2xl
        overflow-hidden
        animate-in fade-in zoom-in duration-200
      "
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-[#EEF5EA] flex items-center justify-center">
                  <Filter className="text-[#5B7F46]" size={24} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Filter Schools
                  </h2>

                  <p className="text-sm text-gray-500">
                    Select filters to refine schools
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowFilterModal(false)}
                className="h-10 w-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
              >
                <X size={22} />
              </button>
            </div>

            {/* Body */}

            <div className="p-6 space-y-7">
              {/* Status */}

              <div>
                <label className="text-sm font-semibold text-gray-700">
                  School Status
                </label>

                <div className="flex flex-wrap gap-3 mt-3">
                  {["All", "Active", "Suspend"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setTempStatusFilter(status)}
                      className={`px-5 py-2.5 rounded-xl border transition ${
                        tempStatusFilter === status
                          ? "bg-[#5B7F46] text-white border-[#5B7F46]"
                          : "bg-white border-gray-300 text-gray-600 hover:border-[#5B7F46]"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}

              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Sort Order
                </label>

                <div className="flex flex-wrap gap-3 mt-3">
                  <button
                    onClick={() => setTempSortOrder("ASC")}
                    className={`px-5 py-2.5 rounded-xl border transition ${
                      tempSortOrder === "ASC"
                        ? "bg-[#5B7F46] text-white border-[#5B7F46]"
                        : "bg-white border-gray-300 text-gray-600 hover:border-[#5B7F46]"
                    }`}
                  >
                    ↑ Ascending
                  </button>

                  <button
                    onClick={() => setTempSortOrder("DESC")}
                    className={`px-5 py-2.5 rounded-xl border transition ${
                      tempSortOrder === "DESC"
                        ? "bg-[#5B7F46] text-white border-[#5B7F46]"
                        : "bg-white border-gray-300 text-gray-600 hover:border-[#5B7F46]"
                    }`}
                  >
                    ↓ Descending
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}

            <div className="border-t px-6 py-5 flex flex-col sm:flex-row gap-3 justify-between">
              <button
                onClick={() => {
                  setTempStatusFilter("All");
                  setTempSortOrder("DESC");
                }}
                className="text-[#5B7F46] font-semibold hover:underline"
              >
                Reset Filters
              </button>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="
              px-6
              py-2.5
              rounded-xl
              border
              border-gray-300
              hover:bg-gray-50
            "
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    setStatusFilter(tempStatusFilter);
                    setSortOrder(tempSortOrder);
                    setShowFilterModal(false);
                  }}
                  className="
              px-6
              py-2.5
              rounded-xl
              bg-[#5B7F46]
              text-white
              hover:bg-[#4A6938]
            "
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------- Delete School Modal ----------------------------------------------------- */}
      {showDeleteModal && (
        <div
          className="
    fixed inset-0 z-50
    flex items-center justify-center
    bg-black/40
    backdrop-blur-sm
    p-3 sm:p-4
    overflow-y-auto
  "
        >
          {" "}
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-red-50 border-b border-red-100 px-5 py-5">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                  <Trash2 size={28} className="text-red-600" />
                </div>
              </div>

              <h2 className="mt-3 text-center text-2xl font-bold text-red-600">
                Delete Staff
              </h2>
            </div>

            {/* Body */}
            <div className="px-6 py-6 text-center">
              <p className="text-base font-semibold text-gray-700">
                Are you sure you want to delete this staff member?
              </p>

              <p className="mt-4 text-sm text-gray-500 leading-7">
                This action is permanent and cannot be undone.
              </p>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setshowDeleteModal(false)}
                  className="w-full py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>

                {/* {schoolStatus === "Active" && (
                  <button
                    onClick={() => suspendSchool(selectedSchoolId)}
                    className="w-full py-2.5 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600"
                  >
                    Suspend
                  </button>
                )} */}

                <button
                  onClick={() => deleteStaff(selectedStaffId)}
                  className="w-full py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SchoolAdmin_Staff;
