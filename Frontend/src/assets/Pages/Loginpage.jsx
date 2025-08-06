import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Loginpage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    setSuccess(false);

    try {
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
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        login(data.token);
        setSuccess(true);

        setTimeout(() => {
          if (data.user.role === 'admin') {
            navigate('/admin-dashboard');
          } else if (data.user.role === 'helpseeker') {
            navigate('/helpseeker-dashboard');
          } else if (data.user.role === 'donor') {
            navigate('/donor-dashboard');
          } else {
            navigate('/dashboard');
          }
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
    <section
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url("/images/loginbg.jpg")`,
      }}
    >
      <div className="w-full max-w-md p-8 rounded-2xl bg-black/50 shadow-sky-50 backdrop-blur-xs border border-white/30 transition duration-300 ease-in-out hover:shadow-blue-300">

        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Login</h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {success && <p className="text-green-600 text-center mb-4">You have successfully logged in! 🎉</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg  text-blue-200 font-bold">Email</label>
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

          <div className="relative">
            <label className="block text-lg  text-blue-200 font-bold">Password</label>
  <input
    type={showPassword ? 'text' : 'password'}
    name="password"
    value={formData.password}
    onChange={handleChange}
    required
    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 pr-10"
    placeholder="Enter your password"
  />
  <div 
    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-blue-600 "
    onClick={() => setShowPassword((prev) => !prev)}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </div>
</div>


          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 m-2 rounded-md hover:bg-blue-700 transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-white">
            Don't have an account?{' '}<br></br>
            <a href="/signup" className="text-blue-600 font-semibold text-l">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Loginpage;
