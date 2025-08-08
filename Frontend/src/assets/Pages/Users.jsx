import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/admin/users', {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.data) {
          setUsers(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      
      <div className="bg-white shadow-md rounded">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Role</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div className="text-sm leading-5 text-gray-900">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div className="text-sm leading-5 text-gray-900">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                    user.role === 'donor' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
