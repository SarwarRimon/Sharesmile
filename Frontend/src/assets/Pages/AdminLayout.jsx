// AdminLayout.jsx
import React from 'react';
import AdminSidebar from '../Components/AdminSidebar'; // adjust path if needed
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet /> {/* renders the matched admin page */}
      </main>
    </div>
  );
};

export default AdminLayout;
