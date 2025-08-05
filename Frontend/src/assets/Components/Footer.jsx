import React from "react";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-bold">Helping Hand</h2>
          <p className="mt-2">Making the world a better place, one donation at a time.</p>
          <p className="mt-2 text-gray-400">Email: support@helpinghand.org</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li><a href="/" className="hover:text-blue-400">Home</a></li>
            <li><a href="/campaigns" className="hover:text-blue-400">Campaigns</a></li>
            <li><a href="/donation" className="hover:text-blue-400">Donate</a></li>
            <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4 mt-2">
            <a href="#" className="hover:text-blue-400"><Facebook /></a>
            <a href="#" className="hover:text-blue-400"><Twitter /></a>
            <a href="#" className="hover:text-blue-400"><Instagram /></a>
            <a href="#" className="hover:text-blue-400"><Mail /></a>
          </div>
        </div>
      </div>

      <p className="text-center text-gray-500 mt-6 text-sm">© 2025 Helping Hand Foundations | All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
