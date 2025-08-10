import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';

const DonationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const queryParams = new URLSearchParams(location.search);
  const campaignTitle = queryParams.get('campaign');
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionId, setTransactionId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/donations', {
        campaignTitle,
        amount: parseFloat(amount),
        paymentMethod,
        transactionId
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        alert('Donation successful! Thank you for your contribution.');
        navigate('/campaigns');
      }
    } catch (error) {
      console.error('Donation error:', error);
      alert('Error processing donation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-20 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
          Make a Donation
        </h2>
        
        {campaignTitle && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Campaign: {decodeURIComponent(campaignTitle)}
            </h3>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Donation Amount (BDT)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              required
              min="1"
              placeholder="Enter donation amount"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Payment Method</label>
            <div className="grid grid-cols-2 gap-4">
              {['bKash', 'Rocket', 'Nagad', 'Bank Transfer'].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`p-4 border rounded-lg flex items-center justify-center ${
                    paymentMethod === method 
                      ? 'border-purple-500 bg-purple-50 text-purple-700' 
                      : 'border-gray-200 hover:border-purple-500 hover:bg-purple-50'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {paymentMethod && (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Transaction ID</label>
                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder={`Enter your ${paymentMethod} transaction ID`}
                />
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Payment Instructions:</h4>
                {paymentMethod === 'Bank Transfer' ? (
                  <div className="text-sm text-blue-700">
                    <p>Bank: Bangladesh Bank</p>
                    <p>Account Name: ShareSmile Foundation</p>
                    <p>Account Number: 1234-5678-9012-3456</p>
                    <p>Branch: Main Branch, Dhaka</p>
                  </div>
                ) : (
                  <div className="text-sm text-blue-700">
                    <p>{paymentMethod} Number: 01XXX-XXXXXX</p>
                    <p>Account Type: Merchant</p>
                    <p>Please use your registered phone number for the transaction.</p>
                  </div>
                )}
              </div>
              <label className="block text-gray-700 mb-2">Transaction ID</label>
              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                required
                placeholder="Enter your transaction ID"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !paymentMethod || !amount || !transactionId}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Complete Donation'}
          </button>
        </form>

        {paymentMethod && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Payment Instructions:</h4>
            {paymentMethod === 'bKash' && (
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Open your bKash app</li>
                <li>Send money to: 01XXXXXXXXX</li>
                <li>Copy the transaction ID</li>
                <li>Paste the transaction ID above</li>
              </ol>
            )}
            {paymentMethod === 'Rocket' && (
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Open your Rocket app</li>
                <li>Send money to: 01XXXXXXXXX</li>
                <li>Copy the transaction ID</li>
                <li>Paste the transaction ID above</li>
              </ol>
            )}
            {paymentMethod === 'Nagad' && (
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Open your Nagad app</li>
                <li>Send money to: 01XXXXXXXXX</li>
                <li>Copy the transaction ID</li>
                <li>Paste the transaction ID above</li>
              </ol>
            )}
            {paymentMethod === 'Bank Transfer' && (
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Bank: Example Bank</li>
                <li>Account Name: ShareSmile Foundation</li>
                <li>Account Number: XXXXXXXXXXXXXXX</li>
                <li>Enter the transfer reference number as transaction ID</li>
              </ol>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationPage;
