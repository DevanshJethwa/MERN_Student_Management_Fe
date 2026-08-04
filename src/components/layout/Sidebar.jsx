import React, { useState } from "react";
import { Power, ChevronDown, ChevronRight, ChevronUp } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Sidebar({
  mobile = false,
  closeSidebar,
  menuItems,
  onLogout,
  logo,
}) {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);


  return (
    <aside
      className={`
        w-72
        bg-white
        border-r
        border-gray-200
        h-screen
        flex
        flex-col
        fixed
        top-0
        left-0
        z-50
        shadow-sm
        ${mobile ? "" : "hidden lg:flex"}
      `}
    >
      {/* Logo */}
      <div className="px-8 pt-7 border-b border-gray-100">
        {logo}
      </div>

      {/* Menu */}
<nav className="flex-1 px-4 py-2 overflow-y-auto no-scrollbar">
          {menuItems.map((item) => {
const isChildActive = item.children?.some((child) =>
  location.pathname.startsWith(child.path)
);

const isActive =
  location.pathname.startsWith(item.path) || isChildActive;
    const isMenuOpen = openMenu === item.name || isChildActive;

  if (item.children) {
    return (
      <div key={item.name}>
        {/* Parent menu */}
        <button
          type="button"
          onClick={() =>
            setOpenMenu((prev) => (prev === item.name ? null : item.name))
          }
          className={`
            w-full flex items-center justify-between
            px-5 py-4 mb-2 rounded-2xl
            transition-all duration-200 group
            ${
              isActive
                ? "text-[#5B7F46] font-semibold bg-[#bbd2ae]"
                : "text-gray-600 hover:bg-gray-50 hover:text-[#5B7F46]"
            }
          `}
        >
          <div className="flex items-center gap-4">
            <item.icon size={22} />
            <span>{item.name}</span>
          </div>

          <ChevronDown
  size={18}
  className={`transition-transform duration-300 ${
    isMenuOpen ? "rotate-180" : ""
  }`}
/>
        </button>

        {/* Submenu */}
        <div
  className={`overflow-hidden transition-all duration-300 ${
    isMenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
  }`}
>
          {item.children.map((child) => (
            <Link
              key={child.name}
              to={child.path}
              className="flex items-center gap-3 px-10 py-3"
            >
              <child.icon size={18} />
              {child.name}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Normal menu
  return (
    <Link
      key={item.name}
      to={item.path}
      onClick={() => closeSidebar?.()}
      className={`
        flex items-center gap-4
        px-5 py-4 mb-2 rounded-2xl
        ${
          isActive
            ? "text-[#5B7F46] font-semibold bg-[#bbd2ae]"
            : "text-gray-600 hover:bg-gray-50 hover:text-[#5B7F46]"
        }
      `}
    >
      <item.icon size={22} />
      <span>{item.name}</span>
    </Link>
  );
})}
      </nav>

      {/* Logout */}
      <div className="p-6">
        <button
          onClick={onLogout}
          className="
            w-28
            flex
            items-center
            justify-center
            gap-3
            py-4
            rounded-2xl
            bg-[#F3F8F1]
            text-[#5B7F46]
            font-semibold
            transition-all
            hover:bg-red-50
            hover:text-red-500
          "
        >
          <Power size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;