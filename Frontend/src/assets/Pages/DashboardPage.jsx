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
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-gray-900 py-12 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-12 text-center">
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, {userData.name} ✨
            </h1>
            <p className="text-purple-100 text-lg">Manage your profile information</p>
          </div>

          <div className="p-8">
            <div className="grid gap-8 md:grid-cols-2">
              {[
                { label: "Email", value: userData.email, icon: "📧" },
                { label: "Department", field: "department", value: formData.department, icon: "🏢" },
                { label: "Batch", field: "batch", value: formData.batch, icon: "👥" },
                { label: "Address", field: "address", value: formData.address, icon: "📍" },
                { label: "Mobile", field: "mobile", value: formData.mobile, icon: "📱" },
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">{item.icon}</span>
                    <h3 className="text-gray-700 dark:text-gray-200 font-semibold text-sm uppercase tracking-wider">
                      {item.label}
                    </h3>
                  </div>

                  {editMode && item.field ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={formData[item.field]}
                        onChange={(e) => handleChange(item.field, e.target.value)}
                        placeholder={`Enter ${item.label.toLowerCase()}`}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white dark:bg-gray-600 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition duration-200"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdate(item.field)}
                          disabled={!formData[item.field].trim()}
                          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Update
                        </button>
                        {formData[item.field] && (
                          <button
                            onClick={() => handleDelete(item.field)}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-600">
                      <p className="text-gray-800 dark:text-gray-200 font-medium">
                        {item.value || `No ${item.label.toLowerCase()} provided`}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={() => setEditMode(!editMode)}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-200"
              >
                {editMode ? "Save Changes" : "Edit Profile"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
