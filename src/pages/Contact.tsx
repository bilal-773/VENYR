import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Mail, Phone, Clock, Instagram, Twitter, Send, Check, MapPin, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please correct the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast.success('Message sent successfully!', {
        description: "We'll get back to you within 24 hours.",
        duration: 5000,
      });

      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      toast.error('Failed to send message', {
        description: 'Please try again later or contact us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleBlur = (fieldName: string) => {
    setFocusedField(null);
    // Validate individual field on blur
    if (fieldName === 'email' && formData.email && !validateEmail(formData.email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Elegant Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,30,63,0.1),transparent_50%)]" />
        
        <div className="container-main text-center relative z-10">
          <motion.span
            className="text-primary text-xs uppercase tracking-[0.2em] mb-4 block font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get in Touch
          </motion.span>
          <motion.h1
            className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </motion.p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24 relative">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-[0_0_40px_rgba(139,30,63,0.05)]">
                <div className="mb-8">
                  <h2 className="font-serif text-2xl md:text-3xl mb-2">Send a Message</h2>
                  <p className="text-muted-foreground text-sm">Fill out the form below and we'll get back to you soon.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium">
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <motion.input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => handleBlur('name')}
                        className={cn(
                          'w-full px-4 py-3.5 bg-background border-2 rounded-xl',
                          'text-foreground placeholder:text-muted-foreground',
                          'focus:outline-none transition-all duration-200',
                          focusedField === 'name'
                            ? 'border-primary ring-2 ring-primary/20 shadow-[0_0_20px_rgba(139,30,63,0.15)]'
                            : 'border-border hover:border-primary/50',
                          errors.name && 'border-destructive ring-2 ring-destructive/20'
                        )}
                        placeholder="John Doe"
                        whileFocus={{ scale: 1.01 }}
                      />
                      <AnimatePresence>
                        {errors.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-xs text-destructive mt-1.5"
                          >
                            {errors.name}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">
                      Email Address <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <motion.input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => handleBlur('email')}
                        className={cn(
                          'w-full px-4 py-3.5 bg-background border-2 rounded-xl',
                          'text-foreground placeholder:text-muted-foreground',
                          'focus:outline-none transition-all duration-200',
                          focusedField === 'email'
                            ? 'border-primary ring-2 ring-primary/20 shadow-[0_0_20px_rgba(139,30,63,0.15)]'
                            : 'border-border hover:border-primary/50',
                          errors.email && 'border-destructive ring-2 ring-destructive/20'
                        )}
                        placeholder="john@example.com"
                        whileFocus={{ scale: 1.01 }}
                      />
                      <AnimatePresence>
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-xs text-destructive mt-1.5"
                          >
                            {errors.email}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium">
                      Message <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <motion.textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => handleBlur('message')}
                        rows={6}
                        maxLength={500}
                        className={cn(
                          'w-full px-4 py-3.5 bg-background border-2 rounded-xl resize-none',
                          'text-foreground placeholder:text-muted-foreground',
                          'focus:outline-none transition-all duration-200',
                          focusedField === 'message'
                            ? 'border-primary ring-2 ring-primary/20 shadow-[0_0_20px_rgba(139,30,63,0.15)]'
                            : 'border-border hover:border-primary/50',
                          errors.message && 'border-destructive ring-2 ring-destructive/20'
                        )}
                        placeholder="Tell us how we can help you..."
                        whileFocus={{ scale: 1.01 }}
                      />
                      <AnimatePresence>
                        {errors.message && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-xs text-destructive mt-1.5"
                          >
                            {errors.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                      <p className={cn(
                        'text-xs mt-1.5 text-right',
                        formData.message.length >= 450 ? 'text-primary' : 'text-muted-foreground'
                      )}>
                        {formData.message.length} / 500
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className={cn(
                      'w-full py-4 rounded-xl font-medium flex items-center justify-center gap-3',
                      'bg-primary text-primary-foreground',
                      'hover:shadow-[0_0_30px_rgba(139,30,63,0.4)]',
                      'transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
                      isSubmitted && 'bg-[#4CAF50] hover:bg-[#4CAF50]'
                    )}
                    whileHover={!isSubmitting && !isSubmitted ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting && !isSubmitted ? { scale: 0.98 } : {}}
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-3"
                        >
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Sending...</span>
                        </motion.div>
                      ) : isSubmitted ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-3"
                        >
                          <Check className="w-5 h-5" />
                          <span>Message Sent!</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="default"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-3"
                        >
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Contact Information Cards */}
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl mb-6">Get in Touch</h2>
                  <p className="text-muted-foreground mb-8">We're here to help. Reach out to us through any of these channels.</p>
                </div>

                <motion.div
                  className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(139,30,63,0.1)] transition-all duration-300"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Mail className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-2 text-lg">Email</h3>
                      <a href="mailto:support@venyr.com" className="text-primary hover:underline block mb-1">
                        support@venyr.com
                      </a>
                      <a href="mailto:sales@venyr.com" className="text-primary hover:underline block">
                        sales@venyr.com
                      </a>
                      <p className="text-muted-foreground text-xs mt-2">We typically respond within 24 hours</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(139,30,63,0.1)] transition-all duration-300"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Phone className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-2 text-lg">Phone</h3>
                      <a href="tel:+15551234567" className="text-primary hover:underline block mb-1">
                        +1 (555) 123-4567
                      </a>
                      <p className="text-muted-foreground text-xs mt-2">Call us during business hours</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(139,30,63,0.1)] transition-all duration-300"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Clock className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-2 text-lg">Business Hours</h3>
                      <div className="space-y-1 text-muted-foreground">
                        <p className="text-sm">Monday - Friday: <span className="text-foreground font-medium">9am - 6pm EST</span></p>
                        <p className="text-sm">Saturday: <span className="text-foreground font-medium">10am - 4pm EST</span></p>
                        <p className="text-sm">Sunday: <span className="text-foreground font-medium">Closed</span></p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(139,30,63,0.1)] transition-all duration-300"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <MapPin className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-2 text-lg">Location</h3>
                      <p className="text-muted-foreground text-sm">New York, NY, United States</p>
                      <p className="text-muted-foreground text-xs mt-2">Worldwide shipping available</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Social Media */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-6">
                <h3 className="font-medium mb-4 text-lg">Follow Us</h3>
                <p className="text-muted-foreground text-sm mb-4">Stay connected for updates and exclusive offers</p>
                <div className="flex gap-3">
                  <motion.a
                    href="https://instagram.com/venyr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/10 transition-all duration-300"
                    aria-label="Instagram"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Instagram className="w-5 h-5" strokeWidth={1.5} />
                  </motion.a>
                  <motion.a
                    href="https://twitter.com/venyr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/10 transition-all duration-300"
                    aria-label="Twitter"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Twitter className="w-5 h-5" strokeWidth={1.5} />
                  </motion.a>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-secondary/50 border border-border rounded-2xl p-6">
                <h3 className="font-serif text-lg mb-4">Quick Information</h3>
                <ul className="space-y-3">
                  {[
                    { icon: '🚚', text: 'Free shipping on orders over Rs. 41,700' },
                    { icon: '↩️', text: '30-day return policy on all items' },
                    { icon: '🌍', text: 'Worldwide delivery available' },
                    { icon: '🛡️', text: 'Lifetime warranty on all watches' },
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <span className="text-xl flex-shrink-0">{item.icon}</span>
                      <span className="text-muted-foreground text-sm">{item.text}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
