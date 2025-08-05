import React from "react";
import { Routes, Route } from "react-router-dom";
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

// Import the AuthProvider context
import { AuthProvider } from "../src/assets/Context/AuthContext";

// ✅ Import AdminPanel
import AdminPanel from "./assets/Pages/AdminDashboard";

const App = () => {
  return (
    // Wrap the entire app in AuthProvider
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

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            {/* ✅ Admin Panel Route */}
            <Route path="/admin-dashboard" element={<AdminPanel />} />
          </Routes>
        </div>

        <MainSection />
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
