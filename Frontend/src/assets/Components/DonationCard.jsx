import React from "react";

const DonationCard = ({ title, description, image }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition">
      <img src={image} alt={title} className="w-full h-40 object-cover rounded-md" />
      <h3 className="text-lg font-bold mt-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <button className="mt-3 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition">
        Donate Now
      </button>
    </div>
  );
};

export default DonationCard;
