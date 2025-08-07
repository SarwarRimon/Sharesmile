import React, { useState } from 'react';
import axios from 'axios';

const NewRequest = ({ token }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (file) {
      formData.append('document', file);
    }

    try {
      const res = await axios.post('http://localhost:5000/api/help-requests', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.status === 201) {
        setMessage('Request submitted!');
        setTitle('');
        setDescription('');
        setFile(null);
      }
    } catch (err) {
      console.error(err);
      setMessage('Failed to submit request.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Submit a New Help Request</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Request Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <textarea
          placeholder="Describe your issue"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full mb-3"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit Request
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default NewRequest;
