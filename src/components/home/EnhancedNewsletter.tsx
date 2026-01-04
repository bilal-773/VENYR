import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Instagram, Twitter, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export function EnhancedNewsletter() {
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      toast({
        title: 'Successfully subscribed!',
        description: 'Check your email for your 15% off code.',
      });
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Burgundy Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-background" />

      <div className="container-main relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Special Offer Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-sm font-semibold">Get 15% Off Your First Order</span>
          </motion.div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">Stay in the Loop</h2>
          <p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Subscribe for exclusive offers, new arrivals, and style inspiration delivered straight to your inbox.
          </p>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="relative max-w-md mx-auto mb-8">
            <div className="relative">
              <motion.input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Enter your email"
                className="w-full px-6 py-5 pr-32 bg-background/80 backdrop-blur-sm border-2 border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-200"
                animate={{
                  scale: isFocused ? 1.02 : 1,
                  boxShadow: isFocused
                    ? '0 0 30px rgba(139, 30, 63, 0.3)'
                    : '0 0 0px rgba(139, 30, 63, 0)',
                }}
              />
              <motion.button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium flex items-center gap-2 hover:shadow-[0_0_20px_rgba(139,30,63,0.5)] hover:scale-105 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className="w-4 h-4" />
                Subscribe
              </motion.button>
            </div>

            {/* Success Message */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  className="mt-4 flex items-center justify-center gap-2 text-primary font-medium"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  >
                    <Check className="w-5 h-5" />
                  </motion.div>
                  <span>Successfully subscribed!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-4">
            {[
              { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
              { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/10 transition-all duration-200"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.07 }}
              >
                <social.icon className="w-5 h-5" strokeWidth={1.5} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}





