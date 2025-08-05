import React from "react";
import { Link } from "react-router-dom";

const MainSection = () => {
  return (
    <div
      className="relative h-[85vh] flex items-center justify-center text-white bg-cover bg-center"
      style={{ backgroundImage: "url('/asset/download.jpeg')" }} // Make sure image is in public/asset/
    >
      {/* Overlay for darker contrast */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Animated Decorative Shapes */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-yellow-400 rounded-full opacity-70 animate-pulse"></div>
      <div className="absolute bottom-16 right-16 w-24 h-24 bg-orange-500 rounded-full opacity-50 animate-bounce"></div>

      {/* Main Content */}
      <div className="relative text-center max-w-3xl p-8 bg-black/40 backdrop-blur-md rounded-lg shadow-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg leading-snug">
          “No one has ever become poor by giving.”
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200 font-medium">
          Helping Hand Foundations is a non-profit organization dedicated to supporting the students and community of <strong>Comilla University</strong>. Your contribution helps us make a meaningful impact.
        </p>
        <Link to="/donation">
          <button className="mt-6 px-8 py-3 text-lg font-bold text-white bg-gradient-to-r from-teal-500 to-green-400 rounded-full shadow-lg transition-transform transform hover:scale-110 hover:from-green-400 hover:to-teal-500">
            💖 Donate Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MainSection;
