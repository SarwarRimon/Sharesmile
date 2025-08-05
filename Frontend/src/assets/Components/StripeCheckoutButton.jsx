import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51RD7L6GamVKUzLiW3g3OxW6RPoFvD7sQHlEQMFTu0SA0tcC8i3A1cgqnaAs5EsD7qui2NaDn6oQiAUc1db46RAUr00ozwIY43Y');

const StripeCheckoutButton = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripeCheckoutButton;
