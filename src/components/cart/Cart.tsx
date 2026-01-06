import { X, Plus, Minus, ShoppingBag, ArrowRight, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/priceFormatter';

export function Cart() {
  const navigate = useNavigate();
  const { items, isOpen, isLoading, closeCart, removeItem, updateQuantity, subtotal } = useCart();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50"
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Cart Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-background z-50 shadow-[0_0_60px_rgba(139,30,63,0.3)]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <h2 className="font-serif text-xl">Your Cart</h2>
                  {items.length > 0 && (
                    <motion.span
                      className="text-xs text-muted-foreground"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                    >
                      ({items.length} items)
                    </motion.span>
                  )}
                </div>
                <motion.button
                  onClick={closeCart}
                  className="btn-ghost p-2 rounded-full hover:bg-primary/10"
                  aria-label="Close cart"
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </motion.button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
                    <p className="text-muted-foreground">Loading cart...</p>
                  </div>
                ) : items.length === 0 ? (
                  <motion.div
                    className="flex flex-col items-center justify-center h-full p-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <ShoppingBag className="w-8 h-8 text-primary" strokeWidth={1.5} />
                    </motion.div>
                    <h3 className="font-serif text-xl mb-2">Your cart is empty</h3>
                    <p className="text-muted-foreground text-sm mb-8 max-w-xs">
                      Discover our collection of premium watches and handcrafted boots.
                    </p>
                    <Link
                      to="/watches"
                      onClick={closeCart}
                      className="btn-primary inline-flex items-center gap-2"
                    >
                      Start Shopping
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                ) : (
                  <ul className="divide-y divide-border">
                    <AnimatePresence mode="popLayout">
                      {items.map((item, index) => (
                        <motion.li
                          key={item.id}
                          className="p-6 flex gap-5"
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 100 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          layout
                        >
                          <div className="w-24 h-28 bg-secondary rounded-xl overflow-hidden flex-shrink-0 border border-border">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-muted-foreground text-xs mt-1">Size: {item.size}</p>
                            <p className="font-medium text-primary mt-2">{formatPrice(item.price)}</p>

                            <div className="flex items-center justify-between mt-auto pt-3">
                              <div className="flex items-center border border-border rounded-lg overflow-hidden">
                                <motion.button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-2 hover:bg-primary/10 transition-colors"
                                  aria-label="Decrease quantity"
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Minus className="w-3 h-3" />
                                </motion.button>
                                <motion.span
                                  className="px-4 text-sm font-medium min-w-[40px] text-center"
                                  key={item.quantity}
                                  initial={{ scale: 1.5, color: 'hsl(343, 62%, 33%)' }}
                                  animate={{ scale: 1, color: 'inherit' }}
                                  transition={{ duration: 0.3 }}
                                >
                                  {item.quantity}
                                </motion.span>
                                <motion.button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-2 hover:bg-primary/10 transition-colors"
                                  aria-label="Increase quantity"
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Plus className="w-3 h-3" />
                                </motion.button>
                              </div>
                              <motion.button
                                onClick={() => removeItem(item.id)}
                                className="text-muted-foreground hover:text-primary text-xs transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                Remove
                              </motion.button>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <motion.div
                  className="border-t border-border p-6 space-y-5 bg-secondary/30"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex justify-between items-baseline">
                    <span className="text-muted-foreground text-sm">Subtotal</span>
                    <motion.span
                      className="font-serif text-2xl text-primary"
                      key={subtotal}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {formatPrice(Math.round(subtotal))}
                    </motion.span>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <button 
                    onClick={handleCheckout}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    Checkout
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={closeCart}
                    className="btn-secondary w-full"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
