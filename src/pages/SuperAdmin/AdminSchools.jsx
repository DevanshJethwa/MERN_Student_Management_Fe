import React, { useEffect, useState } from "react";
import AdminDashboardLayout from "../../components/layout/SuperAdmin/AdminDashboardLayout";
import axios from "axios";
import {
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Pen,
  Plus,
  School,
  Settings2,
  ShieldCheck,
  Trash2,
  X,
  Search,
  Filter,
} from "lucide-react";
import { toast, Zoom } from "react-toastify";
import api from "../../api/api";

function AdminSchools() {
  const [schools, setSchools] = useState([]);
  const [showAddSchoolModal, setshowAddSchoolModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedSchoolId, setSelectedSchoolId] = useState(null);
  const [schoolStatus, setSchoolStatus] = useState("");

  const [showActiveModal, setShowActiveModal] = useState(false);
  const [searchSchool, setSearchSchool] = useState("");
const [showFilterModal, setShowFilterModal] = useState(false);

// Temporary states for modal
const [tempStatusFilter, setTempStatusFilter] = useState("All");
const [tempSortOrder, setTempSortOrder] = useState("DESC");

  const closeModal = () => {
    setIsClosing(true);

    setTimeout(() => {
      setshowAddSchoolModal(false);

      setSchoolName("");
      setEmail("");
      setPhone("");
      setAddress("");

      setSelectedSchoolId(null);
      setIsEditMode(false);

      setSchoolError(false);
      setEmailError(false);
      setAddressError(false);
      setPhoneError(false);

      setIsClosing(false);
    }, 300);
  };

  // ---------------------------------------------------------- Get School Function -----------------------------------------------------
  const getSchools = async () => {
    const token = localStorage.getItem("token");
    console.log(token.trim());

    try {
      if (token) {
        const response = await api.get("/school/getSchool", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSchools(response.data.data);
        console.log("Schools:", response.data.data.length);

        console.log(response.data.data);
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      console.log(message);
    }
  };

  const [schoolName, setSchoolName] = useState("");
  const [Address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");

  const [schoolError, setSchoolError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  // ---------------------------------------------------- Add School Function ------------------------------------------------------

  const addSchool = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (!schoolName.trim()) {
      setSchoolError(true);
      isValid = false;
    }

    if (!Address.trim()) {
      setAddressError(true);
      isValid = false;
    }

    if (!phone.trim()) {
      setPhoneError(true);
      isValid = false;
    }

    if (!Email.trim()) {
      setEmailError(true);
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      // console.log(token.trim());

      console.log(schoolName, Address, phone, Email);

      const response = await api.post(
        "/school/addSchool",
        {
          schoolname: schoolName,
          address: Address,
          phone: phone,
          email: Email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response);

      if (response.status === 200) {
        closeModal();
        setSchoolName("");
        setEmail("");
        setAddress("");
        setPhone("");
        getSchools();

        toast.success(response.data.message, {
          position: "bottom-right",
          autoClose: 1800,
          hideProgressBar: true,
          theme: "dark",
          transition: Zoom,
        });
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      console.log(message);
    }
  };

  // ------------------------------------------------------- Edit School Function -----------------------------------------------------

  const updateSchool = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await api.put(
        `/school/updateSchool/${selectedSchoolId}`,
        {
          schoolname: schoolName,
          address: Address,
          phone: phone,
          email: Email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        toast.success(response.data.message, {
          position: "bottom-right",
          autoClose: 1800,
          hideProgressBar: true,
          theme: "dark",
          transition: Zoom,
        });

        getSchools();
        closeModal();
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  const handleEdit = (school) => {
    setIsEditMode(true);
    setSelectedSchoolId(school.SchoolId);

    setSchoolName(school.SchoolName);
    setEmail(school.Email);
    setPhone(school.Phone);
    setAddress(school.Address);

    setshowAddSchoolModal(true);
  };

  // -------------------------------------------------- Delete School Function ------------------------------------------------
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deleteSchool = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.delete(
        `/school/deleteSchool/${selectedSchoolId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        toast.success(response.data.message);

        getSchools();

        setShowDeleteModal(false);
        setSelectedSchoolId(null);
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  // ---------------- Pagination ----------------

  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("DESC");

  const filteredSchools = schools
  .filter((school) => {
    // Search Filter
    const search = searchSchool.toLowerCase();

    const matchesSearch =
      school.SchoolId.toString().includes(search) ||
      school.SchoolName.toLowerCase().includes(search) ||
      school.Email.toLowerCase().includes(search) ||
      school.Phone.toString().includes(search) ||
      school.Address.toLowerCase().includes(search);

    // Status Filter
    const matchesStatus =
      statusFilter === "All" || school.Status === statusFilter;

    return matchesSearch && matchesStatus;
  })
  .sort((a, b) => {
    if (sortOrder === "ASC") {
      return a.SchoolId - b.SchoolId;
    }
    return b.SchoolId - a.SchoolId;
  });

  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 5;

  const totalPages = Math.ceil(filteredSchools.length / rowsPerPage);

  const currentSchools = filteredSchools.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, sortOrder,searchSchool, schools]);

  // ----------------------------------------------------- Suspend School Function -----------------------------------------------

  const suspendSchool = async (schoolId) => {
    try {
      console.log("School Id is : ", schoolId);
      const token = localStorage.getItem("token");

      console.log(token);
      const response = await api.patch(
        `/school/changeSuspendStatus/${schoolId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        toast.success(response.data.message);

        // getSchools();

        // setShowDeleteModal(false);
        // setSelectedSchoolId(null);
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
      // Roll back switch if API fails
      setPendingStatusChanges((prev) => ({
        ...prev,
        // [schoolId]: true,
        [selectedSchoolId]: true,
      }));
    }
  };

  // ----------------------------------------------------- Active School Function -----------------------------------------------

  const activeSchool = async () => {
    try {
      // console.log(selectedSchoolId);
      const token = localStorage.getItem("token");
      const response = await api.patch(
        `/school/changeActiveStatus/${selectedSchoolId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        toast.success(response.data.message);

        // getSchools();

        // setShowActiveModal(false);
        // setSelectedSchoolId(null);
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
      // Roll back switch if API fails
      setPendingStatusChanges((prev) => ({
        ...prev,
        [selectedSchoolId]: false,
      }));
    }
  };

  const [pendingStatusChanges, setPendingStatusChanges] = useState({});

  useEffect(() => {
    getSchools();

    // Clear temporary switch states
    setPendingStatusChanges({});
  }, [statusFilter]);

//------------------------------------------------------ Filter Code

const openFilterModal = () => {
  setTempStatusFilter(statusFilter);
  setTempSortOrder(sortOrder);
  setShowFilterModal(true);
  
};

useEffect(() => {
  getSchools();
}, [statusFilter, sortOrder]);



  useEffect(() => {
    getSchools();
  }, []);

  return (
    <>
      <section>
        <AdminDashboardLayout>
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
                <School className="text-white h-6 w-6 sm:h-8 sm:w-8" />
              </div>

              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                  Schools
                </h1>
                <p className="text-xs sm:text-sm text-gray-500">
                  Manage all registered schools
                </p>
              </div>
            </div>

            {/* Right Side */}
            <button
              onClick={() => setshowAddSchoolModal(true)}
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
              <span>Add School</span>
            </button>
          </div>

          {/* <div
            className="
        bg-white
        rounded-2xl
        p-6
        shadow-sm
        "
          > */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

  {/* Search */}
  <div className="relative w-full md:max-w-md">

    <Search
      size={18}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
    />

    <input
  type="text"
  placeholder="Search by ID, Name, Email, Phone or Address..."
  value={searchSchool}
  onChange={(e) => setSearchSchool(e.target.value)}
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
    onClick={openFilterModal}
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

          <div className="overflow-x-auto rounded-2xl">
            <table className="w-full min-w-[800px] overflow-hidden rounded-2xl">
              <thead className="bg-[#708f5e] ">
                <tr className="border-b-2  border-[#5B7F46]">
                  <th className="px-2 sm:px-3 md:px-5 py-2 sm:py-3 md:py-4 text-left text-xs sm:text-sm md:text-base text-white font-semibold">
                    Sr.no
                  </th>
                  <th className="px-2 sm:px-3 md:px-5 py-2 sm:py-3 md:py-4 text-left text-xs sm:text-sm md:text-base text-white font-semibold">
                    School ID
                  </th>
                  <th className="px-2 sm:px-3 md:px-5 py-2 sm:py-3 md:py-4 text-left text-xs sm:text-sm md:text-base text-white font-semibold">
                    School Name
                  </th>
                  <th className="px-2 sm:px-3 md:px-5 py-2 sm:py-3 md:py-4 text-left text-xs sm:text-sm md:text-base text-white font-semibold">
                    Email
                  </th>
                  <th className="px-2 sm:px-3 md:px-5 py-2 sm:py-3 md:py-4 text-left text-xs sm:text-sm md:text-base text-white font-semibold">
                    Phone
                  </th>
                  <th className="px-2 sm:px-3 md:px-5 py-2 sm:py-3 md:py-4 text-left text-xs sm:text-sm md:text-base text-white font-semibold">
                    Address
                  </th>
                  <th className="px-2 sm:px-3 md:px-5 py-2 sm:py-3 md:py-4 text-center text-xs sm:text-sm md:text-base text-white font-semibold">
                    Status
                  </th>
                  <th className="px-2 sm:px-3 md:px-5 py-2 sm:py-3 md:py-4 text-center text-xs sm:text-sm md:text-base text-white font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {currentSchools.length > 0 ? (
                  currentSchools.map((school, index) => (
                    <tr
                      key={school.SchoolId}
                      className={`
          ${index % 2 === 0 ? "bg-white" : "bg-[#ffffff]"}
          hover:bg-[#cce2bd]
          transition-all
          duration-200
          rounded-2xl
        `}
                    >
                      <td className="px-2 sm:px-3 md:px-5 py-2 sm:py-3 md:py-4">
                        {(currentPage - 1) * rowsPerPage + index + 1}
                      </td>

                      <td className="px-2 sm:px-3 md:px-5 py-2 sm:py-3 md:py-4">
                        {school.SchoolId}
                      </td>

                      <td className="px-2 sm:px-3 md:px-5 py-2 sm:py-3 md:py-4 font-semibold">
                        {school.SchoolName}
                      </td>

                      <td className="px-2 sm:px-3 md:px-5 py-2 sm:py-3 md:py-4">
                        {school.Email}
                      </td>

                      <td className="px-2 sm:px-3 md:px-5 py-2 sm:py-3 md:py-4">
                        {school.Phone}
                      </td>

                      <td className="px-2 sm:px-3 md:px-5 py-2 sm:py-3 md:py-4">
                        {school.Address}
                      </td>

                      <td className="px-2 sm:px-3 md:px-5 py-2 sm:py-3 md:py-4 text-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={
                              pendingStatusChanges[school.SchoolId] ??
                              school.Status === "Active"
                            }
                            onChange={() => {
                              setSelectedSchoolId(school.SchoolId);

                              const newStatus = school.Status !== "Active";

                              setPendingStatusChanges((prev) => ({
                                ...prev,
                                [school.SchoolId]: newStatus,
                              }));

                              if (school.Status === "Active") {
                                suspendSchool(school.SchoolId);
                              } else {
                                activeSchool(school.SchoolId);
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
                          ></div>
                        </label>
                      </td>

                      <td className="px-2 sm:px-3 md:px-5 py-2 sm:py-3 md:py-4">
                        <div className="flex justify-center gap-1 sm:gap-2">
                          {
                            <button
                              onClick={() => handleEdit(school)}
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

                          {/* {school.Status === "Suspend" && (
                            <button
                              // onClick={() => {
                              //   setSelectedSchoolId(school.SchoolId);
                              //   setShowActiveModal(true);
                              // }}
                              className="
    flex items-center gap-1
    px-2 py-1
    md:h-8 md:w-20
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
                              <ShieldCheck size={15} />
                              <span className="hidden md:inline">Active</span>
                            </button>
                          )} */}

                          <button
                            onClick={() => {
                              setSelectedSchoolId(school.SchoolId);
                              setSchoolStatus(school.Status);
                              setShowDeleteModal(true);
                            }}
                            className={`flex items-center gap-1 px-2 py-1 
                                  font-bold border border-[#D8E6CF]
    bg-[#F3F8F1] text-red-500 text-xs rounded-md  hover:bg-red-500 hover:text-white transition duration-300`}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <School className="h-14 w-14 text-gray-300 mb-3" />

                        <h3 className="text-lg font-semibold text-gray-600">
                          No Schools Found
                        </h3>

                        <p className="text-sm text-gray-400 mt-1">
                          No schools match the selected filters.
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
                    {(currentPage - 1) * rowsPerPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold text-[#5B7F46]">
                    {Math.min(
                      currentPage * rowsPerPage,
                      filteredSchools.length,
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-[#5B7F46]">
                    {filteredSchools.length}
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
              : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
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
                ? "bg-[#5B7F46] text-white  shadow-sm"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-[#5B7F46]"
            }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  {/* Next */}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className={`px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-xl border font-medium transition-all duration-200
          ${
            currentPage === totalPages
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
          {/* </div> */}
        </AdminDashboardLayout>
      </section>

      {/*------------------------------------------------------- Add School Modal ---------------------------------------------------------- */}
      {showAddSchoolModal && (
        <div
          className={`
      fixed inset-0 z-50
      flex items-center justify-center
      bg-black/40
      backdrop-blur-sm
      p-4
      transition-all duration-300
      ${isClosing ? "opacity-0" : "opacity-100"}
    `}
        >
          <div
            className={`
    w-full
    max-w-[95%]
    sm:max-w-2xl
    md:max-w-3xl
    lg:max-w-4xl
    xl:max-w-5xl
    bg-white
    rounded-2xl md:rounded-[30px]
    shadow-[0_20px_60px_rgba(0,0,0,0.15)]
    border border-gray-100
    overflow-hidden
    transition-all duration-300
    ${
      isClosing
        ? "scale-95 opacity-0 translate-y-5"
        : "scale-100 opacity-100 translate-y-0"
    }
  `}
          >
            {/* Header */}
            <div className="relative px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 lg:pt-8 pb-4 sm:pb-6">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="
            absolute
            top-6
            right-6
            h-11
            w-11
            rounded-full
            hover:bg-red-50
            hover:text-red-500
            transition
            flex
            items-center
            justify-center
          "
              >
                <X size={28} />
              </button>

              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Icon */}
                <div className="h-16 w-16 sm:h-20 sm:w-20 lg:h-28 lg:w-28 rounded-full bg-[#EEF5EA] flex items-center justify-center shrink-0">
                  <School
                    size={28}
                    className="text-[#5B7F46] sm:w-10 sm:h-10 lg:w-[55px] lg:h-[55px]"
                  />
                </div>

                {/* Title */}
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                    {isEditMode ? "Edit School" : "Add New School"}
                  </h2>

                  <p className="mt-2 text-sm sm:text-base lg:text-lg text-gray-500 leading-6 sm:leading-7">
                    {isEditMode
                      ? "Update school information and keep your records accurate across the platform."
                      : "Register a new school and manage all information from a centralized platform."}
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* FORM START */}
            <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
                {/* Part 2 Starts Here */}

                {/* School Name */}
                <div>
                  <label className="flex items-center gap-2 mb-3 text-[15px] font-semibold text-gray-700">
                    <School size={20} className="text-[#5B7F46]" />
                    School Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Enter school name"
                    value={schoolName}
                    onChange={(e) => {
                      setSchoolName(e.target.value);
                      if (e.target.value.trim()) {
                        setSchoolError(false);
                      }
                    }}
                    className="
      w-full
      h-11 sm:h-12 lg:h-14
      rounded-2xl
      border
      border-gray-300
      px-5
      text-sm sm:text-[15px]
      outline-none
      transition-all
      duration-200
      focus:border-[#5B7F46]
      focus:ring-4
      focus:ring-[#5B7F46]/10
      placeholder:text-gray-400
    "
                  />

                  {schoolError && (
                    <p className="mt-2 text-sm text-red-500">
                      Enter your school name
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 mb-3 text-[15px] font-semibold text-gray-700">
                    <Mail size={20} className="text-[#5B7F46]" />
                    Email Address <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={Email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (e.target.value.trim()) {
                        setEmailError(false);
                      }
                    }}
                    className="
      w-full
      h-11 sm:h-12 lg:h-14
      rounded-2xl
      border
      border-gray-300
      px-5
      text-sm sm:text-[15px]
      outline-none
      transition-all
      duration-200
      focus:border-[#5B7F46]
      focus:ring-4
      focus:ring-[#5B7F46]/10
      placeholder:text-gray-400
    "
                  />

                  {emailError && (
                    <p className="mt-2 text-sm text-red-500">
                      Enter your email
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center gap-2 mb-3 text-[15px] font-semibold text-gray-700">
                    <Phone size={20} className="text-[#5B7F46]" />
                    Phone Number <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (e.target.value.trim()) {
                        setPhoneError(false);
                      }
                    }}
                    className="
      w-full
      h-11 sm:h-12 lg:h-14
      rounded-2xl
      border
      border-gray-300
      px-5
      text-sm sm:text-[15px]
      outline-none
      transition-all
      duration-200
      focus:border-[#5B7F46]
      focus:ring-4
      focus:ring-[#5B7F46]/10
      placeholder:text-gray-400
    "
                  />

                  {phoneError && (
                    <p className="mt-2 text-sm text-red-500">
                      Enter your phone number
                    </p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="flex items-center gap-2 mb-3 text-[15px] font-semibold text-gray-700">
                    <MapPin size={20} className="text-[#5B7F46]" />
                    Address <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Enter address"
                    value={Address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      if (e.target.value.trim()) {
                        setAddressError(false);
                      }
                    }}
                    className="
      w-full
      h-11 sm:h-12 lg:h-14
      rounded-2xl
      border
      border-gray-300
      px-5
      text-sm sm:text-[15px]
      outline-none
      transition-all
      duration-200
      focus:border-[#5B7F46]
      focus:ring-4
      focus:ring-[#5B7F46]/10
      placeholder:text-gray-400
    "
                  />

                  {addressError && (
                    <p className="mt-2 text-sm text-red-500">
                      Enter your address
                    </p>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-10 border-t border-gray-200 pt-6">
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-4">
                  {/* Cancel Button */}
                  <button
                    onClick={closeModal}
                    className="
                w-full sm:w-auto
                px-5 sm:px-6 lg:px-8
py-2.5 sm:py-3 lg:py-3.5
                rounded-2xl
                border
                border-gray-300
                bg-white
                text-gray-700
                font-semibold
                hover:bg-gray-50
                hover:border-gray-400
                transition-all
                duration-200
              "
                  >
                    Cancel
                  </button>

                  {/* Add / Update Button */}
                  <button
                    onClick={isEditMode ? updateSchool : addSchool}
                    className="
                w-full sm:w-auto
                flex
                items-center
                justify-center
                gap-2
                px-5 sm:px-6 lg:px-8
py-2.5 sm:py-3 lg:py-3.5
                rounded-2xl
                bg-[#5B7F46]
                text-white
                font-semibold
                shadow-lg
                shadow-[#5B7F46]/25
                hover:bg-[#4B6A39]
                hover:scale-[1.02]
                active:scale-95
                transition-all
                duration-300
              "
                  >
                    <Plus size={20} />

                    {isEditMode ? "Update School" : "Add School"}
                  </button>
                </div>
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
                Delete School
              </h2>
            </div>

            {/* Body */}
            <div className="px-6 py-6 text-center">
              <p className="text-base font-semibold text-gray-700">
                Are you sure you want to delete this school?
              </p>

              <p className="mt-4 text-sm text-gray-500 leading-7">
                This action is permanent and cannot be undone.
              </p>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
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
                  onClick={() => deleteSchool(selectedSchoolId)}
                  className="w-full py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

            {["All","Active","Suspend"].map(status=>(
              <button
                key={status}
                className={`
                  px-5
                  py-2.5
                  rounded-xl
                  border
                  transition

                  ${
                    tempStatusFilter === status
                    ? "bg-[#5B7F46] text-white border-[#5B7F46]"
                    : "bg-white border-gray-300 text-gray-600 hover:border-[#5B7F46]"
                  }
                `}
                onClick={() => setTempStatusFilter(status)}
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
              className={`
                px-5
                py-2.5
                rounded-xl
                border
                transition

                ${
                  tempSortOrder ==="ASC"
                  ? "bg-[#5B7F46] text-white border-[#5B7F46]"
                  : "bg-white border-gray-300 text-gray-600 hover:border-[#5B7F46]"
                }
              `}
            >
              ↑ Ascending
            </button>

            <button
              onClick={() => setTempSortOrder("DESC")}
              className={`
                px-5
                py-2.5
                rounded-xl
                border
                transition

                ${
                  tempSortOrder ==="DESC"
                  ? "bg-[#5B7F46] text-white border-[#5B7F46]"
                  : "bg-white border-gray-300 text-gray-600 hover:border-[#5B7F46]"
                }
              `}>
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
setTempSortOrder("DESC");
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
  );
}

export default AdminSchools;
