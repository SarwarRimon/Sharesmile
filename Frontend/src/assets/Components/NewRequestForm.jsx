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
    <div className="w-full flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-red-100  shadow-2xl rounded-3xl p-10 w-2xl   mt-4 border border-[rgb(126,94,116)]"
      >
        <h2 className="text-[rgb(24,47,89)] text-3xl font-bold mb-8 text-center font-sans tracking-wide">
          💬 Submit a Help Request
        </h2>

        <div className="mb-5">
          <label className="block text-[rgb(60,60,110)] font-semibold mb-1 text-sm uppercase tracking-wide">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Request title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-xl border border-[rgb(180,200,230)] bg-[rgb(250,252,255)] text-[rgb(45,45,80)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[rgb(100,150,255)] transition"
          />
        </div>

        <div className="mb-5">
          <label className="block text-[rgb(60,60,110)] font-semibold mb-1 text-sm uppercase tracking-wide">Description</label>
          <textarea
            name="description"
            placeholder="Describe your issue"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-xl border border-[rgb(180,200,230)] bg-[rgb(250,252,255)] text-[rgb(45,45,80)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[rgb(100,150,255)] resize-none h-28 transition"
          ></textarea>
        </div>

        <div className="mb-5">
          <label className="block text-[rgb(60,60,110)] font-semibold mb-1 text-sm uppercase tracking-wide">Amount</label>
          <input
            type="number"
            name="amount"
            placeholder="Enter required amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-xl border border-[rgb(180,200,230)] bg-[rgb(250,252,255)] text-[rgb(45,45,80)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[rgb(100,150,255)] transition"
          />
        </div>

        <div className="mb-6">
          <label className="block text-[rgb(60,60,110)] font-semibold mb-1 text-sm uppercase tracking-wide">Upload Document</label>
          <input
            type="file"
            name="document"
            accept=".pdf,.doc,.docx,.jpg,.png"
            onChange={handleChange}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[rgb(80,130,255)] file:text-white hover:file:bg-[rgb(60,110,235)] transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[rgb(33,112,255)] text-white font-bold py-3 rounded-xl hover:bg-[rgb(28,90,220)] shadow-md transition duration-300 uppercase tracking-wide"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default NewRequestForm;
