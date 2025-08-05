import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Loginpage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Handle input changes for email and password
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    setSuccess(false);

    try {
      // Make API request to backend for login
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setIsLoading(false);

      if (response.ok) {
        // Store token and user role in localStorage after successful login
        localStorage.setItem('token', data.token);  // Store JWT token
        localStorage.setItem('user', JSON.stringify(data.user));  // Store user data (including role)

        // Call login function from AuthContext (update context state)
        login(data.token);

        setSuccess(true);
        setTimeout(() => {
          // Redirect user based on role or default route (e.g., dashboard)
          navigate(data.user.role === 'admin' ? '/admin-dashboard' : '/dashboard');
        }, 2000);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch {
      setIsLoading(false);
      setError('Network or server error');
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Login</h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {success && <p className="text-green-600 text-center mb-4">You have successfully logged in! 🎉</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-semibold text-blue-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold text-blue-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 font-semibold">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Loginpage;
