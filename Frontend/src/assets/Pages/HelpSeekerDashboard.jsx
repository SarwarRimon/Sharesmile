import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HelpSeekerDashboard = () => {
  const [user, setUser] = useState({});
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // You may store the token in localStorage after login
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

  if (loading) return <p className="text-center text-lg mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">HelpSeeker Dashboard</h1>

      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Profile Information</h2>
        <p><span className="font-medium">Full Name:</span> {user.full_name}</p>
        <p><span className="font-medium">Email:</span> {user.email}</p>
        <p><span className="font-medium">Mobile:</span> {user.mobile}</p>
        <p><span className="font-medium">Address:</span> {user.address}</p>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">My Help Requests</h2>
        {requests.length === 0 ? (
          <p>No help requests found.</p>
        ) : (
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2 text-left">Request ID</th>
                <th className="border px-3 py-2 text-left">Description</th>
                <th className="border px-3 py-2 text-left">Status</th>
                <th className="border px-3 py-2 text-left">Requested At</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td className="border px-3 py-2">{req.id}</td>
                  <td className="border px-3 py-2">{req.description}</td>
                  <td className="border px-3 py-2">
                    <span className={`px-2 py-1 rounded text-white 
                      ${req.status === 'Pending' ? 'bg-yellow-500' : 
                        req.status === 'Approved' ? 'bg-green-500' : 
                        'bg-red-500'}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="border px-3 py-2">{new Date(req.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default HelpSeekerDashboard;
