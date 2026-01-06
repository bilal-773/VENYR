import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { formatPrice } from '@/lib/priceFormatter';
import { Loader2 } from 'lucide-react';

export function FeaturedProductCarousel() {
  const { data: allProducts = [], isLoading } = useProducts();
  
  const featuredProducts = useMemo(() => {
    return allProducts.filter(p => p.featured).slice(0, 6);
  }, [allProducts]);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollTarget, setScrollTarget] = useState<HTMLDivElement | null>(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fix: Set scrollTarget after ref is mounted to prevent hydration error
  useEffect(() => {
    if (sectionRef.current) {
      setScrollTarget(sectionRef.current);
    }
  }, []);

  // Scroll-based animation - only attach when scrollTarget is set
  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: ['start end', 'end start'],
    layoutEffect: false,
  });

  // Create transforms for each column type
  const leftColumnTransform = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rightColumnTransform = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const middleColumnTransform = useTransform(scrollYProgress, [0, 1], [0, 0]);

  if (isLoading) {
    return (
      <section className="py-24 md:py-32 bg-background relative overflow-hidden">
        <div className="container-main">
          <div className="text-center py-20">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading featured products...</p>
          </div>
        </div>
      </section>
    );
  }

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
        {featuredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6">
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
                style={{ 
                  // Only apply scroll transform on desktop (lg breakpoint and above)
                  y: !isMobile && scrollTarget ? yTransform : 0
                }}
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
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No featured products available.</p>
          </div>
        )}
      </div>
    </section>
  );
}
