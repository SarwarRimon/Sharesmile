import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/help-requests/my-requests', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRequests(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-[rgb(245,248,255)] p-8">
      <h1 className="text-3xl font-bold text-[rgb(24,47,89)] mb-6">📋 My Requests</h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-[rgb(33,112,255)] text-white">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map(req => (
                <tr key={req.id} className="border-b hover:bg-[rgb(240,245,255)]">
                  <td className="p-3">{req.title}</td>
                 <td className="p-3">{'\u09F3'}{req.amount}</td>
                  <td className={`p-3 font-semibold capitalize ${
                    req.status === 'approved' ? 'text-green-600' :
                    req.status === 'finished' ? 'text-blue-600' :
                    'text-yellow-600'
                  }`}>
                    {req.status}
                  </td>
                  <td className="p-3">{new Date(req.created_at).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">No requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyRequests;
