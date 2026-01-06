import { supabase } from "./supabase";

/**
 * Create Stripe Checkout Session using Supabase Edge Function
 */
export async function createCheckoutSession(
  orderId: string,
  amount: number,
  userId: string | null,
  currency: string = 'usd'
): Promise<{ sessionId: string; url: string }> {
  const { data, error } = await supabase.functions.invoke('create-checkout-session', {
    body: {
      orderId,
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      userId,
      successUrl: `${window.location.origin}/#/payment-success?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
      cancelUrl: `${window.location.origin}/#/checkout?cancelled=true`,
    },
  });

  if (error) {
    console.error('Error creating checkout session:', error);
    throw new Error(error.message || 'Failed to create checkout session');
  }

  return data;
}

/**
 * Verify payment and update order status
 */
export async function verifyPaymentAndUpdateOrder(
  sessionId: string,
  orderId: string
): Promise<void> {
  // Update order status to 'paid'
  // Note: In production, you should verify the payment via Stripe webhook for security
  // This is a simplified version that updates directly
  
  const { error } = await supabase
    .from("orders")
    .update({ status: 'paid' })
    .eq("id", orderId);

  if (error) {
    console.error('Error updating order status:', error);
    throw error;
  }

  // Clear cart after successful payment
  // Get user_id from order first
  const { data: order } = await supabase
    .from("orders")
    .select("user_id")
    .eq("id", orderId)
    .single();

  if (order && order.user_id) {
    // Only clear cart if user is logged in (user_id is not null)
    // For guest checkout, cart is stored in local state and will be cleared by CartContext
    const { error: cartError } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", order.user_id);

    if (cartError) {
      console.error('Error clearing cart:', cartError);
      // Don't throw - order is already updated to paid
    }
  }
  // For guest orders (user_id is null), cart clearing is handled by CartContext
}

/**
 * Handle payment success
 */
export async function handlePaymentSuccess(sessionId: string, orderId: string): Promise<void> {
  try {
    // Update order status to 'paid'
    await verifyPaymentAndUpdateOrder(sessionId, orderId);
  } catch (error: any) {
    console.error('Error handling payment success:', error);
    throw error;
  }
}

