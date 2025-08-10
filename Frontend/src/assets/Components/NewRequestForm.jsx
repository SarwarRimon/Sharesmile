import React, { useState } from 'react';
import axios from 'axios';

const NewRequestForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    document: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to submit a help request.');
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('amount', formData.amount);
    if (formData.document) {
      data.append('document', formData.document);
    }

    try {
      const res = await axios.post('http://localhost:5000/api/help-requests', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(res.data.message);
      setFormData({ title: '', description: '', amount: '', document: null });
      // Redirect to MyRequests after successful submission
      //window.location.href = '/help-seeker/my-requests';
    } catch (error) {
      console.error('Error submitting request:', error);
      const errorMessage = error.response?.data?.message || 'Failed to submit help request.';
      alert(errorMessage);
    }
  };

  return (
    <div className="w-full flex justify-center animate-fade-in">
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-10 w-[600px] mt-4 border border-purple-100
                 hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-pink-50/50"></div>
        
        <div className="relative">
          <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Submit a Help Request
          </h2>
          <div className="h-1 w-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

          <div className="space-y-6">
            {/* Title Field */}
            <div className="group">
              <label className="block text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Title
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="title"
                  placeholder="Enter request title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-purple-100
                           text-gray-700 placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                           transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Description Field */}
            <div className="group">
              <label className="block text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Description
              </label>
              <div className="relative">
                <textarea
                  name="description"
                  placeholder="Describe your situation in detail"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-purple-100
                           text-gray-700 placeholder-gray-400 resize-none h-32
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                           transition-all duration-300"
                ></textarea>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Amount Field */}
            <div className="group">
              <label className="block text-sm font-medium bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
                Amount Needed
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="amount"
                  placeholder="Enter the amount you need"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-purple-100
                           text-gray-700 placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                           transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Document Upload */}
            <div className="group">
              <label className="block text-sm font-medium bg-gradient-to-r from-rose-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Supporting Document
              </label>
              <div className="relative">
                <input
                  type="file"
                  name="document"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-purple-100
                           text-gray-700
                           file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 
                           file:bg-gradient-to-r file:from-indigo-500 file:to-purple-500 file:text-white
                           hover:file:from-indigo-600 hover:file:to-purple-600
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                           transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-rose-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-8 py-4 rounded-xl font-semibold text-white uppercase tracking-wide
                       bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                       hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600
                       transform hover:scale-[1.02] hover:shadow-xl
                       transition-all duration-300"
            >
              Submit Request
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewRequestForm;
