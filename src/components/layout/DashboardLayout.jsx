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
    <div className="w-full flex-1 min-h-0">

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
      <div className="lg:ml-64 flex-1 min-h-0 flex flex-col">

        <Navbar
          setMobileOpen={setMobileOpen}
          title={title}
          HeaderIcon={HeaderIcon}
          initial={initial}
          name={name}
          email={email}
          onLogout={onLogout}
        />

        {/* Page Content */}
        <main
          className="
            flex-1
            ps-3
            sm:ps-6
            md:ps-10
            lg:ps-16
            p-3
            sm:p-4
            md:p-6
            lg:p-6
            pb-10
          "
        >
          {children}
        </main>

      </div>
    </div>
  );
}

export default DashboardLayout;