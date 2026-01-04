import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { watches } from '@/data/products';
import { formatPrice } from '@/lib/priceFormatter';

export function ProductSpotlight() {
  // Get featured product
  const spotlightProduct = watches.find(p => p.id === 'watch-1');
  
  if (!spotlightProduct) return null;

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Burgundy gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary rounded-full blur-[150px]" />
      </div>

      <div className="container-main relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-xs uppercase tracking-[0.2em] font-medium">Featured This Month</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mt-4">
            Product Spotlight
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
          {/* Product Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-square rounded-3xl overflow-hidden bg-secondary border border-border relative group">
              <motion.img
                src={spotlightProduct.image}
                alt={spotlightProduct.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              
              {/* Floating badge */}
              <motion.div
                className="absolute top-6 left-6 bg-primary text-primary-foreground px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider shadow-[0_0_20px_rgba(139,30,63,0.5)]"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                Featured
              </motion.div>

              {/* Rating badge */}
              <div className="absolute bottom-6 right-6 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                <Star className="w-4 h-4 fill-primary text-primary" strokeWidth={0} />
                <span className="text-sm font-semibold">4.9</span>
                <span className="text-xs text-muted-foreground">(127)</span>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 top-8 left-8 w-full h-full border-2 border-primary/20 rounded-3xl" />
          </motion.div>

          {/* Product Details */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <span className="text-primary text-sm uppercase tracking-wider font-medium">Premium Timepiece</span>
              <h3 className="font-serif text-4xl md:text-5xl mt-4 mb-4">
                {spotlightProduct.name}
              </h3>
              <p className="text-2xl md:text-3xl font-semibold text-primary mb-6">
                {formatPrice(spotlightProduct.price)}
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {spotlightProduct.description}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm uppercase tracking-wider">Key Features</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {spotlightProduct.details.map((detail, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3 text-sm"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{detail}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Colors */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm uppercase tracking-wider">Available Colors</h4>
              <div className="flex gap-3">
                {spotlightProduct.colors.map((color, index) => (
                  <motion.div
                    key={color}
                    className="px-4 py-2 bg-secondary rounded-full text-sm border border-border hover:border-primary transition-colors duration-300 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {color}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to={`/product/${spotlightProduct.id}`}
                className="btn-primary flex-1 py-5 justify-center text-center"
              >
                View Details
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/watches"
                className="btn-secondary flex-1 py-5 justify-center text-center"
              >
                View Collection
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}




