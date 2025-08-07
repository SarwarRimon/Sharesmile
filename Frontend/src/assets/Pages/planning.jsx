import React from 'react';

const Planning = () => {
  return (
    <div className="min-h-screen bg-gradient-to-bl from-white to-blue-100 py-12 px-6 mt-10">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-serif text-blue-700 font-bold mb-6">Our Planning</h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          We have an ambitious roadmap to scale the impact of <span className="text-blue-500 font-semibold">ShareSmile</span>. Our short-term plans include building trust with regular campaign updates, ensuring secure payment gateways (bKash, Rocket, Bank Transfer), and offering transparent donation records.
        </p>
        <ul className="list-disc text-left list-inside text-gray-700 text-lg space-y-2 mb-6">
          <li>🔹 Campus-wide awareness campaigns</li>
          <li>🔹 Integration with verified help-seeking requests</li>
          <li>🔹 Admin panel for real-time donation monitoring</li>
          <li>🔹 Recognition of regular donors and volunteers</li>
          <li>🔹 Partnering with NGOs for greater outreach</li>
        </ul>
        <p className="text-gray-700 text-lg leading-relaxed">
          In the long run, we aim to turn ShareSmile into a nation-wide model for digital donation transparency and collaboration.
        </p>
      </div>
    </div>
  );
};

export default Planning;
