import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from '@/components/products/ProductCard';
import { allProducts } from '@/data/products';
import { cn } from '@/lib/utils';

const filterTabs = [
  { id: 'all', label: 'All Products' },
  { id: 'watches', label: 'Watches' },
  { id: 'shoes', label: 'Boots' },
  { id: 'featured', label: 'New Arrivals' },
  { id: 'bestsellers', label: 'Best Sellers' },
];

export function ProductGridWithFilters() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [displayCount, setDisplayCount] = useState(8);

  const filteredProducts = useMemo(() => {
    let products = [...allProducts];

    switch (activeFilter) {
      case 'watches':
        products = products.filter(p => p.category === 'watches');
        break;
      case 'shoes':
        products = products.filter(p => p.category === 'shoes');
        break;
      case 'featured':
        products = products.filter(p => p.featured);
        break;
      case 'bestsellers':
        // Simulate bestsellers - using featured for now
        products = products.filter(p => p.featured).slice(0, 4);
        break;
      default:
        break;
    }

    return products.slice(0, displayCount);
  }, [activeFilter, displayCount]);

  const hasMore = displayCount < allProducts.length;

  return (
    <section className="py-24 md:py-32 bg-secondary/20">
      <div className="container-main">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {filterTabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => {
                setActiveFilter(tab.id);
                setDisplayCount(8);
              }}
              className={cn(
                'relative px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 z-10',
                activeFilter === tab.id
                  ? 'bg-primary text-primary-foreground shadow-[0_0_20px_rgba(139,30,63,0.4)]'
                  : 'bg-background border border-border text-foreground hover:border-primary/50 hover:text-primary'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Load More Button */}
        {hasMore && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <button
              onClick={() => setDisplayCount((prev) => Math.min(prev + 8, allProducts.length))}
              className="px-8 py-4 border-2 border-primary text-primary rounded-xl font-medium hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_30px_rgba(139,30,63,0.4)] hover:scale-105 transition-all duration-200"
            >
              Load More
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

