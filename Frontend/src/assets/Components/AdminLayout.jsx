import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: '/admin-dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/admin-requests', icon: '📝', label: 'Help Requests' },
    { path: '/admin-donations', icon: '💰', label: 'Donations' },
    { path: '/admin-users', icon: '👥', label: 'Users' },
    { path: '/admin-profile', icon: '👤', label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 z-50
                      ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            {isSidebarOpen && (
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Admin Panel
              </h1>
            )}
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-purple-50 text-gray-500 hover:text-purple-600 transition-colors"
            >
              {isSidebarOpen ? '◀' : '▶'}
            </button>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg transition-all duration-200 
                    ${location.pathname === item.path 
                      ? 'bg-purple-100 text-purple-600' 
                      : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'}`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {isSidebarOpen && <span className="ml-3">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
