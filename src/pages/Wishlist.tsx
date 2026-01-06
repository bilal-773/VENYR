import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/products/ProductCard';
import { Heart, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <Layout>
        <div className="container-main pt-32 pb-24">
          <div className="max-w-2xl mx-auto text-center py-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-24 h-24 mx-auto mb-8 rounded-full bg-secondary flex items-center justify-center"
            >
              <Heart className="w-12 h-12 text-muted-foreground/30" strokeWidth={1} />
            </motion.div>
            <h1 className="font-serif text-3xl md:text-4xl mb-4">Your Wishlist is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Start adding items you love! Click the heart icon on any product to save it here.
            </p>
            <Link
              to="/watches"
              className="btn-primary inline-flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Start Shopping
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-main pt-32 pb-24">
        <div className="mb-12">
          <h1 className="font-serif text-3xl md:text-4xl mb-2">My Wishlist</h1>
          <p className="text-muted-foreground">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {wishlist.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </Layout>
  );
}




