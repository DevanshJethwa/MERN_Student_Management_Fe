# 🏫 School Management System (Frontend)

[![React](https://img.shields.io/badge/React-19.x-blue.svg?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF.svg?logo=vite&logoColor=white)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4.svg?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-SDK_Integrated-brightgreen.svg?logo=razorpay&logoColor=white)](https://razorpay.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A premium, production-ready frontend for a modern multi-tenant **School Management System** (MERN stack ecosystem). Built using **React 19**, **Vite 8**, and the latest **Tailwind CSS v4.0** utility framework. It provides a secure, role-based administration portal featuring detailed analytics, staff/school directory management, automated JWT token handling, and an integrated **Razorpay** checkout system for seamless staff salary disbursements.

---

## 🚀 Key Features

### 🔑 1. Role-Based Access Control (RBAC) & Router Protection
- **Dynamic Routing**: Managed via [AppRoutes.jsx](file:///c:/Excelsion_work/School_Management/frontend/src/routes/AppRoutes.jsx) using `react-router-dom`.
- **Protected Layouts**:
  - `ProtectedRoute` (`roleId === "1"`): Restricts access to Super Admin pages.
  - `ProtectedRoute` (`roleId === "2"`): Restricts access to School Admin pages.
  - `PublicRoute`: Restricts logged-in users from accessing the login page.
- **Auto-Refresh JWT System**: In [App.jsx](file:///c:/Excelsion_work/School_Management/frontend/src/App.jsx), a background scheduler triggers token refresh via [authService.js](file:///c:/Excelsion_work/School_Management/frontend/src/services/authService.js) every 2 minutes, ensuring seamless session persistence without manual re-logins.

### 🛡️ 2. Super Admin Portal (`Role 1`)
- **Dashboard**: [AdminDashboard.jsx](file:///c:/Excelsion_work/School_Management/frontend/src/pages/SuperAdmin/AdminDashboard.jsx) aggregates system-wide statistics across all registered schools.
- **School Management**: [AdminSchools.jsx](file:///c:/Excelsion_work/School_Management/frontend/src/pages/SuperAdmin/AdminSchools.jsx) handles registering new schools, editing school metadata, and viewing tenant statuses.
- **Global Staff Overview**: [AdminStaff.jsx](file:///c:/Excelsion_work/School_Management/frontend/src/pages/SuperAdmin/AdminStaff.jsx) registers and oversees administrators and educators globally.

### 🏫 3. School Admin Portal (`Role 2`)
- **School Dashboard**: [SchoolAdminDashboard.jsx](file:///c:/Excelsion_work/School_Management/frontend/src/pages/SchoolAdmin/SchoolAdminDashboard.jsx) displays specific analytics for the current school tenant.
- **Staff Directory Management**:
  - Add or modify staff members dynamically via [AddStaff.jsx](file:///c:/Excelsion_work/School_Management/frontend/src/pages/SchoolAdmin/AddStaff.jsx).
  - Search, filter, and paginate through staff using the interactive list in [SchoolAdmin_Staff.jsx](file:///c:/Excelsion_work/School_Management/frontend/src/pages/SchoolAdmin/SchoolAdmin_Staff.jsx).
- **Payroll & Salary Payments (Razorpay SDK)**:
  - Manage employee base pay, track transaction histories, and release salary payouts in [StaffSalary.jsx](file:///c:/Excelsion_work/School_Management/frontend/src/pages/SchoolAdmin/StaffSalary.jsx).
  - Fully integrated with the **Razorpay Web Checkout API** loaded inside [index.html](file:///c:/Excelsion_work/School_Management/frontend/index.html).

### 🎨 4. Premium UI/UX & Responsive Layouts
- **Responsive Layout Engine**: Uses [DashboardLayout.jsx](file:///c:/Excelsion_work/School_Management/frontend/src/components/layout/DashboardLayout.jsx), featuring a mobile-responsive sliding sidebar [Sidebar.jsx](file:///c:/Excelsion_work/School_Management/frontend/src/components/layout/Sidebar.jsx) and dynamic [Navbar.jsx](file:///c:/Excelsion_work/School_Management/frontend/src/components/layout/Navbar.jsx).
- **Custom Aesthetic Palette**: The Tailwind configuration in [vite.config.js](file:///c:/Excelsion_work/School_Management/frontend/vite.config.js) extends specific educational brand colors:
  - `primary`: `#5B7F46` (Forest Sage Green)
  - `secondary`: `#E6E9DD` (Light Herb Green)
  - `background`: `#F4F1EA` (Warm Alabaster)
  - `text`: `#1F2D1B` (Dark Obsidian Green)
  - `muted`: `#66736A` (Muted Olive Slate)
- **User Notifications**: Toast-based notifications managed using `react-toastify`.
- **Interactivity**: Micro-interactions, custom transition zooms, hover states, and dynamic status indicators.

---

## 📂 Project Architecture

Below is the structured layout of the project, including file links for quick code navigation:

```text
frontend/
├── .env                              # Active environment configuration
├── .env.example                      # Template for public distribution
├── index.html                        # Root HTML & external scripts (Razorpay SDK)
├── package.json                      # Build scripts and project dependencies
├── vite.config.js                    # Vite bundler & Tailwind v4 theme configurations
├── eslint.config.js                  # Code quality & styling standard configurations
└── src/
    ├── main.jsx                      # Application entry point
    ├── App.jsx                       # Core wrapper, global state & Token refresh hook
    ├── App.css                       # App-wide global custom styles
    ├── index.css                     # Tailwind CSS base/utilities entry
    ├── theme.js                      # Centralized design tokens and utility functions
    ├── api/
    │   └── api.js                    # Axios API client with automatic JWT request interceptor
    ├── services/
    │   └── authService.js            # JWT access/refresh token handlers
    ├── routes/
    │   └── AppRoutes.jsx             # React Router routing configuration & guards
    ├── data/
    │   ├── adminMenu.js              # Menu items definition for Super Admin
    │   └── schoolAdminMenu.js        # Menu items definition for School Admin
    ├── components/
    │   ├── ProtectedRoute.jsx        # RBAC router guard for authenticated users
    │   ├── PublicRoute.jsx           # Guest router guard for authentication flow
    │   ├── layout/
    │   │   ├── DashboardLayout.jsx   # Generic layout container for dashboards
    │   │   ├── Navbar.jsx            # Top bar including mobile triggers & profile controls
    │   │   ├── Sidebar.jsx           # Vertical collapsible sidebar with nested lists
    │   │   ├── SuperAdmin/
    │   │   │   └── AdminDashboardLayout.jsx
    │   │   └── SchoolAdmin/
    │   │       └── SchoolAdminDashboardLayout.jsx
    │   └── ui/
    │       └── StatCard.jsx          # Reusable visualization metric card
    └── pages/
        ├── Login.jsx                 # Dynamic multi-tenant secure login page
        ├── SuperAdmin/
        │   ├── AdminDashboard.jsx    # Super Admin metric panels
        │   ├── AdminSchools.jsx      # Tenant/School registry and controllers
        │   └── AdminStaff.jsx        # Cross-tenant admin staff administration
        └── SchoolAdmin/
            ├── SchoolAdminDashboard.jsx
            ├── AddStaff.jsx          # Creation/Modification form for staff
            ├── SchoolAdmin_Staff.jsx # Tabular, paginated, searchable staff portal
            └── StaffSalary.jsx       # Salary transaction ledgers & Razorpay portal
```

---

## 🛠️ Technology Stack

| Technology | Purpose | Documentation |
| :--- | :--- | :--- |
| **React 19** | UI Layer and hooks pattern | [React Docs](https://react.dev/) |
| **Vite 8** | High-performance build toolchain | [Vite Docs](https://vite.dev/) |
| **Tailwind CSS v4** | Modern utility-first CSS styling engine | [Tailwind Docs](https://tailwindcss.com/) |
| **React Router v7/8** | Declarative client-side routing & guard boundaries | [React Router Docs](https://reactrouter.com/) |
| **Axios** | HTTP requests with request interceptors | [Axios Docs](https://axios-http.com/) |
| **Razorpay Checkout** | SDK for processing secure payroll transactions | [Razorpay Docs](https://razorpay.com/docs/) |
| **React Toastify v11**| Dynamic user feedback alerts | [Toastify Docs](https://github.com/fkhadra/react-toastify) |
| **Lucide React** | Scalable, lightweight SVG icon system | [Lucide Docs](https://lucide.dev/) |

---

## ⚙️ Installation & Local Setup

Follow these steps to run the client-side server locally:

### 1. Prerequisites
- **Node.js**: `v18.x` or higher is recommended.
- **npm** or **Yarn** package manager.

### 2. Clone the Repository & Install Dependencies
Navigate to the frontend folder and run:
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory. You can copy the values from `.env.example`:
```bash
cp .env.example .env
```
Update the backend endpoint according to your local backend API setup:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Running the Development Server
Run the local Vite server using:
```bash
npm run dev
```
The console will output the local network URL (typically `http://localhost:5173`).

### 5. Formatting & Linting
Ensure the code stays compliant with coding guidelines before pushing commits:
```bash
npm run lint
```

### 6. Production Compiling
To build the application for static production deployment:
```bash
npm run build
```
You can verify the production bundle locally with:
```bash
npm run preview
```

---

## 🔄 Core Configurations

### API Integration Client
The central API connector is located in [api.js](file:///c:/Excelsion_work/School_Management/frontend/src/api/api.js). It sets up a base configuration and includes a request interceptor that injects the current access token:
```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Custom Brand Theme
Color variables are loaded natively in [vite.config.js](file:///c:/Excelsion_work/School_Management/frontend/vite.config.js):
```javascript
theme: {
  extend: {
    colors: {
      school: {
        primary: "#5B7F46",
        secondary: "#E6E9DD",
        background: "#F4F1EA",
        text: "#1F2D1B",
        muted: "#66736A",
      },
    },
  },
}
```

---

## 🤝 Contributing
For updates and changes to pages or routing:
1. Discuss the requirements in a ticket or issue.
2. Ensure you format files according to the ESLint guidelines (`npm run lint`).
3. Cross-check access controls inside [ProtectedRoute.jsx](file:///c:/Excelsion_work/School_Management/frontend/src/components/ProtectedRoute.jsx) when adding new routes.
