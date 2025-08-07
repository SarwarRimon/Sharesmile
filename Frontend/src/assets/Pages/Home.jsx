import React from "react";
import { Link } from "react-router-dom"; // Import Link

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 text-gray-800">
      {/* Banner Image */}
      <section className="flex justify-center pt-20 px-4">
        <img
          src="/images/CoU.png"
          alt="ShareSmile Banner"
          className="w-[80%] max-w-6xl rounded-3xl shadow-2xl object-cover"
        />
      </section>

      {/* Website Description */}
      <section className="max-w-4xl mx-auto px-6 py-10 text-center">
        <h2 className="text-3xl font-serif font-bold mb-4 text-blue-700">
          Welcome to ShareSmile 💙
        </h2>
        <p className="text-lg font-sans text-gray-700 leading-relaxed">
          ShareSmile is a community-driven donation platform created for the students, teachers, and staff of Comilla University. 
          Our mission is to bridge the gap between helpseekers and donors by providing a secure, transparent, and easy-to-use platform.
          Whether it’s emergency aid, educational support, or campus welfare, ShareSmile empowers everyone to give back and make a difference.
        </p>
      </section>

      {/* Mission, Planning, Previous Work Section */}
      <section className="bg-white py-14 px-6">
        <h3 className="text-2xl font-serif text-center text-blue-600 mb-8 font-bold">
          Our Focus Areas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Mission Box */}
          <div className="bg-blue-100 p-6 rounded-xl shadow-lg transition hover:shadow-blue-300">
            <h4 className="text-xl font-semibold text-blue-700 mb-3">🎯 Our Mission</h4>
            <p className="text-gray-700">
              To create a reliable donation gateway within Comilla University that enables transparent, accountable, and impactful giving...
            </p>
            <Link
              to="/mission"
              className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-semibold"
            >
              Read More →
            </Link>
          </div>

          {/* Planning Box */}
          <div className="bg-blue-100 p-6 rounded-xl shadow-lg transition hover:shadow-blue-300">
            <h4 className="text-xl font-semibold text-blue-700 mb-3">📅 Our Planning</h4>
            <p className="text-gray-700">
              - Launch verified donation campaigns <br />
              - Offer real-time tracking of donation progress <br />
              - Implement secure payment methods like bKash, Rocket...
            </p>
            <Link
              to="/planning"
              className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-semibold"
            >
              Read More →
            </Link>
          </div>

          {/* Previous Work Box */}
          <div className="bg-blue-100 p-6 rounded-xl shadow-lg transition hover:shadow-blue-300">
            <h4 className="text-xl font-semibold text-blue-700 mb-3">📌 Previous Works</h4>
            <p className="text-gray-700">
              ✅ Supported 20+ emergency fund campaigns<br />
              ✅ Helped students afford semester fees during crisis...
            </p>
            <Link
              to="/previous-works"
              className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-semibold"
            >
              Read More →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
