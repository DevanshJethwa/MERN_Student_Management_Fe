import React, { useEffect, useState } from "react";
import SchoolAdminDashboardLayout from "../../components/layout/SchoolAdmin/SchoolAdminDashboardLayout";
import {
  ArrowLeft,
  Pencil,
  User,
  Building2,
  Briefcase,
  BadgeCheck,
  IndianRupee,
  Wallet,
  FileSpreadsheet,
  FileText,
  Download,
  ChevronDown,
  Search,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../src/custom-datepicker.css";

function StaffSalary() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  // Dummy Data (Replace with API Data)
  // const staff = {
  //   firstName: "Devansh",
  //   lastName: "Jethwa",
  //   role: "Teacher",
  //   department: "Computer Department",
  //   school: "ABC Public School",
  //   status: "Active",
  //   employeeId: "EMP-1001",
  //   joiningDate: "15 Jan 2025",
  // };

  const [openExport, setOpenExport] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [paymentHistory, setPaymentHistory] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredPayments = paymentHistory.filter((payment) => {
    const search = searchQuery.toLowerCase().trim();

    const salaryMonth = payment.SalaryMonth
      ? new Date(payment.SalaryMonth)
          .toLocaleDateString("en-IN", {
            month: "long",
            year: "numeric",
          })
          .toLowerCase()
      : "";

    const amount = payment.Amount ? String(payment.Amount).toLowerCase() : "";

    const paymentDate = payment.PaymentDate
      ? new Date(payment.PaymentDate)
          .toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
          .toLowerCase()
      : "";

    return (
      !search ||
      salaryMonth.includes(search) ||
      amount.includes(search) ||
      paymentDate.includes(search)
    );
  });

  const recordsPerPage = 5;

  const totalPages = Math.ceil(paymentHistory.length / recordsPerPage);

  const startIndex = (currentPage - 1) * recordsPerPage;

  const currentPayments = paymentHistory.slice(
    startIndex,
    startIndex + recordsPerPage,
  );

  const handleDownload = (type) => {
    console.log("Download", type);
    setOpenExport(false);
  };

  const [staffData, setstaffData] = useState(null);

  const [showSalaryForm, setShowSalaryForm] = useState(false);

  const [salaryAmount, setSalaryAmount] = useState("20000");
  const [allowance, setAllowance] = useState("1000");
  const [deduction, setDeduction] = useState("500");
  const [effectiveFrom, setEffectiveFrom] = useState("");
  const [paymentType, setPaymentType] = useState("Monthly");
  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer");
  const [isSalaryPaid, setIsSalaryPaid] = useState(false);

  const netSalary =
    Number(salaryAmount || 0) + Number(allowance || 0) - Number(deduction || 0);
  // const [salaryData, setSalaryData] = useState([]);

  // const getStaffById = async (staffId) => {
  //   try {
  //     const response = await api.get(`/staff/getStaffById/${staffId}`);
  //     console.log(response.data.Staff[0]);
  //     setstaffData(response.data.Staff[0]);
  //     // setStaff(response.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const getStaffSalary = async (staffId) => {
    try {
      const response = await api.get(`/salary/getSalaryByStaff/${staffId}`);
      console.log(response.data.salary);
      // setSalaryData(response.data.salary);
      setstaffData(response.data.salary);
      console.log("Staff Salarty Detail : ", response.data.salary);

      if (
        response.data.salary.salaSalaryId > 0 ||
        response.data.salary.salaSalaryId != 0
      ) {
        setIsSalaryPaid(true);
      }

      // setIsSalaryPaid(response.data.salary.PaymentStatus === "Paid");
      console.log("Is Salary Paid : ", isSalaryPaid);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("Is salary paid : ", isSalaryPaid);

  const isSalaryAssigned = staffData?.SalaryId !== null;

  const handleAssignSalary = async () => {
    try {
      if (!salaryAmount) {
        alert("Please enter basic salary");
        return;
      }

      if (!effectiveFrom) {
        alert("Please select effective from date");
        return;
      }

      const salaryData = {
        staffid: Number(id),
        salaryamount: Number(salaryAmount),
        allowance: Number(allowance || 0),
        deduction: Number(deduction || 0),
        paymenttype: paymentType,
        paymentmethod: paymentMethod,
        effectivefrom: effectiveFrom
          ? new Date(effectiveFrom).toISOString().split("T")[0]
          : "",
      };

      console.log("Salary Data:", salaryData);

      const response = await api.post("/salary/assignSalary", salaryData);

      console.log("API Response:", response.data);

      alert("Salary assigned successfully");

      setShowSalaryForm(false);

      await getStaffSalary(id);

      setSalaryAmount("");
      setAllowance("");
      setDeduction("");
      setEffectiveFrom("");
      setPaymentType("Monthly");
      setPaymentMethod("Bank Transfer");
    } catch (error) {
      console.error("Assign Salary Error:", error);

      console.error("Backend Error:", error.response?.data);

      alert(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to assign salary",
      );
    }
  };

  const handleUpdateSalary = async () => {
    try {
      if (!salaryAmount) {
        alert("Please enter basic salary");
        return;
      }

      if (!effectiveFrom) {
        alert("Please select effective from date");
        return;
      }

      const salaryData = {
        salaryamount: Number(salaryAmount),
        allowance: Number(allowance || 0),
        deduction: Number(deduction || 0),
        paymenttype: paymentType,
        paymentmethod: paymentMethod,
        effectivefrom: effectiveFrom
          ? new Date(effectiveFrom).toISOString().split("T")[0]
          : "",
      };

      console.log("Update Salary Data:", salaryData);

      const response = await api.put(`/salary/updateSalary/${id}`, salaryData);

      console.log("Update API Response:", response.data);

      alert("Salary updated successfully");

      // Close update form
      setShowSalaryForm(false);

      // Refresh salary data
      await getStaffSalary(id);

      // Reset form
      setSalaryAmount("");
      setAllowance("");
      setDeduction("");
      setEffectiveFrom("");
      setPaymentType("Monthly");
      setPaymentMethod("Bank Transfer");
    } catch (error) {
      console.error("Update Salary Error:", error);

      console.error("Backend Error:", error.response?.data);

      alert(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to update salary",
      );
    }
  };

  const handlePaySalary = async () => {
    try {
      const response = await api.post("/salary/create-order", {
        staffid: staffData.StaffId,
        salaryid: staffData.SalaryId,
        amount: Number(staffData.NetSalary),
      });

      console.log("Order Response:", response.data);

      const { order, key } = response.data;

      const options = {
        key: key,
        amount: order.amount,
        currency: "INR",

        name: "SchoolHub",

        description: `Salary Payment for ${staffData.FirstName} ${staffData.LastName}`,

        order_id: order.id,

        handler: async function (paymentResponse) {
          console.log("Payment Success:", paymentResponse);

          try {
            const verifyResponse = await api.post("/salary/verify-payment", {
              staffid: staffData.StaffId,
              salaryid: staffData.SalaryId,
              amount: Number(staffData.NetSalary),

              razorpay_order_id: paymentResponse.razorpay_order_id,

              razorpay_payment_id: paymentResponse.razorpay_payment_id,

              razorpay_signature: paymentResponse.razorpay_signature,
            });

            console.log("Payment Verified:", verifyResponse.data);

            alert("Salary paid successfully!");

            // Refresh salary data
            await getStaffSalary(id);
            await getPaymentHistory(id);
          } catch (error) {
            console.log("Payment Verification Error:", error);

            alert(
              error.response?.data?.message || "Payment verification failed",
            );
          }
        },

        prefill: {
          name: `${staffData.FirstName} ${staffData.LastName}`,
          email: staffData.Email,
          contact: staffData.Phone,
        },
        config: {
          display: {
            blocks: {
              upi: {
                instruments: [
                  {
                    method: "upi",
                  },
                ],
              },
            },
          },
        },

        theme: {
          color: "#5B7F46",
        },

        modal: {
          ondismiss: function () {
            console.log("Payment popup closed");
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        console.log("Payment Failed:", response.error);

        alert(response.error.description || "Payment failed");
      });

      razorpay.open();
    } catch (error) {
      console.log("Create Order Error:", error);

      alert(error.response?.data?.message || "Unable to create payment order");
    }
  };

  const getPaymentHistory = async (staffId) => {
    try {
      const response = await api.get(`/salary/payment-history/${staffId}`);

      console.log("Payment History:", response.data);

      setPaymentHistory(response.data.payments || []);
    } catch (error) {
      console.log("Payment History Error:", error);
    }
  };

  const handleOpenUpdateSalary = () => {
    setSalaryAmount(
      staffData?.SalaryAmount !== null && staffData?.SalaryAmount !== undefined
        ? Number(staffData.SalaryAmount)
        : "",
    );

    setAllowance(
      staffData?.Allowance !== null && staffData?.Allowance !== undefined
        ? Number(staffData.Allowance)
        : "",
    );

    setDeduction(
      staffData?.Deduction !== null && staffData?.Deduction !== undefined
        ? Number(staffData.Deduction)
        : "",
    );

    setEffectiveFrom(staffData?.EffectiveFrom || "");

    setPaymentMethod(staffData?.PaymentMethod);
    setPaymentType(staffData?.PaymentType);

    setShowSalaryForm(true);
  };

  useEffect(() => {
    // getStaffById(id);
    getStaffSalary(id);
    getPaymentHistory(id);
  }, [id]);
  return (
    <section className="bg-[#F5F6FA] min-h-screen">
      <SchoolAdminDashboardLayout>
        <div className="max-w-6xl mx-auto px-4 lg:px-0 py-2 lg:py-0">
          {/* ============== Header ============== */}
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-7">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="h-11 w-11 rounded-xl cursor-pointer  flex items-center justify-center transition"
              >
                <ArrowLeft size={20} />
              </button>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  Staff Salary
                </h1>
                <p className="text-gray-500 mt-1 text-sm sm:text-base">
                  Salary summary and payment history for this staff member.
                </p>
              </div>
            </div>

            {/* {isSalaryAssigned ? (
              <button
                className="
      bg-[#5B7F46]
      hover:bg-[#49673A]
      text-white
      px-6
      py-2.5
      rounded-xl
      flex
      items-center
      gap-2
      text-sm
      font-semibold
      transition
      shadow
    "
              >
                <Pencil size={18} />
                Update Salary
              </button>
            ) : (
              <button
                onClick={() => setShowSalaryForm(true)}
                className="
    mt-7
    w-full
    sm:w-auto
    min-w-[220px]
    bg-[#5B7F46]
    hover:bg-[#49673A]
    text-white
    px-8
    py-3.5
    rounded-xl
    font-semibold
    flex
    items-center
    justify-center
    gap-2
    transition
    shadow-md
  "
              >
                <IndianRupee size={19} />
                Assign Salary
              </button>
            )} */}
          </div>

          {/* ============== Top: Profile + Net Salary ============== */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-6 mb-7">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* Profile */}
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-[#EEF5EA] flex items-center justify-center">
                  <User size={34} className="text-[#5B7F46]" />
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    {staffData?.FirstName} {staffData?.LastName}
                  </h2>
                  <p className="text-[#5B7F46] font-semibold text-sm mt-1">
                    {staffData?.Role}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {staffData?.Department} · {staffData?.School}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-2 text-xs sm:text-sm">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      ID: {staffData?.StaffId}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      Joined:{" "}
                      {new Date(staffData?.CreatedDate)
                        .toLocaleDateString("en-GB")
                        .replaceAll("/", "-")}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                      <BadgeCheck size={14} />
                      {staffData?.Status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Net salary summary */}
              <div className="rounded-2xl bg-gradient-to-r from-[#5B7F46] via-[#6D9454] to-[#84AE69] text-white px-5 py-4 sm:py-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide opacity-80">
                    Net Salary (Monthly)
                  </p>
                  <h3 className="text-3xl font-bold mt-2">
                    {staffData?.NetSalary}
                  </h3>
                  <p className="text-[11px] opacity-90 mt-1">
                    Effective from July 2026 · Bank Transfer
                  </p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Wallet size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* ============== Middle: Current Structure + Payroll Info ============== */}
          {isSalaryAssigned && !showSalaryForm ? (
            <>
              <div className="grid md:grid-cols-[1.3fr,1fr] gap-6 mb-7">
                {/* Salary structure */}
                <div className="bg-white rounded-3xl border border-gray-100 p-5 sm:p-6">
                  <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-4">
                    Current Salary Structure
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    {/* Basic */}
                    <div className="rounded-2xl border border-gray-300 bg-[#F9FAFB] p-4 flex justify-between items-center transition-all duration-300 hover:shadow-xl hover:border-[#5B7F46]/30 hover:-translate-y-1">
                      <div>
                        <p className="text-xs text-gray-500">Basic</p>
                        <h3 className="text-xl font-bold text-gray-800 mt-2">
                          ₹{Number(staffData?.SalaryAmount).toFixed(0)}{" "}
                        </h3>
                      </div>
                      <div className="h-10 w-10 rounded-2xl bg-[#EEF5EA] flex items-center justify-center">
                        <IndianRupee className="text-[#5B7F46]" size={20} />
                      </div>
                    </div>

                    {/* Allowance */}
                    <div className="rounded-2xl border border-gray-300 bg-white p-4 flex justify-between items-center transition-all duration-300 hover:shadow-xl hover:border-[#5B7F46] hover:-translate-y-1">
                      <div>
                        <p className="text-xs text-gray-500">Allowance</p>
                        <h3 className="text-xl font-bold text-[#5B7F46] mt-2">
                          ₹{Number(staffData?.Allowance).toFixed(0)}{" "}
                        </h3>
                      </div>
                      <div className="h-10 w-10 rounded-2xl bg-green-50 flex items-center justify-center">
                        <Wallet className="text-[#5B7F46]" size={20} />
                      </div>
                    </div>

                    {/* Deduction */}
                    <div className="rounded-2xl border border-gray-300 bg-white p-4 flex justify-between items-center transition-all duration-300 hover:shadow-xl hover:border-red-300 hover:-translate-y-1">
                      <div>
                        <p className="text-xs text-gray-500">Deduction</p>
                        <h3 className="text-xl font-bold text-red-500 mt-2">
                          ₹{Number(staffData?.Deduction).toFixed(0)}{" "}
                        </h3>
                      </div>
                      <div className="h-10 w-10 rounded-2xl bg-red-50 flex items-center justify-center">
                        <BadgeCheck className="text-red-500" size={20} />
                      </div>
                    </div>
                  </div>

                  {/* Simple breakdown footer */}
                  <div className="border-t border-gray-100 pt-3 mt-2 text-sm">
                    <div className="flex justify-between mb-1">
                      <span>Net Salary + Allowance − Deduction</span>

                      <span className="font-bold text-2xl text-[#5B7F46]">
                        ₹
                        {(
                          Number(staffData?.SalaryAmount || 0) +
                          Number(staffData?.Allowance || 0) -
                          Number(staffData?.Deduction || 0)
                        ).toLocaleString("en-IN", {
                          maximumFractionDigits: 0,
                        })}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 mt-1">
                      Any change here will affect upcoming transactions.
                    </p>
                  </div>
                </div>

                {/* Payroll info */}
                <div className="bg-white rounded-3xl border border-gray-100 p-5 sm:p-6">
                  <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-4">
                    Payroll Information
                  </h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Payment Type</span>
                      <span className="font-semibold text-gray-800">
                        Monthly
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Payment Method</span>
                      <span className="font-semibold text-gray-800">
                        Bank Transfer
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Currency</span>
                      <span className="font-semibold text-gray-800">
                        INR (₹)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Salary Status</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Assigned
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Effective From</span>
                      <span className="font-semibold text-gray-800">
                        July 2026
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mt-4 leading-6">
                    When you update salary, past transactions remain unchanged.
                    Only future transactions use the new structure.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-200 mt-8 overflow-hidden">

  {/* Header */}
  <div className="px-6 py-5 border-b border-gray-200">
    <div className="flex items-center justify-between">

      <div>
        <h2 className="text-xl font-bold text-gray-800">
          Payment History
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          View all salary payment transactions
        </p>
      </div>

      <div className="px-4 py-2 rounded-xl bg-[#F3F7F0]">
        <span className="text-sm font-semibold text-[#5B7F46]">
          {paymentHistory.length} Payments
        </span>
      </div>

    </div>
  </div>


  {/* No Payment History */}
  {paymentHistory.length === 0 ? (

    <div className="py-16 text-center">

      <div className="w-16 h-16 mx-auto rounded-2xl bg-[#F3F7F0] flex items-center justify-center">
        <IndianRupee
          size={26}
          className="text-[#5B7F46]"
        />
      </div>

      <h3 className="mt-4 text-lg font-semibold text-gray-700">
        No Payment History
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        Salary payments will appear here after successful payment.
      </p>

    </div>

  ) : (

    /* Payments Exist */
    <div className="p-5">

      {/* Search */}
      <div className="mb-5">
        <div className="relative w-full max-w-md">

          <Search
            size={20}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search salary month, amount or payment date..."
            className="
              w-full
              pl-12
              pr-4
              py-3
              rounded-xl
              border
              border-gray-200
              bg-white
              text-sm
              text-gray-700
              outline-none
              transition-all
              focus:border-[#5B7F46]
              focus:ring-4
              focus:ring-[#5B7F46]/10
            "
          />

        </div>
      </div>


      {/* Search Result */}
      {filteredPayments.length === 0 ? (

        <div className="py-16 text-center">

          <div
            className="
              w-16
              h-16
              mx-auto
              rounded-2xl
              bg-[#F3F7F0]
              flex
              items-center
              justify-center
            "
          >
            <Search
              size={26}
              className="text-[#5B7F46]"
            />
          </div>

          <h3 className="mt-4 text-lg font-semibold text-gray-700">
            Data not found
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            No payment records match your search.
          </p>

        </div>

      ) : (

        /* Table */
        <div className="overflow-x-auto">

          <table className="w-full border-separate border-spacing-y-3">

            {/* Header */}
            <thead>
              <tr>

                <th className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase">
                  #
                </th>

                <th className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase">
                  Salary Month
                </th>

                <th className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase">
                  Amount
                </th>

                <th className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase">
                  Payment Date
                </th>

                <th className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase">
                  Status
                </th>

                <th className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase">
                  Transaction ID
                </th>

              </tr>
            </thead>


            {/* Body */}
            <tbody>

              {filteredPayments.map((payment, index) => (

                <tr
                  key={payment.SalaryPaymentId}
                  className="
                    group
                    bg-gray-50
                    hover:bg-[#F5F9F3]
                    transition
                  "
                >

                  {/* Number */}
                  <td className="px-5 py-4 rounded-l-xl">

                    <div
                      className="
                        w-8
                        h-8
                        rounded-lg
                        bg-white
                        border
                        border-gray-200
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <span className="text-sm font-semibold text-gray-600">
                        {startIndex + index + 1}
                      </span>
                    </div>

                  </td>


                  {/* Salary Month */}
                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          w-10
                          h-10
                          rounded-xl
                          bg-[#EAF0E6]
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <IndianRupee
                          size={18}
                          className="text-[#5B7F46]"
                        />
                      </div>

                      <div>

                        <p className="font-semibold text-gray-800">

                          {payment.SalaryMonth
                            ? new Date(
                                payment.SalaryMonth
                              ).toLocaleDateString(
                                "en-IN",
                                {
                                  month: "long",
                                  year: "numeric",
                                }
                              )
                            : "-"
                          }

                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          Monthly Salary
                        </p>

                      </div>

                    </div>

                  </td>


                  {/* Amount */}
                  <td className="px-5 py-4">

                    <p className="font-bold text-gray-800">
                      ₹
                      {Number(
                        payment.Amount
                      ).toLocaleString("en-IN")}
                    </p>

                  </td>


                  {/* Payment Date */}
                  <td className="px-5 py-4">

                    <div>

                      <p className="text-sm font-semibold text-gray-700">

                        {new Date(
                          payment.PaymentDate
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}

                      </p>

                      <p className="text-xs text-gray-400 mt-1">

                        {new Date(
                          payment.PaymentDate
                        ).toLocaleTimeString(
                          "en-IN",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}

                      </p>

                    </div>

                  </td>


                  {/* Status */}
                  <td className="px-5 py-4">

                    {payment.PaymentStatus === "Paid" ? (

                      <span
                        className="
                          inline-flex
                          items-center
                          gap-2
                          px-3
                          py-1.5
                          rounded-full
                          bg-green-100
                          text-green-700
                          text-xs
                          font-semibold
                        "
                      >
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        Paid
                      </span>

                    ) : (

                      <span
                        className="
                          inline-flex
                          items-center
                          gap-2
                          px-3
                          py-1.5
                          rounded-full
                          bg-red-100
                          text-red-700
                          text-xs
                          font-semibold
                        "
                      >
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>

                        {payment.PaymentStatus}

                      </span>

                    )}

                  </td>


                  {/* Transaction ID */}
                  <td className="px-5 py-4 rounded-r-xl">

                    <div className="flex items-center gap-2">

                      <div className="min-w-0">

                        <p
                          className="
                            text-xs
                            font-mono
                            font-semibold
                            text-gray-600
                            truncate
                            max-w-[170px]
                          "
                          title={payment.RazorpayPaymentId}
                        >
                          {payment.RazorpayPaymentId}
                        </p>

                        <p className="text-[11px] text-gray-400 mt-1">
                          Razorpay Transaction
                        </p>

                      </div>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>


          {/* Pagination */}
          {filteredPayments.length > 0 && (

            <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4">

              {/* Records Information */}
              <p className="text-sm text-gray-500">

                Showing{" "}

                <span className="font-semibold text-gray-700">
                  {startIndex + 1}
                </span>

                {" "}to{" "}

                <span className="font-semibold text-gray-700">
                  {Math.min(
                    startIndex + recordsPerPage,
                    filteredPayments.length
                  )}
                </span>

                {" "}of{" "}

                <span className="font-semibold text-gray-700">
                  {filteredPayments.length}
                </span>

                {" "}payments

              </p>


              {/* Pagination Buttons */}
              <div className="flex items-center gap-2">

                {/* Previous */}
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.max(prev - 1, 1)
                    )
                  }
                  disabled={currentPage === 1}
                  className="
                    px-4
                    py-2
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    text-sm
                    font-semibold
                    text-gray-600
                    transition-all
                    duration-200
                    hover:bg-[#F3F8F1]
                    hover:text-[#5B7F46]
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                  "
                >
                  Previous
                </button>


                {/* Page Numbers */}
                <div className="flex items-center gap-1">

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (

                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`
                        w-9
                        h-9
                        
                        rounded-xl
                        text-sm
                        font-semibold
                        transition-all
                        duration-200

                        ${
                          currentPage === page
                            ? "bg-[#5B7F46] text-white shadow-sm"
                            : "bg-white text-gray-600 hover:bg-[#F3F8F1] hover:text-[#5B7F46]"
                        }
                      `}
                    >
                      {page}
                    </button>

                  ))}

                </div>


                {/* Next */}
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(
                        prev + 1,
                        totalPages
                      )
                    )
                  }
                  disabled={currentPage === totalPages}
                  className="
                    px-4
                    py-2
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    text-sm
                    font-semibold
                    text-gray-600
                    transition-all
                    duration-200
                    hover:bg-[#F3F8F1]
                    hover:text-[#5B7F46]
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                  "
                >
                  Next
                </button>

              </div>

            </div>

          )}

        </div>

      )}

    </div>

  )}

</div>

              <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
                {/* Back Button */}
                <button
                  onClick={() => navigate(-1)}
                  className="border border-[#5B7F46] text-[#5B7F46] hover:bg-[#EEF5EA] px-8 py-3 rounded-xl font-semibold text-sm transition cursor-pointer"
                >
                  Back
                </button>

                {/* Update Salary */}
                <button
                  onClick={handleOpenUpdateSalary}
                  className="bg-[#5B7F46] hover:bg-[#49673A] text-white px-8 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Pencil size={18} />
                  Update Salary
                </button>

                {/* Pay Salary */}
                <button
                  onClick={handlePaySalary}
                  className="bg-[#5B7F46] hover:bg-[#49673A] text-white px-8 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <IndianRupee size={18} />
                  Pay Salary
                </button>

                {/* Salary Paid State */}
                {/* <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-[#EEF7EA] border border-[#CFE3C7]">

      
      <div className="w-9 h-9 rounded-full bg-[#5B7F46] flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>

      
      <div>
        <p className="text-sm font-bold text-[#49673A]">
          Salary Paid
        </p>

        <p className="text-xs text-[#6B8063]">
          Payment completed successfully
        </p>
      </div>

    </div> */}
              </div>
            </>
          ) : (
            <>
              {!isSalaryAssigned && !showSalaryForm ? (
                <>
                  <div
                    className="
    bg-white
    rounded-3xl
    border
    border-gray-100
    shadow-sm
    p-8
    sm:p-12
    mb-7
  "
                  >
                    <div
                      className="
      max-w-xl
      mx-auto
      flex
      flex-col
      items-center
      text-center
    "
                    >
                      {/* Icon */}

                      <div
                        className="
        h-24
        w-24
        rounded-full
        bg-[#EEF5EA]
        flex
        items-center
        justify-center
        mb-6
      "
                      >
                        <IndianRupee size={42} className="text-[#5B7F46]" />
                      </div>

                      {/* Title */}

                      <h2
                        className="
        text-2xl
        sm:text-3xl
        font-bold
        text-gray-800
      "
                      >
                        Salary Not Assigned
                      </h2>

                      {/* Description */}

                      <p
                        className="
        text-sm
        sm:text-base
        text-gray-500
        mt-3
        leading-7
      "
                      >
                        No salary has been assigned to{" "}
                        <span className="font-semibold text-gray-700">
                          {staffData.FirstName} {staffData.Last}
                        </span>{" "}
                        yet.
                      </p>

                      {/* Staff Info */}

                      <div
                        className="
        mt-6
        w-full
        max-w-md
        bg-[#F8FAF7]
        rounded-2xl
        p-5
        text-left
      "
                      >
                        <div className="flex justify-between mb-3">
                          <span className="text-sm text-gray-500">
                            Staff ID
                          </span>

                          <span className="text-sm font-semibold text-gray-800">
                            #{staffData.StaffId}
                          </span>
                        </div>

                        <div className="flex justify-between mb-3">
                          <span className="text-sm text-gray-500">Role</span>

                          <span className="text-sm font-semibold text-gray-800">
                            {staffData.Role}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">
                            Department
                          </span>

                          <span className="text-sm font-semibold text-gray-800">
                            {staffData.Department}
                          </span>
                        </div>
                      </div>

                      {/* Assign Button */}

                      <button
                        onClick={() => setShowSalaryForm(true)}
                        className="
    mt-7
    w-full
    sm:w-auto
    min-w-[220px]
    bg-[#5B7F46]
    hover:bg-[#49673A]
    text-white
    px-8
    py-3.5
    rounded-xl
    font-semibold
    flex
    items-center
    justify-center
    gap-2
    transition
    shadow-md
  "
                      >
                        <IndianRupee size={19} />
                        Assign Salary
                      </button>

                      <p
                        className="
        text-xs
        text-gray-400
        mt-4
      "
                      >
                        Set the basic salary, allowance and deduction for this
                        staff member.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
                    <div className="mb-7">
                      <h2 className="text-2xl font-bold text-gray-800">
                        {isSalaryAssigned ? "Update Salary" : "Assign Salary"}
                      </h2>

                      <p className="text-sm text-gray-500 mt-1">
                        {isSalaryAssigned
                          ? "Update the salary structure for"
                          : "Set the salary structure for"}{" "}
                        <span className="font-semibold text-gray-700">
                          {staffData?.FirstName} {staffData?.LastName}
                        </span>
                      </p>
                    </div>

                    {/* Salary Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {/* Basic Salary */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Basic Salary
                        </label>

                        <div className="relative">
                          <IndianRupee
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          />

                          <input
                            type="number"
                            value={salaryAmount}
                            onChange={(e) => setSalaryAmount(e.target.value)}
                            placeholder="Enter basic salary"
                            className="
            w-full
            border border-gray-300
            rounded-xl
            pl-10
            pr-4
            py-3
            outline-none
            focus:border-[#5B7F46]
            focus:ring-2
            focus:ring-[#5B7F46]/20
          "
                          />
                        </div>
                      </div>

                      {/* Allowance */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Allowance
                        </label>

                        <div className="relative">
                          <IndianRupee
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          />

                          <input
                            type="number"
                            value={allowance}
                            onChange={(e) => setAllowance(e.target.value)}
                            placeholder="Enter allowance"
                            className="
            w-full
            border border-gray-300
            rounded-xl
            pl-10
            pr-4
            py-3
            outline-none
            focus:border-[#5B7F46]
            focus:ring-2
            focus:ring-[#5B7F46]/20
          "
                          />
                        </div>
                      </div>

                      {/* Deduction */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Deduction
                        </label>

                        <div className="relative">
                          <IndianRupee
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          />

                          <input
                            type="number"
                            value={deduction}
                            onChange={(e) => setDeduction(e.target.value)}
                            placeholder="Enter deduction"
                            className="
            w-full
            border border-gray-300
            rounded-xl
            pl-10
            pr-4
            py-3
            outline-none
            focus:border-[#5B7F46]
            focus:ring-2
            focus:ring-[#5B7F46]/20
          "
                          />
                        </div>
                      </div>
                    </div>

                    {/* Net Salary */}
                    <div
                      className="
    mt-7
    bg-[#EEF5EA]
    border border-[#D9E8D1]
    rounded-2xl
    p-5
    flex
    flex-col
    sm:flex-row
    sm:items-center
    sm:justify-between
    gap-3
  "
                    >
                      <div>
                        <p className="text-sm text-gray-500">
                          Net Monthly Salary
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          Basic + Allowance − Deduction
                        </p>
                      </div>

                      <p className="text-3xl font-bold text-[#5B7F46]">
                        ₹{netSalary.toLocaleString("en-IN")}
                      </p>
                    </div>

                    {/* Payroll Information */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-7">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Payment Type
                        </label>

                        <select
                          onChange={(e) => setPaymentType(e.target.value)}
                          value={paymentType}
                          className="
          w-full
          border border-gray-300
          rounded-xl
          px-4
          py-3
          outline-none
          focus:border-[#5B7F46]
        "
                        >
                          <option>Monthly</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Payment Method
                        </label>

                        <select
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          value={paymentMethod}
                          className="
          w-full
          border border-gray-300
          rounded-xl
          px-4
          py-3
          outline-none
          focus:border-[#5B7F46]
        "
                        >
                          <option>Bank Transfer</option>
                          <option>UPI</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Effective From
                        </label>

                        <DatePicker
                          selected={effectiveFrom}
                          onChange={(date) => setEffectiveFrom(date)}
                          dateFormat="MMMM yyyy"
                          showMonthYearPicker
                          placeholderText="Select effective month"
                          className="
      w-full
      border border-gray-300
      rounded-xl
      px-4
      py-3
      text-gray-700
      outline-none
      transition
      focus:border-[#5B7F46]
    "
                        />
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 mt-8">
                      <button
                        onClick={() => setShowSalaryForm(false)}
                        className="
        px-6
        py-3
        rounded-xl
        border
        border-gray-300
        text-gray-600
        font-semibold
        hover:bg-gray-50
      "
                      >
                        Cancel
                      </button>

                      <button
                        onClick={
                          isSalaryAssigned
                            ? handleUpdateSalary
                            : handleAssignSalary
                        }
                        className="
    px-6
    py-3
    rounded-xl
    bg-[#5B7F46]
    hover:bg-[#49673A]
    text-white
    font-semibold
    flex
    items-center
    gap-2
  "
                      >
                        {isSalaryAssigned ? (
                          <>
                            <Pencil size={18} />
                            Update Salary
                          </>
                        ) : (
                          <>
                            <IndianRupee size={18} />
                            Assign Salary
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </SchoolAdminDashboardLayout>
    </section>
  );
}

export default StaffSalary;
