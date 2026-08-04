import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout({
  children,
  menuItems,
  logo,
  title,
  HeaderIcon,
  initial,
  name,
  email,
  onLogout,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="bg-[#e0e0e0] min-h-screen">
      {/* Desktop Sidebar */}
      <Sidebar
        menuItems={menuItems}
        logo={logo}
        onLogout={onLogout}
      />

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />

          {/* Sidebar */}
          <Sidebar
            mobile
            closeSidebar={() => setMobileOpen(false)}
            menuItems={menuItems}
            logo={logo}
            onLogout={onLogout}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="lg:ml-64">
        <Navbar
          setMobileOpen={setMobileOpen}
          title={title}
          HeaderIcon={HeaderIcon}
          initial={initial}
          name={name}
          email={email}
          onLogout={onLogout}
        />

<main className="ps-3 sm:ps-6 md:ps-10 lg:ps-16 p-3  sm:p-4 md:p-6 lg:p-6 ">
  {children}
</main>      </div>
    </div>
  );
}

export default DashboardLayout;