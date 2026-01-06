import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Heart, ShoppingBag } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice } from '@/lib/priceFormatter';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { user } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    // Check if user is logged in
    if (!user) {
      toast.error('Please log in', {
        description: 'You need to be logged in to add items to cart.',
        action: {
          label: 'Login',
          onClick: () => {
            onClose();
            navigate('/login');
          },
        },
        duration: 5000,
      });
      return;
    }

    addItem({
      product_id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      category: product.category,
    }, quantity);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-foreground/70 backdrop-blur-sm z-[90]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-6xl md:w-full md:max-h-[90vh] bg-background rounded-2xl shadow-2xl z-[100] overflow-hidden flex flex-col"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center z-10 hover:bg-primary/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid lg:grid-cols-2 flex-1 overflow-auto">
              {/* Image Section */}
              <div className="relative bg-secondary p-8">
                <div className="sticky top-8">
                  <div className="aspect-square rounded-xl overflow-hidden bg-secondary mb-4">
                    <img
                      src={product.images[selectedImage] || product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {product.images.length > 1 && (
                    <div className="flex gap-3">
                      {product.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={cn(
                            'w-20 h-20 rounded-lg overflow-hidden border-2 transition-all',
                            selectedImage === index ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                          )}
                        >
                          <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Details Section */}
              <div className="p-8 overflow-auto">
                <div className="max-w-lg mx-auto space-y-6">
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      {product.category === 'watches' ? 'Timepiece' : 'Footwear'}
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl mt-2">{product.name}</h2>
                    <p className="text-2xl text-primary mt-4">{formatPrice(product.price)}</p>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">{product.description}</p>

                  {/* Size Selector */}
                  {product.sizes.length > 1 && (
                    <div>
                      <label className="text-sm font-medium mb-3 block">Size</label>
                      <div className="flex flex-wrap gap-2">
                        {product.sizes.map(size => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={cn(
                              'px-4 py-2 border-2 rounded-xl text-sm font-medium transition-all',
                              selectedSize === size
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'border-border hover:border-primary/50'
                            )}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">Quantity</label>
                    <div className="flex items-center border-2 border-border rounded-xl w-fit">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 hover:bg-primary/10"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-6 font-medium">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-3 hover:bg-primary/10"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleAddToCart}
                      disabled={!user}
                      className={cn(
                        'btn-primary flex-1 flex items-center justify-center gap-2 py-4',
                        !user && 'opacity-50 cursor-not-allowed'
                      )}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      {user ? 'Add to Cart' : 'Login to Add'}
                    </button>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={cn(
                        'w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all',
                        isWishlisted
                          ? 'bg-primary border-primary text-primary-foreground'
                          : 'border-border hover:border-primary'
                      )}
                      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <Heart
                        className="w-5 h-5"
                        fill={isWishlisted ? 'currentColor' : 'none'}
                        strokeWidth={2}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


