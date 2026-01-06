import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { createOrder } from '@/lib/orders';
import { createCheckoutSession } from '@/lib/payments';
import { redirectToCheckout } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { 
  ChevronLeft, 
  Loader2, 
  Check, 
  CreditCard, 
  MapPin, 
  Mail, 
  Phone,
  Lock,
  Truck,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/priceFormatter';

export default function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, subtotal, isLoading: cartLoading, refreshCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (!cartLoading && items.length === 0 && !orderSuccess) {
      toast.error('Your cart is empty');
      navigate('/');
      return;
    }
  }, [items, cartLoading, orderSuccess, navigate]);

  // Calculate totals
  const shipping = subtotal > 41700 ? 0 : 1000; // Free shipping over Rs. 41,700
  const tax = Math.round(subtotal * 0.18); // 18% tax
  const total = subtotal + shipping + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsProcessing(true);

    try {
      // Step 1: Get current authenticated user from Supabase
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      // Step 2: Create order with status 'pending'
      // createOrder will get user.id directly from Supabase auth
      const order = await createOrder(items);
      setOrderId(order.id);
      
      // Step 3: Create Stripe Checkout Session
      const { sessionId } = await createCheckoutSession(
        order.id,
        total,
        authUser?.id ?? null,
        'usd' // or 'pkr' if using PKR
      );

      // Step 3: Redirect to Stripe Checkout
      await redirectToCheckout(sessionId);
      
      // Note: User will be redirected to Stripe, then back to /payment-success
      // Cart will be cleared after successful payment
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast.error('Failed to process checkout', {
        description: error.message || 'Please try again.',
        duration: 5000,
      });
      setIsProcessing(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  if (cartLoading) {
    return (
      <Layout>
        <div className="container-main pt-32 pb-24 min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-main pt-24 pb-16 md:pt-32 md:pb-24">
        {/* Breadcrumb */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-10 transition-colors duration-200"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-[0_0_40px_rgba(139,30,63,0.05)]"
            >
              <h2 className="font-serif text-2xl md:text-3xl mb-8">Checkout</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Shipping Information */}
                <div>
                  <h3 className="font-medium text-lg mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Shipping Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                        Full Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="input-field w-full"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email <span className="text-primary">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-field w-full"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone <span className="text-primary">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="input-field w-full"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium mb-2">
                        City <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="input-field w-full"
                        placeholder="New York"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium mb-2">
                        Address <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="input-field w-full"
                        placeholder="123 Main Street"
                      />
                    </div>
                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium mb-2">
                        Postal Code <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                        className="input-field w-full"
                        placeholder="10001"
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium mb-2">
                        Country <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="input-field w-full"
                        placeholder="United States"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method (Placeholder) */}
                <div>
                  <h3 className="font-medium text-lg mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Payment Method
                  </h3>
                  <div className="bg-secondary/50 border border-border rounded-xl p-6">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Secure Payment</p>
                        <p className="text-sm text-muted-foreground">
                          Payment processing will be integrated in the next phase.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isProcessing || items.length === 0}
                  className={cn(
                    'btn-primary w-full py-5 text-base flex items-center justify-center gap-3',
                    (isProcessing || items.length === 0) && 'opacity-50 cursor-not-allowed'
                  )}
                  whileHover={!isProcessing && items.length > 0 ? { scale: 1.02 } : {}}
                  whileTap={!isProcessing && items.length > 0 ? { scale: 0.98 } : {}}
                >
                  <AnimatePresence mode="wait">
                    {isProcessing ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3"
                      >
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Processing Order...</span>
                      </motion.div>
                    ) : (
                      <motion.span
                        key="default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Lock className="w-5 h-5" />
                        Place Order
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-[0_0_40px_rgba(139,30,63,0.05)] sticky top-32"
            >
              <h3 className="font-serif text-xl mb-6">Order Summary</h3>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-20 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Size: {item.size}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-primary font-medium mt-1">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-primary font-medium">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between items-baseline">
                  <span className="font-medium">Total</span>
                  <span className="font-serif text-2xl text-primary">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-border space-y-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Truck className="w-4 h-4 text-primary" />
                  <span>Free shipping over Rs. 41,700</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

