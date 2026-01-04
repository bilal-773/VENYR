import { useState, useMemo } from 'react';
import { Filter, X } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductFilters, Filters } from '@/components/products/ProductFilters';
import { shoes } from '@/data/products';
import { cn } from '@/lib/utils';

export default function Shoes() {
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState('featured');
  const [filters, setFilters] = useState<Filters>({
    priceRange: null,
    sizes: [],
    colors: [],
  });

  const filteredProducts = useMemo(() => {
    let result = [...shoes];

    if (filters.priceRange) {
      result = result.filter(
        p => p.price >= filters.priceRange![0] && p.price <= filters.priceRange![1]
      );
    }

    if (filters.sizes.length > 0) {
      result = result.filter(p => p.sizes.some(s => filters.sizes.includes(s)));
    }

    if (filters.colors.length > 0) {
      result = result.filter(p => p.colors.some(c => filters.colors.includes(c)));
    }

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.reverse();
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [filters, sort]);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-hero-gradient pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-main text-center">
          <span className="text-muted-foreground text-xs uppercase tracking-[0.2em] mb-4 block opacity-0 animate-fade-up">
            Collection
          </span>
          <h1 className="section-title opacity-0 animate-fade-up stagger-1">Chelsea Boots</h1>
          <p className="section-subtitle mt-4 max-w-xl mx-auto opacity-0 animate-fade-up stagger-2">
            Handcrafted leather boots designed for timeless style.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-12 md:py-16">
        <div className="container-main">
          <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-16">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden flex items-center justify-between mb-8">
              <p className="text-muted-foreground text-sm">
                {filteredProducts.length} products
              </p>
              <button
                onClick={() => setShowFilters(true)}
                className="flex items-center gap-2 px-4 py-2 border-2 border-border hover:border-primary rounded-xl transition-all duration-300 hover:bg-primary/5"
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Filters</span>
              </button>
            </div>

            {/* Filters Sidebar - Mobile */}
            <div
              className={cn(
                'fixed inset-0 z-50 lg:hidden transition-all duration-500',
                showFilters ? 'opacity-100 visible' : 'opacity-0 invisible'
              )}
            >
              <div
                className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
                onClick={() => setShowFilters(false)}
              />
              <div
                className={cn(
                  'absolute left-0 top-0 bottom-0 w-80 bg-background shadow-xl transition-transform duration-500 ease-elegant overflow-y-auto',
                  showFilters ? 'translate-x-0' : '-translate-x-full'
                )}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="font-serif text-xl">Filters</h2>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <ProductFilters
                    category="shoes"
                    currentFilters={filters}
                    currentSort={sort}
                    onFilterChange={setFilters}
                    onSortChange={setSort}
                  />
                </div>
              </div>
            </div>

            {/* Filters Sidebar - Desktop */}
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <ProductFilters
                  category="shoes"
                  currentFilters={filters}
                  currentSort={sort}
                  onFilterChange={setFilters}
                  onSortChange={setSort}
                />
              </div>
            </aside>

            {/* Products Grid */}
            <div>
              <div className="hidden lg:flex items-center justify-between mb-8">
                <p className="text-muted-foreground text-sm">
                  {filteredProducts.length} products
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-muted-foreground mb-4">No products match your filters.</p>
                  <button
                    onClick={() => setFilters({ priceRange: null, sizes: [], colors: [] })}
                    className="btn-secondary"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
