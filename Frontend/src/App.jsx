import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./assets/Components/Navbar";
import MainSection from "./assets/Components/MainSection";
import Footer from "./assets/Components/Footer";
import Home from "./assets/Pages/Home";
import Campaigns from "./assets/Pages/Campaigns";
import Donation from "./assets/Pages/Donation";
import Loginpage from "./assets/Pages/Loginpage";
import Signup from "./assets/Pages/Signup";
import ContactForm from "./assets/Components/ContactForm";
import ProtectedRoute from "./assets/Components/ProtectedRoute";
import DashboardPage from "./assets/Pages/DashboardPage";

// ✅ Import AuthProvider
import { AuthProvider } from "../src/assets/Context/AuthContext";

// ✅ Import dashboards
import AdminPanel from "./assets/Pages/AdminDashboard";
import HelpSeekerDashboard from "./assets/Pages/HelpSeekerDashboard";

// ✅ Role-based redirect logic
const RoleBasedRedirect = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) return <Navigate to="/login" replace />;

  switch (user.role) {
    case "admin":
      return <Navigate to="/admin-dashboard" replace />;
    case "helpseeker":
      return <Navigate to="/helpseeker-dashboard" replace />;
    default:
      return <DashboardPage />;
  }
};

const App = () => {
  return (
    <AuthProvider>
      <div className="font-sans bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <Navbar />

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/donation" element={<Donation />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/login" element={<Loginpage />} />
            <Route path="/signup" element={<Signup />} />

            {/* ✅ Updated Dashboard Route for Role Redirect */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <RoleBasedRedirect />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <HelpSeekerDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
