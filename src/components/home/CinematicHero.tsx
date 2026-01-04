import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown, Truck, Award, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const heroImages = [
  'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1920&q=80',
  'https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=1920&q=80',
  'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=1920&q=80',
  'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=1920&q=80',
];

const trustItems = [
  { icon: Truck, text: 'Free Worldwide Shipping' },
  { icon: Award, text: 'Handcrafted Excellence' },
  { icon: Shield, text: 'Lifetime Warranty' },
];

export function CinematicHero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Auto-change hero image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Parallax mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Images with Crossfade */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.3, ease: 'easeInOut' }}
            style={{
              backgroundImage: `url(${heroImages[currentImage]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            }}
          />
        </AnimatePresence>

        {/* Dark gradient overlay from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/60 to-transparent" />

        {/* Grain texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNDAwIDQwMCI+PGZpbHRlciBpZD0ibm9pc2UiPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIi8+PC9zdmc+')] bg-repeat" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -200, 0],
              opacity: [0, 0.8, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container-main text-center px-4">
          {/* New Collection Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.span
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 1.3, repeat: Infinity }}
            />
            <span className="text-primary text-xs font-medium uppercase tracking-[0.2em]">
              NEW COLLECTION 2025
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Timeless by Design,
            <br />
            <span className="text-primary italic text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              Crafted for You
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-10 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Discover our curated collection of premium timepieces and handcrafted Chelsea boots, designed for those who appreciate the finer things.
          </motion.p>

          {/* Trust Indicators */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {trustItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2.5 text-sm md:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.13 }}
              >
                <item.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                <span className="text-background/90 font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/watches"
                className="group relative px-10 py-5 bg-primary text-primary-foreground rounded-xl font-medium text-base md:text-lg overflow-hidden hover:shadow-[0_0_40px_rgba(139,30,63,0.6)] transition-all duration-200 hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Explore Watches
                  <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-500" />
              </Link>

              <Link
                to="/shoes"
                className="group relative px-10 py-5 border-2 border-primary text-primary bg-transparent rounded-xl font-medium text-base md:text-lg hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_40px_rgba(139,30,63,0.4)] transition-all duration-200 hover:scale-105"
              >
                <span className="flex items-center gap-3">
                  Discover Boots
                  <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Link>
            </div>

            {/* Scroll Indicator - Centered below buttons */}
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
            >
              <span className="text-background/80 text-xs uppercase tracking-wider font-medium">
                Scroll to Explore
              </span>
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowDown className="w-5 h-5 text-primary" strokeWidth={2.5} />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

