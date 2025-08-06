import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchUserData();
    }
  }, [navigate]);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUserData(data.user);
        setFormData({
          department: data.user.department || "",
          batch: data.user.batch || "",
          address: data.user.address || "",
          mobile: data.user.mobile || "",
        });
      } else {
        alert(data.message || "Error fetching user data.");
      }
    } catch {
      alert("Server error");
    }
  };

  const handleUpdate = async (field) => {
    const token = localStorage.getItem("token");
    try {
      const value = formData[field];
      const response = await fetch(`http://localhost:5000/api/user/update/${field}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ [field]: value }),
      });
      const data = await response.json();
      if (response.ok) {
        fetchUserData();
        alert(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully!`);
      } else {
        alert(data.message || "Error updating data.");
      }
    } catch {
      alert("Error updating data.");
    }
  };

  const handleDelete = async (field) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5000/api/user/delete/${field}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setFormData((prev) => ({ ...prev, [field]: "" }));
        fetchUserData();
        alert(`${field.charAt(0).toUpperCase() + field.slice(1)} deleted successfully!`);
      } else {
        alert(data.message || "Error deleting data.");
      }
    } catch {
      alert("Error deleting data.");
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!userData)
    return <div className="text-center py-20 text-lg text-gray-200 font-sans">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#141E30] via-[#243B55] to-[#0f2027] py-20 px-4 font-sans text-white">
      <h1 className="text-4xl font-serif font-bold text-center mb-12 drop-shadow-lg">
        Welcome, {userData.name} 🎉
      </h1>

      <div className="bg-green-100 text-gray-900 backdrop-blur-xl max-w-3xl mx-auto p-10 rounded-3xl shadow-2xl space-y-8">
        {[
          { label: "Email", value: userData.email },
          { label: "Department", field: "department", value: formData.department },
          { label: "Batch", field: "batch", value: formData.batch },
          { label: "Address", field: "address", value: formData.address },
          { label: "Mobile", field: "mobile", value: formData.mobile },
        ].map((item, idx) => (
          <div key={idx}>
            <h3 className="text-gray-600 font-semibold text-sm mb-2 uppercase tracking-wider">
              {item.label}
            </h3>

            {editMode && item.field ? (
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <input
                  type="text"
                  value={formData[item.field]}
                  onChange={(e) => handleChange(item.field, e.target.value)}
                  placeholder={`Enter ${item.label.toLowerCase()}`}
                  className="w-full sm:flex-1 px-4 py-3 border border-gray-400 rounded-xl bg-white text-gray-800 focus:ring-4 focus:ring-blue-400 focus:outline-none transition font-sans shadow-md hover:border-blue-600 hover:scale-[1.02] hover:shadow-xl"
                />
                <button
                  onClick={() => handleUpdate(item.field)}
                  disabled={!formData[item.field].trim()}
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-5 py-2 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition"
                >
                  Update
                </button>
                {formData[item.field] && (
                  <button
                    onClick={() => handleDelete(item.field)}
                    className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-5 py-2 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition"
                  >
                    Delete
                  </button>
                )}
              </div>
            ) : (
              <div className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-800 font-sans text-base shadow hover:shadow-md transition">
                {item.value || `No ${item.label.toLowerCase()} provided`}
              </div>
            )}

            <hr className="my-5 border-gray-200" />
          </div>
        ))}

        <div className="flex justify-center pt-4">
          <button
            onClick={() => setEditMode(!editMode)}
            className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white px-8 py-3 rounded-xl shadow-lg hover:scale-110 hover:shadow-2xl transition"
          >
            {editMode ? "Confirm Edit" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
