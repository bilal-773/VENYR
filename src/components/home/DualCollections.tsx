import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function DualCollections() {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="grid md:grid-cols-2 min-h-[60vh]">
        {/* Watches Collection Card */}
        <motion.div
          className="relative group overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/watches" className="block h-full">
            <div className="relative h-full min-h-[60vh]">
              <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200&q=80)',
                }}
                whileHover={{ scale: 1.12 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/30 transition-all duration-300"
              />

              {/* Border */}
              <div className="absolute right-0 top-0 bottom-0 w-px bg-primary/30 group-hover:bg-primary group-hover:w-[2px] transition-all duration-300" />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-10 md:p-16">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.13 }}
                  className="group-hover:translate-y-0 translate-y-4 transition-transform duration-300"
                >
                  <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-background mb-3">
                    Timepieces
                  </h3>
                  <p className="text-background/90 text-lg md:text-xl mb-6">
                    12 Exquisite Watches
                  </p>
                  <span className="inline-flex items-center gap-3 text-background font-medium group-hover:gap-5 transition-all duration-200">
                    Explore Collection
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </motion.div>
              </div>

              {/* Burgundy Glow on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary/10 pointer-events-none" />
            </div>
          </Link>
        </motion.div>

        {/* Boots Collection Card */}
        <motion.div
          className="relative group overflow-hidden"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/shoes" className="block h-full">
            <div className="relative h-full min-h-[60vh]">
              <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=1200&q=80)',
                }}
                whileHover={{ scale: 1.12 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                className="absolute inset-0 bg-foreground/40 group-hover:bg-primary/20 transition-all duration-300"
              />

              {/* Border */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-primary/30 group-hover:bg-primary group-hover:w-[2px] transition-all duration-300" />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-10 md:p-16">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.27 }}
                  className="group-hover:translate-y-0 translate-y-4 transition-transform duration-300"
                >
                  <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-background mb-3">
                    Chelsea Boots
                  </h3>
                  <p className="text-background/90 text-lg md:text-xl mb-6">
                    8 Handcrafted Styles
                  </p>
                  <span className="inline-flex items-center gap-3 text-background font-medium group-hover:gap-5 transition-all duration-200">
                    Explore Collection
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </motion.div>
              </div>

              {/* Deeper Burgundy Glow on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-primary/15 pointer-events-none" />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}





