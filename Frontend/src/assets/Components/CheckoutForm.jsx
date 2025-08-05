import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import axios from 'axios';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data: clientSecret } = await axios.post('http://localhost:5000/create-payment-intent', {
      amount: 50000, // amount in paisa (500.00 Taka = 50000 paisa)
    });

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      alert(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        alert('Payment Successful! 🎉');
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <CardElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
      >
        {loading ? 'Processing...' : 'Pay ৳500'}
      </button>
    </form>
  );
};

export default CheckoutForm;
