import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const Thanks = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg text-center">
        <CheckCircle className="text-green-500 mx-auto" size={50} />
        <h2 className="text-3xl font-bold text-green-600 mt-3">Thank You!</h2>
        <p className="text-gray-600 mt-2">Your donation has been successfully processed.</p>
        <Link to="/" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-500">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Thanks;
