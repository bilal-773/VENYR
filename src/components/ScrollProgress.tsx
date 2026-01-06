import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left"
        style={{
          scaleX: scrollProgress / 100,
          boxShadow: '0 0 10px rgba(139, 30, 63, 0.6)',
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        transition={{ duration: 0.1, ease: 'easeOut' }}
      />

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className={cn(
              'fixed bottom-8 right-8 z-50 bg-primary text-primary-foreground',
              'w-12 h-12 rounded-full flex items-center justify-center',
              'shadow-[0_0_20px_rgba(139,30,63,0.5)] hover:shadow-[0_0_30px_rgba(139,30,63,0.7)]',
              'hover:scale-110 active:scale-95 transition-all duration-300'
            )}
            initial={{ opacity: 0, y: 20, rotate: -180 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: 20, rotate: 180 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            whileHover={{ rotate: 360 }}
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}












