import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 animate-gradient-x">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center pt-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/50 to-transparent pointer-events-none"></div>
        
        {/* Banner Image with Animation */}
        <div className="relative w-[90%] max-w-6xl transform hover:scale-[1.02] transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
          <img
            src="/images/CoU.png"
            alt="ShareSmile Banner"
            className="relative w-full rounded-3xl shadow-2xl object-cover animate-fade-in"
          />
        </div>

        {/* Welcome Text */}
        <div className="max-w-4xl mx-auto px-6 py-16 text-center animate-slide-up">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Welcome to ShareSmile 💙
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            ShareSmile is a community-driven donation platform created for the students, teachers, and staff of Comilla University. 
            Our mission is to bridge the gap between helpseekers and donors by providing a secure, transparent, and easy-to-use platform.
          </p>
          <p className="mt-4 text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-medium">
            Whether it's emergency aid, educational support, or campus welfare, ShareSmile empowers everyone to make a difference.
          </p>
        </div>
      </section>

      {/* Focus Areas Section */}
      <section className="py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5"></div>
        
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Our Focus Areas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Mission Card */}
          <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-100">
            <div className="h-12 w-12 mb-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl transform group-hover:scale-110 transition-transform duration-300">
              🎯
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Our Mission
            </h3>
            <p className="text-gray-700 mb-6">
              To create a reliable donation gateway within Comilla University that enables transparent, accountable, and impactful giving...
            </p>
            <Link
              to="/mission"
              className="inline-flex items-center text-purple-600 font-semibold group-hover:text-purple-700 transition-colors"
            >
              Read More
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Planning Card */}
          <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-100">
            <div className="h-12 w-12 mb-6 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl transform group-hover:scale-110 transition-transform duration-300">
              📅
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Our Planning
            </h3>
            <ul className="space-y-3 text-gray-700 mb-6">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Launch verified campaigns
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Real-time tracking
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Secure payments
              </li>
            </ul>
            <Link
              to="/planning"
              className="inline-flex items-center text-purple-600 font-semibold group-hover:text-purple-700 transition-colors"
            >
              Read More
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Previous Work Card */}
          <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-100">
            <div className="h-12 w-12 mb-6 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 flex items-center justify-center text-white text-2xl transform group-hover:scale-110 transition-transform duration-300">
              📌
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Previous Works
            </h3>
            <ul className="space-y-3 text-gray-700 mb-6">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                20+ emergency campaigns
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Semester fees support
              </li>
            </ul>
            <Link
              to="/previous-works"
              className="inline-flex items-center text-purple-600 font-semibold group-hover:text-purple-700 transition-colors"
            >
              Read More
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
