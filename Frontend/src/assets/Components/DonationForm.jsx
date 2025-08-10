import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const DonationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const campaign = location.state?.campaign;
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    amount: '',
    paymentMethod: '',
    transactionId: ''
  });

  // Redirect if not logged in or not a donor
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || storedUser.role !== 'donor') {
      navigate('/login');
    }
  }, [navigate]);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Check if we have campaign data
  useEffect(() => {
    if (!location.state || !campaign) {
      navigate('/campaigns');
    }
  }, [location.state, campaign, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');

      // Validate user authentication
      if (!storedUser || !token) {
        throw new Error('Please login to make a donation');
      }

      if (storedUser.role !== 'donor') {
        throw new Error('Only donors can make donations');
      }

      // Validate campaign
      if (!campaign || !campaign.id) {
        throw new Error('Invalid campaign information');
      }

      // Validate form data
      if (!formData.amount || parseFloat(formData.amount) <= 0) {
        throw new Error('Please enter a valid amount');
      }

      if (!formData.paymentMethod) {
        throw new Error('Please select a payment method');
      }

      if (!formData.transactionId) {
        throw new Error('Please enter the transaction ID');
      }

      const requestBody = {
        campaign_id: campaign.id,
        donor_id: storedUser.id,
        amount: parseFloat(formData.amount),
        payment_method: formData.paymentMethod,
        transaction_id: formData.transactionId
      };
      
      console.log('Making donation request:', requestBody);
      const response = await fetch('http://localhost:5000/api/donations/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error('Server returned an unexpected response');
      }

      if (!response.ok) {
        throw new Error(data.message || 'Failed to process donation');
      }

      console.log('Donation successful:', data);
      
      setSuccess('Thank you! Your donation has been recorded and is pending approval.');
      setFormData({
        amount: '',
        paymentMethod: '',
        transactionId: ''
      });
      
      setTimeout(() => {
        navigate('/campaigns');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!campaign) {
    return <div className="text-center mt-8">No campaign information found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-center">Make a Donation</h2>
        
        {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
        {success && <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-gray-50 p-3 rounded">
            <label className="text-sm font-medium text-gray-700">Campaign</label>
            <div className="font-medium">{campaign?.title}</div>
            {campaign?.image && (
              <img 
                src={campaign.image} 
                alt={campaign.title} 
                className="mt-2 w-full h-32 object-cover rounded"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/education.jpg';
                }}
              />
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Amount (Tk)</label>
            <input
              type="number"
              name="amount"
              required
              min="1"
              value={formData.amount}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded focus:ring-1 focus:ring-purple-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Payment Method</label>
            <select
              name="paymentMethod"
              required
              value={formData.paymentMethod}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded focus:ring-1 focus:ring-purple-500"
            >
              <option value="">Select payment method</option>
              <option value="bKash">bKash</option>
              <option value="Rocket">Rocket</option>
              <option value="Nagad">Nagad</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
            {formData.paymentMethod && (
              <p className="mt-1 text-sm text-gray-500">
                Please enter the {formData.paymentMethod} transaction ID below
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Transaction ID</label>
            <input
              type="text"
              name="transactionId"
              required
              value={formData.transactionId}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded focus:ring-1 focus:ring-purple-500"
              placeholder="Enter transaction ID"
            />
          </div>

          <div className="flex gap-2 mt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 p-2 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 p-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Confirm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonationForm;
