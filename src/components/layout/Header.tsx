import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, Heart, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { SearchResults } from '@/components/SearchResults';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Watches', path: '/watches' },
  { name: 'Shoes', path: '/shoes' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openCart, totalItems } = useCart();
  const { user } = useAuth();
  const { wishlist } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'glass border-b border-border/50 shadow-soft'
          : 'bg-transparent'
      )}
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="font-serif text-2xl md:text-3xl tracking-tight transition-all duration-300 hover:scale-105 hover:text-primary uppercase"
          >
            VENYR
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'nav-link uppercase tracking-[0.15em] text-xs',
                  location.pathname === link.path && 'nav-link-active'
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="btn-ghost p-2.5 rounded-full group"
              aria-label="Search"
            >
              <Search 
                className={cn(
                  "w-[18px] h-[18px] transition-all duration-500",
                  isSearchOpen && "rotate-90 text-primary"
                )} 
                strokeWidth={1.5} 
              />
            </button>

            {/* Orders (only if logged in) */}
            {user && (
              <Link
                to="/orders"
                className={cn(
                  'btn-ghost p-2.5 rounded-full group',
                  location.pathname === '/orders' && 'text-primary'
                )}
                aria-label="View orders"
              >
                <Package className="w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
              </Link>
            )}

            {/* Cart */}
            <button
              onClick={openCart}
              className="btn-ghost p-2.5 rounded-full relative group"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    className="badge-count"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                    key={totalItems}
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="btn-ghost p-2.5 rounded-full lg:hidden"
              aria-label="Toggle menu"
            >
              <div className="relative w-[18px] h-[18px]">
                <span
                  className={cn(
                    'absolute left-0 w-full h-[1.5px] bg-current transition-all duration-300',
                    isMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-1'
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1.5px] bg-current transition-all duration-300',
                    isMenuOpen && 'opacity-0'
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 w-full h-[1.5px] bg-current transition-all duration-300',
                    isMenuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-1'
                  )}
                />
              </div>
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden fixed inset-0 top-16 md:top-20 bg-background/98 backdrop-blur-xl transition-all duration-500 ease-elegant',
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        )}
      >
        <nav className="container-main py-10 flex flex-col gap-2">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                'text-3xl font-serif py-3 transition-all duration-300',
                'opacity-0 translate-y-4',
                isMenuOpen && 'animate-fade-up',
                location.pathname === link.path
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Search Results */}
      <SearchResults
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </header>
  );
}
