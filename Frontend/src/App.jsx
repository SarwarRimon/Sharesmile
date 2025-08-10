import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./assets/Components/Navbar";
import AdminRequests from "./assets/Pages/AdminRequests";
import AdminProfile from "./assets/Components/AdminProfile";
import AddAdmin from "./assets/Pages/AddAdmin";
import Users from "./assets/Pages/Users";
import Footer from "./assets/Components/Footer";
import Home from "./assets/Pages/Home";
import Campaigns from "./assets/Pages/Campaigns";
import DonationForm from "./assets/Components/DonationForm";
import Loginpage from "./assets/Pages/Loginpage";
import Signup from "./assets/Pages/Signup";
import ContactForm from "./assets/Components/ContactForm";
import ProtectedRoute from "./assets/Components/ProtectedRoute";
import DashboardPage from "./assets/Pages/DashboardPage";
import Mission from './assets/Pages/Mission';
import Planning from './assets/Pages/planning';
import PreviousWork from './assets/Pages/PreviousWork';
import NewRequest from './assets/Components/NewRequestForm';
import SeekHelpPage from './assets/Pages/SeekHelpPage'
import AdminLayout from "./assets/Pages/AdminLayout";
import MyRequests from "./assets/Components/MyRequests";
import NewRequestForm from "./assets/Components/NewRequestForm";
// ✅ Import AuthProvider
import { AuthProvider } from "../src/assets/Context/AuthContext";

// ✅ Import dashboards
import AdminDashboard from "./assets/Pages/AdminDashboard";
import HelpSeekerDashboard from "./assets/Pages/HelpSeekerDashboard";

// ✅ Role-based redirect logic
const RoleBasedRedirect = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) return <Navigate to="/login" replace />;

  switch (user.role) {
    case "admin":
      return <Navigate to="/admin/dashboard" replace />;
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
            <Route path="/donation-form" element={<DonationForm />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/login" element={<Loginpage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/mission" element={<Mission />} />
           <Route path="/planning" element={<Planning />} />
            <Route path="/helpseeker-dashboard" element={<HelpSeekerDashboard />} />
           <Route path="/seek-help" element={<SeekHelpPage />}>
           <Route path="new-request" element={<NewRequest />} />
  {/* Add other nested routes here */}
</Route>
           <Route path="/previous-works" element={<PreviousWork />} />
            {/* ✅ Updated Dashboard Route for Role Redirect */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <RoleBasedRedirect />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="requests" element={<AdminRequests />} />
              <Route path="add-admin" element={<AddAdmin />} />
              <Route path="profile" element={<AdminProfile />} />
              <Route path="users" element={<Users />} />
            </Route>
              
              <Route 
  path="/seek-help/my-requests" 
  element={
    <ProtectedRoute>
      <MyRequests />
    </ProtectedRoute>
  } 
/>
<Route 
  path="/seek-help/new-request" 
  element={
    <ProtectedRoute>
      <NewRequestForm />
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