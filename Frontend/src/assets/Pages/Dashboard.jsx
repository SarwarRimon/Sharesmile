import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    address: "",
    mobile: "",
    photo: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setProfile(res.data))
      .catch(() => alert("Error fetching profile"));
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    const token = localStorage.getItem("token");
    axios
      .put("http://localhost:5000/api/auth/profile", profile, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => alert("Profile updated successfully"))
      .catch(() => alert("Error updating profile"));
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-3xl font-bold">Dashboard</h2>
      <input type="text" name="address" value={profile.address} onChange={handleChange} placeholder="Address" />
      <input type="text" name="mobile" value={profile.mobile} onChange={handleChange} placeholder="Mobile" />
      <input type="file" accept="image/*" onChange={handlePhotoUpload} />
      {profile.photo && <img src={profile.photo} alt="Profile" />}
      <button onClick={handleUpdate}>Save Changes</button>
    </div>
  );
};

export default Dashboard;
