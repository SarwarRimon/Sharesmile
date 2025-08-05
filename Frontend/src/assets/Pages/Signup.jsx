import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaUserTag } from "react-icons/fa";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "donor",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", password: "", role: "donor" });
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Network or Server error");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-pink-200 via-purple-200 to-blue-200 px-4">
      <div className="bg-white/30 backdrop-blur-lg shadow-2xl rounded-2xl w-full max-w-md p-8 sm:p-10 border border-white/40">
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
          Create Your Account
        </h2>

        {isSubmitted && (
          <p className="text-green-600 text-center font-medium mb-4">
            ✅ Registration successful!
          </p>
        )}
        {error && (
          <p className="text-red-600 text-center font-medium mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FaUser className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/60 placeholder-gray-600"
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/60 placeholder-gray-600"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/60 placeholder-gray-600"
            />
          </div>

          <div className="relative">
            <FaUserTag className="absolute left-3 top-3.5 text-gray-400" />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/60 text-gray-700"
            >
              <option value="donor">Donor</option>
              <option value="helpseeker">Helpseeker</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
