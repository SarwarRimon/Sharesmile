import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Card, Button, GradientText } from '../Components/common';
import { themeColors, combineClasses } from '../Components/theme';

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
            navigate('/admin/dashboard');
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
    <section className={combineClasses("flex items-center justify-center min-h-screen", themeColors.bgGradient.light, themeColors.animation.fadeIn)}>
      <div className="w-full max-w-md">
        <Card className={themeColors.animation.slideUp}>
          <div className="text-center mb-8">
            <GradientText as="h2" className="text-3xl font-bold mb-2">
              Welcome Back
            </GradientText>
            <p className="text-gray-600">Sign in to continue to ShareSmile</p>
          </div>

          {error && (
            <div className={combineClasses("mb-6 p-4 rounded-lg", themeColors.animation.slideUp)}>
              <p className="text-red-600 text-center text-sm">{error}</p>
            </div>
          )}
          
          {success && (
            <div className={combineClasses("mb-6 p-4 rounded-lg bg-green-50 border border-green-100", themeColors.animation.slideUp)}>
              <p className="text-green-600 text-center text-sm">You have successfully logged in! 🎉</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={combineClasses(themeColors.input.base, themeColors.input.focus)}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={combineClasses(themeColors.input.base, themeColors.input.focus)}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className={combineClasses(
                    "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400",
                    themeColors.interactive.base
                  )}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-3"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Signing in...</span>
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <a 
                href="/signup" 
                className={combineClasses("font-medium", themeColors.textGradient, themeColors.interactive.base)}
              >
                Create Account
              </a>
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Loginpage;
