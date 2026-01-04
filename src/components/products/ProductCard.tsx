import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, ShoppingBag, Plus, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/priceFormatter';

interface ProductCardProps {
  product: Product;
  className?: string;
  index?: number;
}

export function ProductCard({ product, className, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.sizes[0],
      category: product.category,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <motion.div
      className={cn(
        'group opacity-0 animate-fade-up',
        className
      )}
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] bg-secondary rounded-2xl overflow-hidden mb-4 border-2 border-transparent hover:border-primary/30 transition-all duration-300">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-secondary via-muted to-secondary animate-shimmer bg-[length:200%_100%]" />
          )}
          <motion.img
            src={product.image}
            alt={product.name}
            className={cn(
              'w-full h-full object-cover',
              imageLoaded ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={() => setImageLoaded(true)}
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />

          {/* Wishlist Button */}
          <motion.button
            onClick={handleWishlist}
            className={cn(
              'absolute top-4 right-4 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center',
              'shadow-lg transition-all duration-300',
              isWishlisted && 'bg-primary text-primary-foreground'
            )}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{ scale: isWishlisted ? [1, 1.3, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              <Heart
                className="w-5 h-5"
                fill={isWishlisted ? 'currentColor' : 'none'}
                strokeWidth={2}
              />
            </motion.div>
          </motion.button>

          {/* Quick Add Button */}
          <motion.button
            onClick={handleAddToCart}
            className={cn(
              'absolute bottom-4 left-4 right-4 bg-primary text-primary-foreground py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(139,30,63,0.4)] hover:shadow-[0_0_30px_rgba(139,30,63,0.6)]',
              'transition-all duration-300 hover:scale-105 active:scale-95'
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            Quick Add
          </motion.button>

          {/* Featured Badge */}
          {product.featured && (
            <motion.span
              className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] font-medium uppercase tracking-wider px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(139,30,63,0.5)]"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              Featured
            </motion.span>
          )}
        </div>

        {/* Info */}
        <div className="space-y-1">
          <h3 className="font-medium text-sm group-hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-primary text-sm font-semibold">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </motion.div>
  );
}
