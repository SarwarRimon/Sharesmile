import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const totalFunds = 15000;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[85vh] flex items-center justify-center"
        style={{ backgroundImage: "url('/assets/comilla-university-campus.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-blue-900 opacity-70"></div>
        <div className="text-center relative z-10 px-4 sm:px-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg leading-snug">
            “The greatest achievement is being able to do something for others.”
          </h1>
          <p className="mt-2 text-lg font-medium italic text-gray-100">— Dr. Muhammad Yunus</p>
          <p className="mt-4 text-lg md:text-xl font-medium text-gray-200">
            Your small act of kindness can uplift an entire campus. Together, we can support the students and initiatives of Comilla University.
          </p>
          <Link to="/donation">
            <button className="mt-6 bg-gradient-to-r from-teal-500 to-green-600 hover:from-green-600 hover:to-teal-500 px-8 py-3 text-lg font-semibold rounded-full transition duration-300 shadow-lg hover:scale-105 text-white">
              💖 Donate Now
            </button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="p-8 shadow-xl rounded-lg bg-gradient-to-r from-teal-500 to-green-600 text-white">
            <h3 className="text-5xl font-bold">100+</h3>
            <p className="text-xl font-medium">Lives Impacted</p>
          </div>
          <div className="p-8 shadow-xl rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <h3 className="text-5xl font-bold">
              ৳{totalFunds.toLocaleString()}
            </h3>
            <p className="text-xl font-medium">Funds Raised</p>
          </div>
          <div className="p-8 shadow-xl rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <h3 className="text-5xl font-bold">40+</h3>
            <p className="text-xl font-medium">Active Volunteers</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-800">About Helping Hand Foundations</h2>
          <p className="mt-4 text-lg font-light text-gray-700">
            Helping Hand Foundations is a non-profit organization at Comilla University dedicated to providing resources and support for students and the wider community. Our mission is to create a sustainable impact through education, health, and social welfare initiatives.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
