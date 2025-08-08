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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Make a Difference Today
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Your generosity can transform lives. Join us in creating positive change and spreading hope to those in need.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.includes('❌') 
                ? 'bg-red-50 border border-red-100 text-red-600'
                : 'bg-green-50 border border-green-100 text-green-600'
            }`}>
              <p className="text-center text-sm font-medium">{message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Donation Amount (৳)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">৳</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                  placeholder="Enter amount"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Campaign
              </label>
              <div className="relative">
                <select
                  value={campaign}
                  onChange={(e) => setCampaign(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all appearance-none bg-white"
                  required
                >
                  <option value="Education For All">Education For All</option>
                  <option value="Healthcare Support">Healthcare Support</option>
                  <option value="Hunger-Free Tomorrow">Hunger-Free Tomorrow</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <div className="relative">
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all appearance-none bg-white"
                  required
                >
                  <option value="bKash">bKash</option>
                  <option value="Rocket">Rocket</option>
                  <option value="Nagad">Nagad</option>
                  <option value="Bank">Bank Transfer</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Make Donation</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            100% of your donation goes directly to those in need.
            <br />
            Thank you for your generosity and compassion.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Donation;
