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

  // Helper function for status styling
  const getStatusStyle = (status) => {
    switch (status) {
      case 'approved':
        return {
          bg: 'bg-green-100',
          text: 'text-green-700',
          dot: 'bg-green-400'
        };
      case 'finished':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-700',
          dot: 'bg-blue-400'
        };
      default:
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-700',
          dot: 'bg-yellow-400'
        };
    }
  };

  return (
    <div className="min-h-screen p-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
        My Help Requests
      </h1>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-pink-50/50 rounded-2xl"></div>
        <div className="overflow-x-auto relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100">
          <table className="w-full">
            <thead>
              <tr className="border-b border-purple-100">
                <th className="p-4 text-left">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                    Title
                  </span>
                </th>
                <th className="p-4 text-left">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold">
                    Amount
                  </span>
                </th>
                <th className="p-4 text-left">
                  <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent font-semibold">
                    Status
                  </span>
                </th>
                <th className="p-4 text-left">
                  <span className="bg-gradient-to-r from-rose-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
                    Date
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map(req => {
                  const statusStyle = getStatusStyle(req.status);
                  return (
                    <tr 
                      key={req.id} 
                      className="border-b border-purple-50 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:via-purple-50/50 hover:to-pink-50/50 transition-colors duration-300"
                    >
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white mr-3">
                            📝
                          </div>
                          <span className="text-gray-700 font-medium">{req.title}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold">
                          {'\u09F3'}{req.amount}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                          <span className={`h-2 w-2 rounded-full mr-2 ${statusStyle.dot}`}></span>
                          {req.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-rose-500 to-indigo-500 flex items-center justify-center text-white mr-3">
                            📅
                          </div>
                          <span className="text-gray-700">
                            {new Date(req.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-8">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="h-16 w-16 rounded-xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center text-2xl">
                        📭
                      </div>
                      <p className="text-gray-500 text-lg">No requests found yet</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyRequests;
