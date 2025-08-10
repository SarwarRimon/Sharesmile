import React from 'react';
import HelpSidebar from '../Components/HelpSidebar';
import { Outlet, useLocation } from 'react-router-dom';

const SeekHelpPage = () => {
  const location = useLocation();

  // Check if current path is exactly "/seek-help" (no nested route)
  const isDefaultContentVisible = location.pathname === '/seek-help';

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 animate-gradient-x">
      {/* Sidebar */}
      <HelpSidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto mt-20">
        <div className="relative z-10">
          <Outlet /> {/* This will render nested route components */}

        {/* Conditionally show default content ONLY if no nested route is active */}
        {isDefaultContentVisible && (
          <div className="mt-10 animate-fade-in">
            <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-slide-up">
              Seek Help
            </h1>

            {/* Welcome & Description */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-100 animate-slide-up">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-xl"></div>
                <p className="text-xl text-gray-700 leading-relaxed relative">
                  Welcome to the Seek Help portal. Here you can:
                </p>
                <ul className="mt-6 space-y-4">
                  {[
                    "Request financial aid for specific situations",
                    "Check the status of your previous help requests",
                    "Upload relevant documents for verification",
                    "Communicate with administrators for support"
                  ].map((text, index) => (
                    <li key={index} className="flex items-center text-gray-700 hover:text-purple-600 transition-colors duration-300 group">
                      <div className="h-8 w-8 mr-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-300">
                        ✓
                      </div>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recent Updates */}
            <section className="mb-10 mt-12">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Recent Updates
              </h2>
              <div className="grid gap-4">
                {[
                  { date: "2025-08-01", text: "New financial aid campaign launched. Apply now!" },
                  { date: "2025-07-25", text: "Document submission deadline extended to August 15." },
                  { date: "2025-07-10", text: "Support chat hours extended to 8 PM daily." }
                ].map((update, index) => (
                  <div key={index} className="group bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-300 mr-4">
                        📅
                      </div>
                      <div>
                        <strong className="text-purple-600">{update.date}:</strong>
                        <p className="text-gray-700 mt-1">{update.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Tips & Guidelines */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
                Tips & Guidelines
              </h2>
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-purple-100">
                <ol className="space-y-4">
                  {[
                    "Provide accurate and complete information when submitting requests.",
                    "Upload clear and legible documents to speed up verification.",
                    "Check your request status regularly for updates.",
                    "Reach out to support for any difficulties or questions."
                  ].map((tip, index) => (
                    <li key={index} className="flex items-start text-gray-700 group">
                      <span className="h-8 w-8 mr-3 rounded-lg bg-gradient-to-r from-pink-500 to-indigo-500 flex items-center justify-center text-white font-bold transform group-hover:scale-110 transition-transform duration-300">
                        {index + 1}
                      </span>
                      {tip}
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* Contact Support */}
            <section className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl text-center relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Need Help?
              </h3>
              <a 
                href="/seek-help/contact" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Contact Support Team
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </section>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default SeekHelpPage;
