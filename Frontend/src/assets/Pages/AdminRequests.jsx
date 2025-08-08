import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const AdminRequests = () => {
  console.log('AdminRequests component rendered');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const token = localStorage.getItem('token');

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/admin/help-requests', {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Ensure status is explicitly null for new requests
      const formattedRequests = res.data.map(req => ({
        ...req,
        status: req.status || null
      }));
      setRequests(formattedRequests);
      setError(null);
    } catch (err) {
      setError('Failed to fetch requests');
      console.error('Error fetching requests:', err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      setLoading(true);
      console.log('Updating request:', requestId, 'to status:', newStatus); // Debug log
      
      const response = await axios.put(
        `http://localhost:5000/api/admin/help-requests/${requestId}`,
        { status: newStatus },
        { 
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('Server response:', response.data); // Debug log
      
      // Show success message
      setSuccessMessage(`Request ${newStatus} successfully`);
      setTimeout(() => setSuccessMessage(''), 3000);

      // Refresh the requests list to get the latest data
      fetchRequests();
      
    } catch (err) {
      console.error('Error updating request:', err.response?.data || err.message);
      setError(err.response?.data?.message || `Failed to ${newStatus} request`);
      setTimeout(() => setError(null), 3000);
      console.error('Error updating status:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[rgb(245,248,255)] p-6 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading requests...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[rgb(245,248,255)] p-6">
      <h1 className="text-3xl font-bold text-[rgb(33,49,89)] mb-6">Help Requests</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
          {successMessage}
        </div>
      )}
      
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
                    onClick={() => handleStatusUpdate(req.id, 'approved')}
                    className={`px-4 py-2 rounded-lg shadow-md ${
                      req.status === 'approved'
                        ? 'bg-green-200 text-green-800'
                        : req.status === 'rejected'
                        ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                    disabled={req.status === 'rejected'}
                  >
                    {req.status === 'approved' ? 'Approved' : 'Approve'}
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(req.id, 'rejected')}
                    className={`px-4 py-2 rounded-lg shadow-md ${
                      req.status === 'rejected'
                        ? 'bg-red-200 text-red-800'
                        : req.status === 'approved'
                        ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                        : 'bg-red-500 hover:bg-red-600 text-white'
                    }`}
                    disabled={req.status === 'approved'}
                  >
                    {req.status === 'rejected' ? 'Rejected' : 'Reject'}
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
