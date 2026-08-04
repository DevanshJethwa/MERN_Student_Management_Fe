import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
// import Login from "./pages/Login";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { refreshAccessToken } from "./services/authService";
import { useEffect } from "react";


function App() {

  useEffect(() => {

        refreshAccessToken();

        const interval = setInterval(() => {

            refreshAccessToken();

        }, 2 * 60 * 1000); // 2 minutes

        return () => clearInterval(interval);

    }, []);
  return (
    <>

      {/* <Router>
       <Routes>
         <Route path="/login" element={<Login />} />
        
          Optional: Redirect root to login 
          <Route path="/" element={<Navigate to="/login" replace />} /> 
       </Routes>
     </Router> */}
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Zoom}
      />
      <AppRoutes />
    </>
  );
}

export default App;