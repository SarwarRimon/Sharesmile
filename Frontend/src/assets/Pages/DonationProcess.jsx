import React from "react";
import { CheckCircle, CreditCard, Banknote, Wallet } from "lucide-react";
import { Link } from "react-router-dom"; // For step links

const DonationProcess = () => {
  const steps = [
    { id: 1, title: "Choose a Cause", icon: <CheckCircle />, link: "/campaigns" },
    { id: 2, title: "Enter Donation Amount", icon: <Banknote />, link: "/donation" },
    { id: 3, title: "Select Payment Method", icon: <CreditCard />, link: "/donation" },
    { id: 4, title: "Confirm & Donate", icon: <Wallet />, link: "/donation" },
  ];

  return (
    <div className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-blue-700">How to Donate</h2>
        <p className="text-gray-600 mt-2">Follow these simple steps to make a contribution.</p>

        {/* Donation Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
          {steps.map((step) => (
            <Link to={step.link} key={step.id} className="group">
              <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center transform transition-transform hover:scale-105">
                <div className="text-blue-600 text-5xl mb-4">{step.icon}</div>
                <h3 className="mt-3 text-lg font-semibold text-gray-700 group-hover:text-blue-600">{step.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonationProcess;
