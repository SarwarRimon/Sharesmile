import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    designation: '',
    department: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      // Get stored user data first
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setProfile(userData);
        setFormData(prev => ({ ...prev, ...userData }));
      }

      // Then fetch latest data from server
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/admin/profile', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      
      if (res.data) {
        setProfile(prev => ({
          ...prev,
          ...res.data
        }));
        setFormData(prev => ({ ...prev, ...res.data }));
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load complete profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/admin/profile', formData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      setProfile(formData);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
    }
  };

  const handleClear = () => {
    setFormData({
      ...profile,
      phone: '',
      address: '',
      bio: '',
      designation: '',
      department: ''
    });
  };

  if (loading) return <p className="p-6 text-center">Loading profile...</p>;
  if (error) return <p className="p-6 text-center text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Profile</h1>
            <p className="text-purple-600 font-medium mt-1">{profile?.role?.toUpperCase()}</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          </button>
        </div>

        {!isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Full Name</h3>
              <p className="text-lg text-gray-900">{profile?.name || 'N/A'}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Email Address</h3>
              <p className="text-lg text-gray-900">{profile?.email || 'N/A'}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Phone Number</h3>
              <p className="text-lg text-gray-900">{profile?.phone || 'Not provided'}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Designation</h3>
              <p className="text-lg text-gray-900">{profile?.designation || 'Not provided'}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Department</h3>
              <p className="text-lg text-gray-900">{profile?.department || 'Not provided'}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Member Since</h3>
              <p className="text-lg text-gray-900">
                {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'N/A'}
              </p>
            </div>

            <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Address</h3>
              <p className="text-lg text-gray-900">{profile?.address || 'Not provided'}</p>
            </div>

            <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Bio</h3>
              <p className="text-lg text-gray-900">{profile?.bio || 'Not provided'}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Designation</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
            </div>

            <div className="md:col-span-2 flex justify-end gap-4">
              <button
                type="button"
                onClick={handleClear}
                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Update Profile
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
