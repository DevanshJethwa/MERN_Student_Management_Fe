import React, { useEffect, useState } from 'react'
import AdminDashboardLayout from '../../components/layout/SuperAdmin/AdminDashboardLayout'
       import { Search, Users, Plus, Filter, Pen, Trash, Trash2, School, X } from "lucide-react";
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';


function AdminStaff() {
  const navigate = useNavigate();

    const [staff,setStaff]= useState([]);

    const getStaff = async () =>{
        try {
            const token = localStorage.getItem("token");

            const response = await api.get("/staff/getAllStaff",{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })

            console.log("staff details", response);

            if(response.status === 200){
                setStaff(response.data.Staff);
                console.log(response.data.Staff)
            }
        } catch (error) {
            console.log(error);
        }
    }

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
      item.Phone?.toLowerCase().includes(keyword)
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

  return b.StaffId - a.StaffId;   // Newest -> Oldest
});

  const [currentPage, setCurrentPage] = useState(1);
const recordsPerPage = 5;

const totalPages = Math.ceil(filteredStaff.length / recordsPerPage);

const indexOfLastRecord = currentPage * recordsPerPage;
const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

const currentStaff = filteredStaff.slice(
  indexOfFirstRecord,
  indexOfLastRecord
);

  return (
    <>

<section className="bg-[#E9E9E9] min-h-screen">
  <AdminDashboardLayout>
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
          Staff
        </h1>

        <p className="text-xs sm:text-sm text-gray-500">
          Manage all staff members
        </p>
      </div>

    </div>

    {/* Right Side */}
    {/* <button
    onClick={() => navigate("/admin/staff/add")}
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
    </button> */}

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

      <div className="overflow-x-auto rounded-2xl">
            <table className="w-full min-w-[800px] overflow-hidden rounded-2xl">
              <thead className="bg-[#708f5e] ">
                <tr className="border-b-2  border-[#5B7F46]">
                  <th className="px-2 sm:px-3 md:px-5 py-2 sm:py-3 md:py-4 text-left text-xs sm:text-sm md:text-base text-white font-semibold">
                    Sr.no
                  </th>
                  <th className="px-2 sm:px-3 md:px-5 py-2 sm:py-3 md:py-4 text-left text-xs sm:text-sm md:text-base text-white font-semibold">
                    Staff ID
                  </th>
                  <th className="px-2 sm:px-3 md:px-5 py-2 sm:py-3 md:py-4 text-left text-xs sm:text-sm md:text-base text-white font-semibold">
                    Staff Name
                  </th>
                  <th className="px-2 sm:px-3 md:px-5 py-2 sm:py-3 md:py-4 text-left text-xs sm:text-sm md:text-base text-white font-semibold">
                    Email
                  </th>
                  <th className="px-2 sm:px-3 md:px-5 py-2 sm:py-3 md:py-4 text-left text-xs sm:text-sm md:text-base text-white font-semibold">
                    Phone
                  </th>
                  <th className="px-2 sm:px-3 md:px-5 py-2 sm:py-3 md:py-4 text-left text-xs sm:text-sm md:text-base text-white font-semibold">
                    Role
                  </th>
                  <th className="px-2 sm:px-3 md:px-5 py-2 sm:py-3 md:py-4 text-left text-xs sm:text-sm md:text-base text-white font-semibold">
                    Department
                  </th>
                  <th className="px-2 sm:px-3 md:px-5 py-2 sm:py-3 md:py-4 text-center text-xs sm:text-sm md:text-base text-white font-semibold">
                    Status
                  </th>
                  {/* <th className="px-2 sm:px-3 md:px-5 py-2 sm:py-3 md:py-4 text-center text-xs sm:text-sm md:text-base text-white font-semibold">
                    Actions
                  </th> */}
                </tr>
              </thead>

              <tbody>
  {currentStaff.length > 0 ? (
    currentStaff.map((staff, index) => (
      <tr
        key={staff.StaffId}
       className={`
          ${index % 2 === 0 ? "bg-white" : "bg-[#ffffff]"}
          hover:bg-[#cce2bd]
          transition-all
          duration-200
          rounded-2xl
        `}
      >
        <td className="px-5 py-4">
          {indexOfFirstRecord + index + 1}
        </td>

        <td className="px-5 py-4">
          {staff.StaffId}
        </td>

        <td className="px-5 py-4 font-semibold">
          {staff.FirstName} {staff.LastName}
        </td>

        <td className="px-5 py-4">
          {staff.Email}
        </td>

        <td className="px-5 py-4">
          {staff.Phone}
        </td>

        <td className="px-5 py-4">
          {staff.Role}
        </td>

        <td className="px-5 py-4">
          {staff.Department != null ? staff.Department : "NULL"}
        </td>

        <td className="px-2 sm:px-3 md:px-5 py-2 sm:py-3 md:py-4 text-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            disabled={true}
                             defaultChecked={staff.Status === "Active"}
                            
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
                          ></div>
                        </label>
                      </td>

        {/* <td className="px-2 sm:px-3 md:px-5 py-2 sm:py-3 md:py-4">
                        <div className="flex justify-center gap-1 sm:gap-2">
                          {
                            <button
                              className="
    flex items-center gap-1
    px-2 py-2
    rounded-lg
    border border-[#D8E6CF]
    bg-[#F3F8F1]
    text-[#5B7F46]
    font-semibold
    text-xs
    hover:bg-[#5B7F46]
    hover:text-white
    transition-all duration-200
  "
                            >
                              <Pen size={18} />
                            </button>
                          }

                          <button
                            
                            className={`flex items-center gap-1 px-2 py-1 
                                  font-bold border border-[#D8E6CF]
    bg-[#F3F8F1] text-red-500 text-xs rounded-md  hover:bg-red-500 hover:text-white transition duration-300`}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td> */}
      </tr>
    ))
  ) : (
    <tr>
                        <td colSpan="8" className="py-12 text-center">
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
{totalPages > 1 && (
  <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    {/* Showing Text */}
    <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
      Showing{" "}
      <span className="font-semibold text-[#5B7F46]">
        {filteredStaff.length === 0 ? 0 : indexOfFirstRecord + 1}
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
        onClick={() => setCurrentPage((prev) => prev - 1)}
        className={`px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-xl border font-medium transition-all duration-200
        ${
          currentPage === 1
            ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-[#5B7F46]"
        }`}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={`h-9 w-9 sm:h-10 sm:w-10 rounded-xl text-xs sm:text-sm font-semibold border transition-all duration-200
          ${
            currentPage === index + 1
              ? "bg-[#5B7F46] text-white shadow-sm"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-[#5B7F46]"
          }`}
        >
          {index + 1}
        </button>
      ))}

      {/* Next */}
      <button
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className={`px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-xl border font-medium transition-all duration-200
        ${
          currentPage === totalPages || totalPages === 0
            ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-[#5B7F46]"
        }`}
      >
        Next
      </button>
    </div>
  </div>
)}
            
          </div>

    
  </AdminDashboardLayout>
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
          onClick={()=>{
            setTempStatusFilter("All");
setTempSortOrder("DE");
          }}
          className="text-[#5B7F46] font-semibold hover:underline"
        >
          Reset Filters
        </button>

        <div className="flex gap-3">

          <button
            onClick={()=>setShowFilterModal(false)}
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
    </>
  )
}

export default AdminStaff