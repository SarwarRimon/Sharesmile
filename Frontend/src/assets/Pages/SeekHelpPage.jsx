import React from 'react';
import HelpSidebar from '../Components/HelpSidebar';
import { Outlet, useLocation } from 'react-router-dom';

const SeekHelpPage = () => {
  const location = useLocation();

  // Check if current path is exactly "/seek-help" (no nested route)
  const isDefaultContentVisible = location.pathname === '/seek-help';

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <HelpSidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto mt-20">
        <Outlet /> {/* This will render nested route components */}

        {/* Conditionally show default content ONLY if no nested route is active */}
        {isDefaultContentVisible && (
          <div className="mt-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 drop-shadow-lg animate-fadeIn">
              Seek Help
            </h1>

            {/* Welcome & Description */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-300 transition duration-500 ease-in-out hover:shadow-2xl hover:border-blue-400 animate-slideUp mb-10">
              <p className="text-gray-700 text-lg leading-relaxed">
                Welcome to the Seek Help portal. Here you can:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-6 space-y-3">
                <li className="hover:text-blue-600 transition-colors duration-300 cursor-pointer">
                  Request financial aid for specific situations
                </li>
                <li className="hover:text-blue-600 transition-colors duration-300 cursor-pointer">
                  Check the status of your previous help requests
                </li>
                <li className="hover:text-blue-600 transition-colors duration-300 cursor-pointer">
                  Upload relevant documents for verification
                </li>
                <li className="hover:text-blue-600 transition-colors duration-300 cursor-pointer">
                  Communicate with administrators for support
                </li>
              </ul>
            </div>

            {/* Recent Updates */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-5">Recent Updates</h2>
              <ul className="space-y-4 text-gray-700">
                <li className="p-4 bg-blue-50 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer">
                  <strong>2025-08-01:</strong> New financial aid campaign launched. Apply now!
                </li>
                <li className="p-4 bg-blue-50 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer">
                  <strong>2025-07-25:</strong> Document submission deadline extended to August 15.
                </li>
                <li className="p-4 bg-blue-50 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer">
                  <strong>2025-07-10:</strong> Support chat hours extended to 8 PM daily.
                </li>
              </ul>
            </section>

            {/* Tips & Guidelines */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-5">Tips & Guidelines</h2>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>Provide accurate and complete information when submitting requests.</li>
                <li>Upload clear and legible documents to speed up verification.</li>
                <li>Check your request status regularly for updates.</li>
                <li>Reach out to support for any difficulties or questions.</li>
              </ol>
            </section>

            {/* Contact Support */}
            <section className="bg-blue-100 rounded-xl p-6 shadow-md text-center text-blue-800 font-semibold">
              Need help? <br />
              <a href="/seek-help/contact" className="underline hover:text-blue-600 transition">
                Contact our support team
              </a>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeekHelpPage;
