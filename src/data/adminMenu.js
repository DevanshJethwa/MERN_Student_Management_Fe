import {
  LayoutDashboard,
  School,
  Users,
  Settings,
} from "lucide-react";

export const adminMenu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    name: "Schools",
    icon: School,
    path: "/admin/schools",
  },
  {
    name: "Staff",
    icon: Users,
    path: "/admin/staff",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
];