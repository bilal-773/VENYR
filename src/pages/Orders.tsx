import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { getUserOrders, getOrderWithItems } from '@/lib/orders';
import { toast } from 'sonner';
import { 
  Package, 
  Loader2, 
  ChevronLeft,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/priceFormatter';

interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_order: number;
  products?: {
    id: string;
    name: string;
    image: string;
    images: string[];
  };
}

interface Order {
  id: string;
  user_id: string;
  total: number;
  status: "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled";
  created_at: string;
  order_items?: OrderItem[];
}

const statusConfig = {
  pending: {
    label: 'Pending Payment',
    icon: Clock,
    color: 'text-yellow-600 bg-yellow-100',
  },
  paid: {
    label: 'Paid',
    icon: CheckCircle,
    color: 'text-green-600 bg-green-100',
  },
  processing: {
    label: 'Processing',
    icon: Package,
    color: 'text-blue-600 bg-blue-100',
  },
  shipped: {
    label: 'Shipped',
    icon: Truck,
    color: 'text-purple-600 bg-purple-100',
  },
  delivered: {
    label: 'Delivered',
    icon: CheckCircle,
    color: 'text-green-600 bg-green-100',
  },
  cancelled: {
    label: 'Cancelled',
    icon: XCircle,
    color: 'text-red-600 bg-red-100',
  },
};

export default function Orders() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [loadingItems, setLoadingItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user) {
      toast.error('Please log in to view orders');
      navigate('/login');
      return;
    }

    loadOrders();
  }, [user, navigate]);

  const loadOrders = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const userOrders = await getUserOrders(user.id);
      
      // Fetch order items for each order
      const ordersWithItems = await Promise.all(
        userOrders.map(async (order) => {
          try {
            const { order: orderData, items } = await getOrderWithItems(order.id);
            return {
              ...order,
              order_items: items,
            };
          } catch (error) {
            console.error(`Error loading items for order ${order.id}:`, error);
            return order;
          }
        })
      );
      
      setOrders(ordersWithItems);
    } catch (error: any) {
      console.error('Error loading orders:', error);
      toast.error('Failed to load orders', {
        description: error.message || 'Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleOrder = async (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
      return;
    }

    setExpandedOrder(orderId);

    // Load items if not already loaded
    const order = orders.find(o => o.id === orderId);
    if (order && !order.order_items) {
      setLoadingItems(prev => new Set(prev).add(orderId));
      try {
        const { items } = await getOrderWithItems(orderId);
        setOrders(prev =>
          prev.map(o =>
            o.id === orderId ? { ...o, order_items: items } : o
          )
        );
      } catch (error: any) {
        console.error('Error loading order items:', error);
        toast.error('Failed to load order items', {
          description: error.message || 'Please try again.',
        });
      } finally {
        setLoadingItems(prev => {
          const next = new Set(prev);
          next.delete(orderId);
          return next;
        });
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
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
        {/* Header */}
        <div className="mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl mb-2">My Orders</h1>
          <p className="text-muted-foreground">
            View and track your order history
          </p>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <motion.div
              className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Package className="w-10 h-10 text-primary" strokeWidth={1.5} />
            </motion.div>
            <h2 className="font-serif text-2xl mb-2">No Orders Yet</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Start shopping to see your orders here.
            </p>
            <Link to="/watches" className="btn-primary inline-flex items-center gap-2">
              Start Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => {
              const StatusIcon = statusConfig[order.status].icon;
              const statusLabel = statusConfig[order.status].label;
              const statusColor = statusConfig[order.status].color;
              const isExpanded = expandedOrder === order.id;
              const isLoadingItems = loadingItems.has(order.id);

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-[0_0_40px_rgba(139,30,63,0.1)] transition-all duration-300"
                >
                  {/* Order Header */}
                  <div
                    className="p-6 cursor-pointer"
                    onClick={() => toggleOrder(order.id)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="font-serif text-xl">Order #{order.id.slice(0, 8).toUpperCase()}</h3>
                          <span
                            className={cn(
                              'px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5',
                              statusColor
                            )}
                          >
                            <StatusIcon className="w-3 h-3" />
                            {statusLabel}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          Placed on {formatDate(order.created_at)}
                        </p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground mb-1">Total</p>
                          <p className="font-serif text-2xl text-primary">
                            {formatPrice(order.total)}
                          </p>
                        </div>
                        <motion.button
                          className={cn(
                            'p-2 rounded-lg border border-border hover:bg-primary/10 transition-colors',
                            isExpanded && 'bg-primary/10 border-primary'
                          )}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Eye className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Order Items (Expanded) */}
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-border"
                    >
                      {isLoadingItems ? (
                        <div className="p-8 text-center">
                          <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Loading items...</p>
                        </div>
                      ) : order.order_items && order.order_items.length > 0 ? (
                        <div className="p-6 space-y-4">
                          <h4 className="font-medium text-sm uppercase tracking-wider text-muted-foreground">
                            Order Items
                          </h4>
                          <div className="space-y-4">
                            {order.order_items.map((item) => (
                              <div
                                key={item.id}
                                className="flex gap-4 p-4 bg-secondary/50 rounded-xl"
                              >
                                <div className="w-20 h-24 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                                  <img
                                    src={
                                      item.products?.image ||
                                      item.products?.images?.[0] ||
                                      '/placeholder.svg'
                                    }
                                    alt={item.products?.name || 'Product'}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h5 className="font-medium text-sm mb-1">
                                    {item.products?.name || 'Product'}
                                  </h5>
                                  <p className="text-xs text-muted-foreground mb-2">
                                    Quantity: {item.quantity}
                                  </p>
                                  <p className="font-medium text-primary">
                                    {formatPrice(item.price_at_order)} each
                                  </p>
                                  <p className="text-sm font-medium mt-2">
                                    Subtotal: {formatPrice(item.price_at_order * item.quantity)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="p-8 text-center">
                          <p className="text-sm text-muted-foreground">No items found</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}

