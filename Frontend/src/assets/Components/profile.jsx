import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        alert('Failed to fetch profile.');
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) return <p>Loading...</p>;

  if (!user) return <p>No user data available</p>;

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Welcome to your profile!</p>
    </div>
  );
};

export default Profile;
