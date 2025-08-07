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
    <div className="min-h-screen bg-gray-50 py-12 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          {/* Profile Header */}
          <div className="px-8 pt-12 pb-8 bg-white border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-gray-800 mb-1">
                  Welcome Back, <span className="text-emerald-600">{userData.name}</span>
                </h1>
                <p className="text-gray-500">Manage and update your profile information</p>
              </div>
              <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            <div className="grid gap-6 md:grid-cols-2">
              {[
                { label: "Email", value: userData.email, icon: "📧", color: "blue" },
                { label: "Department", field: "department", value: formData.department, icon: "🏢", color: "emerald" },
                { label: "Batch", field: "batch", value: formData.batch, icon: "🎓", color: "violet" },
                { label: "Address", field: "address", value: formData.address, icon: "📍", color: "pink" },
                { label: "Mobile", field: "mobile", value: formData.mobile, icon: "📱", color: "amber" },
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-lg border border-gray-100 p-6 transition-all duration-200 hover:shadow-md hover:border-emerald-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-xl mr-3">{item.icon}</span>
                      <h3 className="text-gray-700 font-medium">
                        {item.label}
                      </h3>
                    </div>
                    {item.field && (
                      <button
                        onClick={() => setEditMode(!editMode)}
                        className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                      >
                        {editMode ? "Cancel" : "Edit"}
                      </button>
                    )}
                  </div>

                  {editMode && item.field ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={formData[item.field]}
                        onChange={(e) => handleChange(item.field, e.target.value)}
                        placeholder={`Enter ${item.label.toLowerCase()}`}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdate(item.field)}
                          disabled={!formData[item.field].trim()}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                        >
                          Save Changes
                        </button>
                        {formData[item.field] && (
                          <button
                            onClick={() => handleDelete(item.field)}
                            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition text-sm font-medium"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-gray-800">
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
                className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-medium shadow-sm hover:shadow gap-2"
              >
                {editMode ? (
                  <>
                    <span>Save All Changes</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Edit Profile</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
