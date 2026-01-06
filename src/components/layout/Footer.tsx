import { Link } from 'react-router-dom';
import { Instagram, Twitter, Shield, Lock, Truck, RotateCcw, CreditCard } from 'lucide-react';

const quickLinks = [
  { name: 'Watches', path: '/watches' },
  { name: 'Shoes', path: '/shoes' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const supportLinks = [
  { name: 'FAQs', path: '/contact' },
  { name: 'Shipping', path: '/about' },
  { name: 'Returns', path: '/about' },
  { name: 'Size Guide', path: '/about' },
];

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      {/* Newsletter Section */}
      <div className="container-main py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="font-serif text-3xl md:text-4xl mb-4">Stay in the Loop</h3>
          <p className="text-muted-foreground mb-8">
            Subscribe to receive updates on new arrivals, exclusive offers, and styling tips.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="input-field flex-1"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="divider" />

      {/* Links Section */}
      <div className="container-main py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="font-serif text-2xl hover:text-primary transition-colors duration-300 uppercase">VENYR</Link>
            <p className="text-muted-foreground text-sm mt-4 leading-relaxed max-w-xs">
              Timeless by design. Premium watches and handcrafted Chelsea boots for the discerning collector.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-5">Shop</h4>
            <nav className="flex flex-col gap-3">
              {quickLinks.map(link => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200 w-fit hover:translate-x-1 transform"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-5">Support</h4>
            <nav className="flex flex-col gap-3">
              {supportLinks.map(link => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200 w-fit hover:translate-x-1 transform"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-5">Connect</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/10 hover:scale-110 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/10 hover:scale-110 transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* Trust Badges */}
      <div className="container-main py-12 border-y border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-medium">SSL Secure</p>
              <p className="text-xs text-muted-foreground">256-bit Encryption</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-medium">Lifetime Warranty</p>
              <p className="text-xs text-muted-foreground">Craftsmanship Guaranteed</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-medium">Free Shipping</p>
              <p className="text-xs text-muted-foreground">Worldwide Delivery</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <RotateCcw className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-medium">30-Day Returns</p>
              <p className="text-xs text-muted-foreground">Hassle-Free Policy</p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground text-center mb-4">We accept:</p>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            <div className="px-4 py-2 bg-secondary rounded-lg text-xs font-medium">Visa</div>
            <div className="px-4 py-2 bg-secondary rounded-lg text-xs font-medium">Mastercard</div>
            <div className="px-4 py-2 bg-secondary rounded-lg text-xs font-medium">PayPal</div>
            <div className="px-4 py-2 bg-secondary rounded-lg text-xs font-medium">Amex</div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container-main py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2026 Developed & Manage By Muhammad Bilal. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors duration-200">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
