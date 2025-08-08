import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HelpSeekerDashboard = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-8 px-4 font-sans mt-10">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="px-8 pt-10 pb-8 bg-gradient-to-r from-purple-600 to-indigo-600">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-white mb-2">
                  Welcome Back, <span className="text-purple-200">{userData.name}</span>! 👋
                </h1>
                <p className="text-purple-100 text-lg">Manage your profile details and information</p>
              </div>
              <div className="h-24 w-24 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-white/20">
                <span className="text-4xl">👤</span>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8 bg-white">
            <div className="grid gap-6 md:grid-cols-2">
              {[
                { label: "Email", value: userData.email, icon: "📧", color: "purple" },
                { label: "Department", field: "department", value: formData.department, icon: "🏢", color: "indigo" },
                { label: "Batch", field: "batch", value: formData.batch, icon: "🎓", color: "violet" },
                { label: "Address", field: "address", value: formData.address, icon: "📍", color: "fuchsia" },
                { label: "Mobile", field: "mobile", value: formData.mobile, icon: "📱", color: "pink" },
              ].map((item, idx) => (
                <div key={idx} 
                     className="group bg-white rounded-xl border-2 border-purple-100 p-6 transition-all duration-300 
                              hover:border-purple-300 hover:shadow-lg hover:shadow-purple-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                        <span className="text-2xl">{item.icon}</span>
                      </div>
                      <h3 className="text-gray-700 font-semibold text-lg">
                        {item.label}
                      </h3>
                    </div>
                    {item.field && (
                      <button
                        onClick={() => setEditMode(!editMode)}
                        className="text-purple-600 hover:text-purple-800 font-medium px-4 py-1 rounded-full
                                 hover:bg-purple-50 transition-all duration-200"
                      >
                        {editMode ? "Cancel" : "Edit"}
                      </button>
                    )}
                  </div>

                  {editMode && item.field ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={formData[item.field]}
                        onChange={(e) => handleChange(item.field, e.target.value)}
                        placeholder={`Enter ${item.label.toLowerCase()}`}
                        className="w-full px-4 py-3 text-gray-700 border-2 border-purple-200 rounded-lg 
                                 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all
                                 placeholder-gray-400 text-base"
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleUpdate(item.field)}
                          disabled={!formData[item.field].trim()}
                          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg
                                   transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                                   text-sm font-medium shadow-sm hover:shadow-md"
                        >
                          Save Changes
                        </button>
                        {formData[item.field] && (
                          <button
                            onClick={() => handleDelete(item.field)}
                            className="px-6 py-2.5 border-2 border-purple-200 rounded-lg hover:bg-purple-50
                                     text-purple-700 transition-all duration-200 text-sm font-medium"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                      <p className="text-gray-800 text-lg">
                        {item.value || `No ${item.label.toLowerCase()} provided`}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-10">
              <button
                onClick={() => setEditMode(!editMode)}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600
                         text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl 
                         transform hover:scale-105 transition-all duration-200 gap-3"
              >
                {editMode ? (
                  <>
                    <span>Save All Changes</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Edit Profile</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSeekerDashboard;
