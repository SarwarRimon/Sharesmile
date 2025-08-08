import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [statistics, setStatistics] = useState({
    totalDonations: 0,
    helpRequests: {},
    users: {},
    pendingRequests: 0
  });
  
  const token = localStorage.getItem('token');

  const fetchStatistics = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/statistics', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStatistics(res.data);
    } catch (err) {
      console.error('Failed to fetch statistics:', err);
    }
  }, [token]);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  const StatCard = ({ title, value, bgColor = 'bg-blue-50', textColor = 'text-blue-600' }) => (
    <div className={`border rounded-xl p-6 ${bgColor} shadow-lg`}>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Donations"
          value={`৳${statistics.totalDonations.toLocaleString()}`}
          bgColor="bg-green-50"
          textColor="text-green-600"
        />
        <StatCard
          title="Pending Requests"
          value={statistics.pendingRequests}
          bgColor="bg-yellow-50"
          textColor="text-yellow-600"
        />
        <StatCard
          title="Total Users"
          value={Object.values(statistics.users).reduce((a, b) => a + b, 0)}
          bgColor="bg-purple-50"
          textColor="text-purple-600"
        />
        <StatCard
          title="Total Help Requests"
          value={Object.values(statistics.helpRequests).reduce((a, b) => a + b, 0)}
          bgColor="bg-blue-50"
          textColor="text-blue-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Help Requests by Status */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Help Requests by Status</h2>
          <div className="space-y-4">
            {Object.entries(statistics.helpRequests).map(([status, count]) => (
              <div key={status} className="flex justify-between items-center">
                <span className="capitalize text-gray-600">{status}</span>
                <span className="font-semibold text-blue-600">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Users by Role */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Users by Role</h2>
          <div className="space-y-4">
            {Object.entries(statistics.users).map(([role, count]) => (
              <div key={role} className="flex justify-between items-center">
                <span className="capitalize text-gray-600">{role}</span>
                <span className="font-semibold text-purple-600">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
