import React from 'react';

const PreviousWork = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-6 mt-10">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-serif text-blue-700 font-bold mb-6">Our Previous Work</h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          Before officially launching <span className="text-blue-500 font-semibold">ShareSmile</span>, our team carried out multiple donation and support campaigns on a small scale around the Comilla University campus.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left text-gray-700 text-lg">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-blue-600 mb-2">📦 Winter Clothes Campaign</h3>
            <p>We collected and distributed over 100 warm clothes to poor children in nearby villages during winter 2024.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-blue-600 mb-2">📚 Academic Support Fund</h3>
            <p>Raised BDT 35,000+ to help 3 underprivileged students buy semester books and pay tuition fees.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-blue-600 mb-2">🛑 Emergency Help</h3>
            <p>Helped a student in medical emergency by collecting funds through friends and faculty members within 2 days.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-blue-600 mb-2">🎗️ Fund for Orphanage</h3>
            <p>Visited and supported an orphanage near Comilla with stationery and hygiene kits raised via internal donation drives.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviousWork;
