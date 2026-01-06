import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '@/hooks/useProducts';
import { formatPrice } from '@/lib/priceFormatter';

interface SearchResultsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchResults({ isOpen, onClose }: SearchResultsProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { data: allProducts = [] } = useProducts();

  useEffect(() => {
    if (query.trim() && allProducts.length) {
      const searchTerm = query.toLowerCase();
      const filtered = allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm) ||
          product.colors.some((color) => color.toLowerCase().includes(searchTerm))
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query, allProducts]);

  const handleClose = useCallback(() => {
    setQuery('');
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Close search on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, handleClose]);

  // Clear query when search closes
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Search Panel */}
          <motion.div
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-4xl mx-4 bg-background border border-border rounded-2xl shadow-2xl z-[70] max-h-[80vh] overflow-hidden"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {/* Search Input */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-4">
                <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for watches, shoes..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-lg focus:outline-none"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="p-1 hover:bg-muted rounded-lg transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="overflow-y-auto max-h-[60vh]">
              {query.trim() && results.length > 0 ? (
                <div className="p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Found {results.length} {results.length === 1 ? 'result' : 'results'}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.map((product, index) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        onClick={handleClose}
                        className="group flex gap-4 p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-secondary/50 transition-all duration-300"
                      >
                        <div className="w-20 h-24 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors truncate">
                            {product.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                            {product.description}
                          </p>
                          <p className="text-primary font-semibold text-sm">
                            {formatPrice(product.price)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : query.trim() && results.length === 0 ? (
                <div className="p-12 text-center">
                  <Search className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">No products found</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Try searching for "watches", "shoes", or a product name
                  </p>
                </div>
              ) : (
                <div className="p-12 text-center">
                  <Search className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">Start typing to search...</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

