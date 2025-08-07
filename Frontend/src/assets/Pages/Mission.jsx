import React from 'react';

const Mission = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 py-12 px-6 mt-40">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-serif text-blue-700 font-bold mb-6">Our Mission</h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          At <span className="text-blue-500 font-semibold">ShareSmile</span>, our mission is to create a transparent and compassionate platform where those in need can find support, and those willing to help can contribute confidently. We aim to build a bridge between hearts—connecting donors with underprivileged students, disaster-affected families, and helpless individuals across our university and beyond.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed">
          We believe small efforts create big impacts. Every smile we share today is a step toward a brighter tomorrow.
        </p>
      </div>
    </div>
  );
};

export default Mission;
