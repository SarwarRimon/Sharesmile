import React, { useState } from "react";
import axios from "axios";

const Donation = () => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bKash");
  const [campaign, setCampaign] = useState("Campaign A");
  const [message, setMessage] = useState("");
  const [totalDonation, setTotalDonation] = useState(null); // State for total donation

  // This function will fetch the total donation from the backend
  const fetchTotalDonation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/donations/total", // Admin route to get total donations
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTotalDonation(response.data.total || 0); // Set the total donation in state
    } catch (error) {
      console.error("Error fetching total donation:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("❌ Please login before donating.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/donations",
        {
          amount,
          campaign,
          paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setMessage("✅ Donation submitted successfully!");
        setAmount("");
        // After donation is successful, fetch the updated total donation amount
        fetchTotalDonation();
      }
    } catch (error) {
      console.error("Donation error:", error);
      setMessage("❌ Failed to send donation.");
    }
  };

  return (
    <div className="py-25 bg-gray-50 min-h-screen">
      <h1 className="text-center text-4xl font-bold text-green-600">🌱 Make a Donation</h1>
      <p className="text-center text-gray-700 mt-2 max-w-xl mx-auto">
        Every little contribution counts. Help us spread kindness and create a lasting impact.
      </p>

      <div className="max-w-lg mx-auto mt-10 bg-white shadow-xl rounded-xl p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg">Donation Amount (৳)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-4 border-2 border-green-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter amount"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-lg">Select Campaign</label>
            <select
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
              className="w-full p-4 border-2 border-green-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="Education For All">Education For All</option>
              <option value="Healthcare Support">Healthcare Support</option>
              <option value="Hunger-Free Tomorrow">Hunger-Free Tomorrow</option>
              {/* Add more campaigns here */}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-lg">Choose Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-4 border-2 border-green-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="bKash">bKash</option>
              <option value="Rocket">Rocket</option>
              <option value="Nagad">Nagad</option>
              <option value="Bank">Bank Transfer</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-500 transition-all duration-300 ease-in-out"
          >
            Donate Now
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 font-semibold text-green-600">{message}</p>
        )}
      </div>

      <div className="text-center mt-8 text-gray-600">
        Your donation goes directly to those in need. Thank you for making the world a better place.
      </div>

      
    </div>
  );
};

export default Donation;
