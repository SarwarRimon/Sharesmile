import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/admin/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        setError('Failed to load profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="p-6 text-center">Loading profile...</p>;
  if (error) return <p className="p-6 text-center text-red-600">{error}</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Admin Profile</h1>

      <div className="mb-3">
        <span className="font-medium text-gray-700">Name: </span>
        <span className="text-gray-900">{profile?.name || 'N/A'}</span>
      </div>

      <div className="mb-3">
        <span className="font-medium text-gray-700">Email: </span>
        <span className="text-gray-900">{profile?.email || 'N/A'}</span>
      </div>

      <div className="mb-3">
        <span className="font-medium text-gray-700">Role: </span>
        <span className="text-gray-900">{profile?.role || 'N/A'}</span>
      </div>

      {profile?.created_at && (
        <div className="mb-3">
          <span className="font-medium text-gray-700">Joined: </span>
          <span className="text-gray-900">
            {new Date(profile.created_at).toLocaleDateString()}
          </span>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
