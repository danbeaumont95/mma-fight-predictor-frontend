import { loadStripe } from '@stripe/stripe-js';

let stripePromise;
const getStripe = (publishing_id) => {
  if (!stripePromise) {
    stripePromise = loadStripe(publishing_id);
  }
  return stripePromise;
};

export default getStripe;
