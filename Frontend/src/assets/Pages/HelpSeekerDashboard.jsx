import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HelpSeekerDashboard = () => {
  const [user, setUser] = useState({});
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get('http://localhost:5000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data);

        const requestRes = await axios.get('http://localhost:5000/api/helpseeker/requests', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(requestRes.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <p className="text-center text-xl mt-16 text-gray-600">Loading your dashboard...</p>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">Welcome, {user.full_name || 'Help Seeker'} 👋</h1>

      {/* Profile Section */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-8 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">📋 Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <p><span className="font-medium text-gray-900">Full Name:</span> {user.full_name}</p>
          <p><span className="font-medium text-gray-900">Email:</span> {user.email}</p>
          <p><span className="font-medium text-gray-900">Mobile:</span> {user.mobile}</p>
          <p><span className="font-medium text-gray-900">Address:</span> {user.address}</p>
        </div>
      </div>

      {/* Help Requests Table */}
      <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">🆘 My Help Requests</h2>

        {requests.length === 0 ? (
          <p className="text-gray-600">You have not submitted any help requests yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-blue-50 text-blue-700 border-b border-blue-200">
                  <th className="px-4 py-3">Request ID</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Requested At</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{req.id}</td>
                    <td className="px-4 py-3">{req.description}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-white text-xs font-medium 
                        ${req.status === 'Pending' ? 'bg-yellow-500' :
                          req.status === 'Approved' ? 'bg-green-600' :
                          'bg-red-500'}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{new Date(req.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpSeekerDashboard;
