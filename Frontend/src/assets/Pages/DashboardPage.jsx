import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const [newAddress, setNewAddress] = useState("");
  const [newMobile, setNewMobile] = useState("");
  const [newDepartment, setNewDepartment] = useState("");
  const [newBatch, setNewBatch] = useState("");
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
      } else {
        alert(data.message || "Error fetching user data.");
      }
    } catch {
      alert("Server error");
    }
  };

  const handleUpdate = async (field, value) => {
    const token = localStorage.getItem("token");
    try {
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
        alert(`${field} updated successfully!`);
      } else {
        alert(data.message || "Error updating user data.");
      }
    } catch {
      alert("Error updating user data.");
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
        fetchUserData();
        alert(`${field} deleted successfully!`);
      } else {
        alert(data.message || "Error deleting user data.");
      }
    } catch {
      alert("Error deleting user data.");
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 py-26 px-4">
    <h2 className="text-4xl font-bold text-center text-gray-800 mb-10 drop-shadow-md">Welcome to Your Dashboard</h2>
  
    <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-2xl mx-auto space-y-8">
      {/* Full Name */}
      <div>
        <h3 className="text-gray-600 font-medium text-sm">Full Name</h3>
        <p className="text-xl font-semibold text-gray-900">{userData.name}</p>
      </div>
  
      {/* Email */}
      <div>
        <h3 className="text-gray-600 font-medium text-sm">Email</h3>
        <p className="text-lg text-gray-800">{userData.email}</p>
      </div>
  
      {/* Department */}
      <div>
        <h3 className="text-gray-600 font-medium text-sm mb-1">Department</h3>
        <p className="text-md text-gray-800">{userData.department || "No department provided"}</p>
        <div className="mt-2 flex items-center gap-2">
          <input
            type="text"
            placeholder="Insert department"
            value={newDepartment}
            onChange={(e) => setNewDepartment(e.target.value)}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            onClick={() => handleUpdate("department", newDepartment)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500"
          >
            Insert
          </button>
        </div>
      </div>
  
      {/* Batch */}
      <div>
        <h3 className="text-gray-600 font-medium text-sm mb-1">Batch</h3>
        <p className="text-md text-gray-800">{userData.batch || "No batch provided"}</p>
        <div className="mt-2 flex items-center gap-2">
          <input
            type="text"
            placeholder="Insert batch"
            value={newBatch}
            onChange={(e) => setNewBatch(e.target.value)}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            onClick={() => handleUpdate("batch", newBatch)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500"
          >
            Insert
          </button>
        </div>
      </div>
  
      {/* Address */}
      <div>
        <h3 className="text-gray-600 font-medium text-sm mb-1">Address</h3>
        <p className="text-md text-gray-800">{userData.address || "No address provided"}</p>
        <div className="mt-2 flex items-center gap-2">
          <input
            type="text"
            placeholder="Update address"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            onClick={() => handleUpdate("address", newAddress)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
          >
            Update
          </button>
          <button
            onClick={() => handleDelete("address")}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>
  
      {/* Mobile */}
      <div>
        <h3 className="text-gray-600 font-medium text-sm mb-1">Mobile Number</h3>
        <p className="text-md text-gray-800">{userData.mobile || "No mobile number provided"}</p>
        <div className="mt-2 flex items-center gap-2">
          <input
            type="text"
            placeholder="Update mobile number"
            value={newMobile}
            onChange={(e) => setNewMobile(e.target.value)}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            onClick={() => handleUpdate("mobile", newMobile)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
          >
            Update
          </button>
          <button
            onClick={() => handleDelete("mobile")}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default DashboardPage;
