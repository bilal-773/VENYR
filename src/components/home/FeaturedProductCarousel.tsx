import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { allProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/priceFormatter';

const featuredProducts = allProducts.filter(p => p.featured).slice(0, 6);

export function FeaturedProductCarousel() {
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());
  const { addItem } = useCart();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll-based animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Create transforms for each column type
  const leftColumnTransform = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rightColumnTransform = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const middleColumnTransform = useTransform(scrollYProgress, [0, 1], [0, 0]);

  const toggleLike = (id: string) => {
    setLikedProducts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleQuickAdd = (product: typeof featuredProducts[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.sizes[0],
      category: product.category,
    });
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container-main">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-primary text-xs uppercase tracking-[0.2em] font-medium">Featured This Season</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4">Featured This Season</h2>
        </motion.div>

        {/* Grid Layout - 2 rows × 3 columns with counter-scroll */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {featuredProducts.map((product, index) => {
            // Determine scroll direction based on column position
            const columnIndex = index % 3; // 0 = left, 1 = middle, 2 = right
            
            // Get the appropriate transform based on column
            let yTransform;
            if (columnIndex === 0) {
              yTransform = leftColumnTransform; // Left column - scroll up
            } else if (columnIndex === 2) {
              yTransform = rightColumnTransform; // Right column - scroll down
            } else {
              yTransform = middleColumnTransform; // Middle column - static
            }

            return (
              <motion.div
                key={product.id}
                className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-200 hover:shadow-[0_0_40px_rgba(139,30,63,0.3)]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                whileHover={{ y: -8 }}
                style={{ y: yTransform }}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                  <Link to={`/product/${product.id}`}>
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>

                  {/* Heart Icon */}
                  <motion.button
                    onClick={() => toggleLike(product.id)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center z-10 hover:bg-primary/10 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.div
                      animate={{ scale: likedProducts.has(product.id) ? [1, 1.3, 1] : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Heart
                        className={`w-5 h-5 ${likedProducts.has(product.id) ? 'fill-primary text-primary' : 'text-foreground'}`}
                        strokeWidth={2}
                      />
                    </motion.div>
                  </motion.button>

                  {/* Quick View Button */}
                  <motion.div
                    className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    initial={{ y: 20 }}
                    whileHover={{ y: 0 }}
                  >
                    <Link
                      to={`/product/${product.id}`}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-background/95 backdrop-blur-sm rounded-xl text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                    >
                      <Eye className="w-4 h-4" />
                      Quick View
                    </Link>
                  </motion.div>
                </div>

                {/* Product Info */}
                <div className="p-4 md:p-6">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-medium text-base mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xl md:text-2xl font-semibold text-primary">{formatPrice(product.price)}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
