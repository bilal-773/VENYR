import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    if (!stripeKey) {
      console.error('Stripe publishable key not found');
      return Promise.resolve(null);
    }
    stripePromise = loadStripe(stripeKey);
  }
  return stripePromise;
};

/**
 * Create Stripe Checkout Session
 * This should be called from your backend/Supabase Edge Function
 * For now, we'll use a placeholder that you need to implement on your backend
 */
export async function createCheckoutSession(orderId: string, amount: number, currency: string = 'usd') {
  // This should call your backend API or Supabase Edge Function
  // Example: POST to /api/create-checkout-session
  
  // For now, return a placeholder
  // You'll need to implement this endpoint:
  // - Supabase Edge Function
  // - Or separate backend API
  
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      orderId,
      amount: Math.round(amount * 100), // Convert to cents
      currency,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create checkout session');
  }

  const { sessionId } = await response.json();
  return sessionId;
}

/**
 * Redirect to Stripe Checkout
 */
export async function redirectToCheckout(sessionId: string) {
  const stripe = await getStripe();
  if (!stripe) {
    throw new Error('Stripe not initialized');
  }

  const { error } = await stripe.redirectToCheckout({
    sessionId,
  });

  if (error) {
    throw error;
  }
}



