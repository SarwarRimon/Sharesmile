import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/admin/requests/pending', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(res.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/admin/requests/${id}/status`, 
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchRequests(); // refresh after update
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-[rgb(245,248,255)] p-6">
      <h1 className="text-3xl font-bold text-[rgb(33,49,89)] mb-6">Pending Help Requests</h1>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-[rgb(200,210,230)]">
        <table className="min-w-full">
          <thead className="bg-[rgb(33,112,255)] text-white">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Document</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="border-b border-[rgb(230,235,245)] hover:bg-[rgb(245,250,255)]">
                <td className="p-3">{req.title}</td>
                <td className="p-3">{req.description}</td>
                <td className="p-3">৳{req.amount}</td>
                <td className="p-3">
                  {req.document_path ? (
                    <a 
                      href={`http://localhost:5000/uploads/${req.document_path}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </a>
                  ) : 'No file'}
                </td>
                <td className="p-3 flex justify-center gap-3">
                  <button
                    onClick={() => updateStatus(req.id, 'approved')}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(req.id, 'rejected')}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No pending requests.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRequests;
