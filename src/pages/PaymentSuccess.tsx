import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { handlePaymentSuccess } from '@/lib/payments';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { Check, Loader2, Package, ArrowRight } from 'lucide-react';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { refreshCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const sessionId = searchParams.get('session_id');
  const orderIdParam = searchParams.get('order_id');

  useEffect(() => {
    if (!sessionId || !orderIdParam) {
      toast.error('Invalid payment session');
      navigate('/');
      return;
    }

    setOrderId(orderIdParam);
    processPayment();
  }, [sessionId, orderIdParam, navigate]);

  const processPayment = async () => {
    if (!sessionId || !orderIdParam) return;

    setIsProcessing(true);

    try {
      // Step 1: Update order status to 'paid'
      await handlePaymentSuccess(sessionId, orderIdParam);
      
      // Step 2: Clear cart (already cleared on order creation, but refresh to be sure)
      await refreshCart();
      
      setIsSuccess(true);
      toast.success('Payment successful!', {
        description: 'Your order has been confirmed.',
        duration: 5000,
      });

      // Redirect to orders page after 3 seconds
      setTimeout(() => {
        navigate('/orders');
      }, 3000);
    } catch (error: any) {
      console.error('Payment processing error:', error);
      toast.error('Payment verification failed', {
        description: error.message || 'Please contact support if payment was processed.',
        duration: 10000,
      });
      setIsSuccess(false);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Layout>
      <div className="container-main pt-32 pb-24 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full text-center"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto mb-6" />
              <h1 className="font-serif text-4xl md:text-5xl mb-4">Processing Payment...</h1>
              <p className="text-muted-foreground text-lg">
                Please wait while we verify your payment.
              </p>
            </>
          ) : isSuccess ? (
            <>
              <motion.div
                className="w-24 h-24 bg-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <Check className="w-12 h-12 text-white" strokeWidth={3} />
              </motion.div>
              <h1 className="font-serif text-4xl md:text-5xl mb-4">Payment Successful!</h1>
              <p className="text-muted-foreground text-lg mb-2">
                Thank you for your purchase.
              </p>
              {orderId && (
                <p className="text-sm text-muted-foreground mb-8">
                  Order ID: #{orderId.slice(0, 8).toUpperCase()}
                </p>
              )}
              <p className="text-muted-foreground mb-8">
                Your order has been confirmed and will be processed shortly.
              </p>
              <div className="flex gap-4 justify-center">
                <Link to="/orders" className="btn-primary inline-flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  View Orders
                </Link>
                <Link to="/" className="btn-secondary inline-flex items-center gap-2">
                  Continue Shopping
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-12 h-12 text-red-600" strokeWidth={2} />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl mb-4">Payment Verification Failed</h1>
              <p className="text-muted-foreground text-lg mb-8">
                There was an issue verifying your payment. Please contact support if your payment was processed.
              </p>
              <div className="flex gap-4 justify-center">
                <Link to="/orders" className="btn-primary inline-flex items-center gap-2">
                  View Orders
                </Link>
                <Link to="/" className="btn-secondary inline-flex items-center gap-2">
                  Go Home
                </Link>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}

