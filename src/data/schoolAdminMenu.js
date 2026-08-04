import {
  LayoutDashboard,
  GraduationCap,
  Users,
  ClipboardCheck,
  School,
  Settings,
  UserPlus,
  IndianRupee,
} from "lucide-react";

export const schoolAdminMenu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/school-admin/dashboard",
  },
  {
  name: "School Staff",
  icon: Users,
  children: [
    {
      name: "Staff List",
      icon: Users,
      path: "/school-admin/staff",
    },
    {
      name: "Add Staff",
      icon: UserPlus,
      path: "/school-admin/staff/add",
    },
  ],
},
  // {
  //   name: "Staff Salary",
  //   icon: IndianRupee,
  //   path: "/school-admin/salary",
  // },
  {
    name: "Students",
    icon: GraduationCap,
    path: "/school-admin/students",
  },
  {
    name: "Teachers",
    icon: Users,
    path: "/school-admin/teachers",
  },
  {
    name: "Attendance",
    icon: ClipboardCheck,
    path: "/school-admin/attendance",
  },
  {
    name: "Classes",
    icon: School,
    path: "/school-admin/classes",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/school-admin/settings",
  },
];