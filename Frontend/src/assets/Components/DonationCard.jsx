import React from "react";

const DonationCard = ({ title, description, image }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl 
                    transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover transition-transform duration-300 
                     group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 
                       transition-colors">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white 
                         py-3 px-6 rounded-xl font-semibold tracking-wide
                         transform transition-all duration-200
                         hover:shadow-lg hover:from-purple-700 hover:to-indigo-700
                         active:scale-95 flex items-center justify-center gap-2">
          <span>Donate Now</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DonationCard;
