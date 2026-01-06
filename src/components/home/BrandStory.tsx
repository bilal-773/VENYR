import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function BrandStory() {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      {/* Parallax Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1452626212850-0c8e5d4e8a3c?w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          initial={{ scale: 1.1, y: 0 }}
          whileInView={{ scale: 1, y: -100 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>

      {/* Dark Overlay with Burgundy Tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-primary/5 to-background/95 z-10" />

      {/* Content */}
      <div className="container-main relative z-20">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary text-xs uppercase tracking-[0.2em] font-medium">OUR PHILOSOPHY</span>
          
          <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl mt-8 mb-12 leading-relaxed max-w-4xl mx-auto text-foreground">
            We believe in the art of slow fashion. Each piece in our collection is carefully curated for its craftsmanship and timeless appeal. Quality over quantity, always.
          </blockquote>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <Link
              to="/about"
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-primary text-foreground rounded-xl font-medium hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_30px_rgba(139,30,63,0.4)] hover:scale-105 transition-all duration-200"
            >
              Discover Our Story
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-20" />
    </section>
  );
}

