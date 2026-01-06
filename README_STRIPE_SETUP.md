# Stripe Payment Integration Setup Guide

## Phase 8: Stripe Payment Configuration

To enable Stripe payments, follow these steps:

### Step 1: Get Stripe API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to **Developers** > **API keys**
3. Copy your **Publishable key** and **Secret key**
4. Add them to your `.env` file:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...  # For Edge Function only
```

### Step 2: Deploy Supabase Edge Function

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link your project:
   ```bash
   supabase link --project-ref YOUR_PROJECT_REF
   ```

4. Set Stripe secret key as environment variable:
   ```bash
   supabase secrets set STRIPE_SECRET_KEY=sk_test_...
   ```

5. Set site URL:
   ```bash
   supabase secrets set SITE_URL=https://bilal-773.github.io/VENYR
   ```

6. Deploy the Edge Function:
   ```bash
   supabase functions deploy create-checkout-session
   ```

### Step 3: Update .env File

Add your Stripe publishable key to `.env`:

```env
VITE_SUPABASE_URL=https://rjrtlumdkztayproswss.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Step 4: Restart Development Server

After adding environment variables, restart your dev server:

```bash
npm run dev
```

## Payment Flow

1. **User clicks "Place Order"** on checkout page
2. **Order created** with status `pending`
3. **Stripe Checkout Session** is created via Edge Function
4. **User redirected** to Stripe's hosted checkout page
5. **User completes payment** on Stripe
6. **User redirected back** to `/payment-success` with session ID
7. **Order status updated** to `paid` after verification

## Testing

### Test Mode

Use Stripe's test card numbers:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

Use any future expiry date, any 3-digit CVC, and any postal code.

### Production Mode

When ready for production:
1. Switch to live API keys in Stripe Dashboard
2. Update environment variables
3. Deploy Edge Function again

## Webhook (Optional but Recommended)

For production, set up Stripe webhooks to securely verify payments:

1. Go to Stripe Dashboard > **Developers** > **Webhooks**
2. Add endpoint: `https://YOUR_PROJECT.supabase.co/functions/v1/stripe-webhook`
3. Select events: `checkout.session.completed`
4. Update order status via webhook handler (more secure)

## Troubleshooting

### Edge Function Not Found
- Make sure you've deployed the function
- Check function name matches exactly

### Payment Redirect Not Working
- Verify `SITE_URL` secret is set correctly
- Check success/cancel URLs in checkout session creation

### Order Status Not Updating
- Check browser console for errors
- Verify Supabase RLS policies allow order updates
- Check Edge Function logs in Supabase Dashboard

## Files Created

- `src/lib/stripe.ts` - Stripe client initialization
- `src/lib/payments.ts` - Payment functions (create session, verify payment)
- `src/pages/PaymentSuccess.tsx` - Payment success page
- `supabase/functions/create-checkout-session/index.ts` - Edge Function for creating checkout sessions
- Updated `src/pages/Checkout.tsx` - Integrated Stripe redirect flow



