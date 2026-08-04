import { useEffect, useState } from "react";
import AdminDashboardLayout from "../../components/layout/SuperAdmin/AdminDashboardLayout";
import api from "../../api/api";
import SchoolAdminDashboardLayout from "../../components/layout/SchoolAdmin/SchoolAdminDashboardLayout";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

const AddStaff = () => {
  const navigate = useNavigate();
  const [roles, setroles] = useState([]);
  const [roleId, setRoleId] = useState("");

  const [departments, setdepartments] = useState([]);
  const [departmentId, setdepartmentId] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [school, setSchool] = useState("");

  const [schools, setSchools] = useState([]);

  const [errors, setErrors] = useState({});

  const getRoles = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/getRoles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setroles(response.data.data);
        // console.log(response.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getdepartments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/department/getDepartment", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setdepartments(response.data.Departments);
        // console.log(response.data.Departments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSchools = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("school/getSchool", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setSchools(response.data.data);
        // console.log(response.data.Departments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoles();
    getdepartments();
    getSchools();
  }, []);

  const validate = () => {
    let newErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = "Enter first name";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Enter last name";
    }

    if (!email.trim()) {
      newErrors.email = "Enter email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!phone.trim()) {
      newErrors.phone = "Enter phone number";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Enter valid phone number";
    }

    if (!role) {
      newErrors.role = "Select role";
    }

    if (!department) {
      newErrors.department = "Select department";
    }

    if (!password) {
      newErrors.password = "Enter password";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!school) {
      newErrors.school = "Select school";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const addStaff = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!validate()) return;

      console.log(firstName);
      console.log(lastName);
      console.log(email);
      console.log(phone);
      console.log(role);
      console.log(department);
      console.log(password);
      console.log(confirmPassword);
      console.log(school);

      const response = await api.post(
        "/staff/addStaff",
        {
          schoolid: school,
          roleid: role,
          firstname: firstName,
          lastname: lastName,
          email,
          phone,
          password,
          departmentid: department,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/school-admin/staff");
        resetForm();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setRole("");
    setDepartment("");
    setSchool("");
    setPassword("");
    setConfirmPassword("");

    setErrors({});
  };

  const { id } = useParams();

  const isEdit = !!id;

  // const getStaffById = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     console.log("Id : ", id);

  //     const response = await api.get(`/staff/getStaffById/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     const staff = response.data.Staff[0];

  //     console.log("Staff By id : ", response.data.Staff);

  //     setFirstName(staff.FirstName || "");
  //     setLastName(staff.LastName || "");
  //     setEmail(staff.Email || "");
  //     setPhone(staff.Phone || "");
  //     setRole(staff.RoleId || "");
  //     setDepartment(staff.DepartmentId || "");
  //     setSchool(staff.SchoolId || "");
  //     setPassword(staff.Password || "");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  const getStaffById = async () => {
  try {
    const token = localStorage.getItem("token");

    console.log("Id:", id);

    const response = await api.get(`/staff/getStaffById/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const staff = response.data.Staff[0];

    console.log("Staff By id:", staff);

    // Find Role ID from Role Name
    const selectedRole = roles.find(
      (item) => item.RoleName === staff.Role
    );

    // Find Department ID from Department Name
    const selectedDepartment = departments.find(
      (item) => item.DepartmentName === staff.Department
    );

    setFirstName(staff.FirstName || "");
    setLastName(staff.LastName || "");
    setEmail(staff.Email || "");
    setPhone(staff.Phone || "");

    // Set IDs because select option values are IDs
    setRole(String(selectedRole?.RoleId || ""));
    setDepartment(String(selectedDepartment?.DepartmentId || ""));
    setSchool(String(staff.SchoolId || ""));

    
  } catch (error) {
    console.log(error);
  }
};

  const editStaff = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.put(
        `/staff/updateStaff/${id}`,
        {
          schoolid: school,
          roleid: role,
          firstname: firstName,
          lastname: lastName,
          email:email,
          phone:phone,
          departmentid: department,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if(response.status === 200){
        toast.success(response.data.message);
        navigate("/school-admin/staff");
        resetForm();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getStaffById();
    }else {
    resetForm();
  }
  }, [id]);


  useEffect(() => {
  if (id && roles.length > 0 && departments.length > 0) {
    getStaffById();
  }

  if (!id) {
    resetForm();
  }
}, [id, roles, departments]);

  return (
    <section className="bg-[#E9E9E9] min-h-screen">
      <SchoolAdminDashboardLayout>
        {/* Header */}

        <div className="flex items-start gap-5  mb-8">
          <button
            className="px-2 py-2   cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft />
          </button>
          <div>
            {isEdit ? (
              <h1 className="text-3xl font-bold text-gray-800">Edit Staff</h1>
            ) : (
              <h1 className="text-3xl font-bold text-gray-800">Add Staff</h1>
            )}

            {isEdit ? (
              <p className="text-gray-500 mt-1">Edit Staff Information</p>
            ) : (
              <p className="text-gray-500 mt-1">
                Create a new staff member for your school.
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-md p-8">
          {/* Personal Information */}

          <h2 className="text-lg font-semibold text-[#5B7F46] mb-5">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700">
                First Name
              </label>

              <input
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    firstName: "",
                  }));
                }}
                placeholder="Enter first name"
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:border-[#5B7F46]"
              />

              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Last Name
              </label>

              <input
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    lastName: "",
                  }));
                }}
                placeholder="Enter last name"
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3"
              />

              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>

              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    email: "",
                  }));
                }}
                placeholder="Enter email"
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3"
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 ">Phone</label>

              <input
                type="text"
                value={phone}
                maxLength={10}
                onChange={(e) => {
                  setPhone(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    phone: "",
                  }));
                }}
                placeholder="Enter phone"
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3"
              />

              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Divider */}

          {/* <div className="border-t my-8"></div> */}

          {/* Organization */}

          <h2 className="text-lg font-semibold text-[#5B7F46] mb-4 mt-8">
            Organization Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                School
              </label>

              <select
                value={school}
                onChange={(e) => {
                  setSchool(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    school: "",
                  }));
                }}
                className="
      w-full
      rounded-xl
      border
      border-gray-300
      px-4
      py-3
      bg-white
      text-gray-700
      focus:outline-none
      focus:border-[#5B7F46]
      focus:ring-2
      focus:ring-[#5B7F46]/20
    "
              >
                <option value="">Select School</option>

                {schools.map((school) => (
                  <option key={school.SchoolId} value={school.SchoolId}>
                    {school.SchoolName}
                  </option>
                ))}
              </select>

              {errors.school && (
                <p className="text-red-500 text-sm mt-1">{errors.school}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>

              <select
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    role: "",
                  }));
                }}
                className="w-full rounded-xl border border-gray-300 px-4 py-3"
              >
                <option value="">Select Role</option>

                {roles
                  .filter((role) => ![1, 2].includes(role.RoleId))
                  .map((role) => (
                    <option key={role.RoleId} value={role.RoleId}>
                      {role.RoleName}
                    </option>
                  ))}
              </select>

              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Department
              </label>

              <select
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    department: "",
                  }));
                }}
                className="w-full rounded-xl border border-gray-300 px-4 py-3"
              >
                <option value="">Select Department</option>

                {departments.map((department) => (
                  <option
                    key={department.DepartmentId}
                    value={department.DepartmentId}
                  >
                    {department.DepartmentName}
                  </option>
                ))}
              </select>

              {errors.department && (
                <p className="text-red-500 text-sm mt-1">{errors.department}</p>
              )}
            </div>
          </div>

          {/* <div className="mt-6">
            <label className="text-sm font-medium text-gray-700 block mb-3">
              Status
            </label>

            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input type="radio" name="status" />
                Active
              </label>

              <label className="flex items-center gap-2">
                <input type="radio" name="status" />
                Inactive
              </label>
            </div>
          </div> */}

          {/* <div className="border-t my-8"></div> */}

          {/* Security */}

          {!isEdit && (
  <>
    <h2 className="text-lg font-semibold text-[#5B7F46] mb-4 mt-8">
      Security
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Password */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Password
        </label>

        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);

            setErrors((prev) => ({
              ...prev,
              password: "",
            }));
          }}
          placeholder="Enter password"
          className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3"
        />

        {errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Confirm Password
        </label>

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);

            setErrors((prev) => ({
              ...prev,
              confirmPassword: "",
            }));
          }}
          placeholder="Confirm password"
          className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3"
        />

        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword}
          </p>
        )}
      </div>
    </div>
  </>
)}
          {/* Buttons */}

          <div className="flex justify-end gap-4 mt-10">
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 transition"
            >
              Reset
            </button>

            {isEdit ? (
              <button
                onClick={editStaff}
                className="px-8 py-3 rounded-xl bg-[#5B7F46] text-white hover:bg-[#4A6938] transition"
              >
                Edit Staff
              </button>
            ) : (
              <button
                onClick={addStaff}
                className="px-8 py-3 rounded-xl bg-[#5B7F46] text-white hover:bg-[#4A6938] transition"
              >
                Create Staff
              </button>
            )}
          </div>
        </div>
      </SchoolAdminDashboardLayout>
    </section>
  );
};

export default AddStaff;
