import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [totalDonation, setTotalDonation] = useState(0);
  const token = localStorage.getItem('token'); // Assuming admin is logged in

  const fetchTotalDonation = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/donations/total', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTotalDonation(res.data.totalDonation);
    } catch (err) {
      console.error('Failed to fetch total donation:', err);
    }
  };

  useEffect(() => {
    fetchTotalDonation(); // Fetch once on mount
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl">
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
          Admin Dashboard
        </h1>

        <div className="border border-blue-300 rounded-xl p-6 bg-blue-50 shadow-inner">
          <p className="text-xl font-semibold text-gray-800 mb-2">Total Donations Received</p>
          <p className="text-4xl font-bold text-green-600">৳{totalDonation}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
