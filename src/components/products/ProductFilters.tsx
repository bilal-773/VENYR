import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductFiltersProps {
  onFilterChange: (filters: Filters) => void;
  onSortChange: (sort: string) => void;
  currentSort: string;
  currentFilters: Filters;
  category: 'watches' | 'shoes';
}

export interface Filters {
  priceRange: [number, number] | null;
  sizes: string[];
  colors: string[];
}

// Convert USD to PKR for price ranges (1 USD = 278 PKR)
const USD_TO_PKR = 278;
const priceRanges: { label: string; value: [number, number] }[] = [
  { label: 'Under Rs. 27,800', value: [0, 100 * USD_TO_PKR] },
  { label: 'Rs. 27,800 - Rs. 55,600', value: [100 * USD_TO_PKR, 200 * USD_TO_PKR] },
  { label: 'Rs. 55,600 - Rs. 83,400', value: [200 * USD_TO_PKR, 300 * USD_TO_PKR] },
  { label: 'Over Rs. 83,400', value: [300 * USD_TO_PKR, 1000 * USD_TO_PKR] },
];

const shoeSizes = ['40', '41', '42', '43', '44', '45'];
const watchSizes = ['One Size'];

const colors = ['Black', 'Brown', 'Silver', 'Gold', 'Tan', 'Burgundy'];

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest', value: 'newest' },
];

export function ProductFilters({
  onFilterChange,
  onSortChange,
  currentSort,
  currentFilters,
  category,
}: ProductFiltersProps) {
  const [openSection, setOpenSection] = useState<string | null>('price');
  const sizes = category === 'shoes' ? shoeSizes : watchSizes;

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const toggleSize = (size: string) => {
    const newSizes = currentFilters.sizes.includes(size)
      ? currentFilters.sizes.filter(s => s !== size)
      : [...currentFilters.sizes, size];
    onFilterChange({ ...currentFilters, sizes: newSizes });
  };

  const toggleColor = (color: string) => {
    const newColors = currentFilters.colors.includes(color)
      ? currentFilters.colors.filter(c => c !== color)
      : [...currentFilters.colors, color];
    onFilterChange({ ...currentFilters, colors: newColors });
  };

  const setPriceRange = (range: [number, number] | null) => {
    onFilterChange({ ...currentFilters, priceRange: range });
  };

  const clearFilters = () => {
    onFilterChange({ priceRange: null, sizes: [], colors: [] });
  };

  const hasActiveFilters =
    currentFilters.priceRange !== null ||
    currentFilters.sizes.length > 0 ||
    currentFilters.colors.length > 0;

  return (
    <div className="space-y-8">
      {/* Sort */}
      <div className="space-y-4">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground block">Sort by</span>
        <div className="relative">
          <select
            value={currentSort}
            onChange={e => onSortChange(e.target.value)}
            className="w-full bg-background border border-border rounded-xl px-5 py-3 pr-10 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 appearance-none cursor-pointer"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      <div className="h-px bg-border" />

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          <X className="w-4 h-4" />
          Clear all filters
        </button>
      )}

      {/* Price Range */}
      <div>
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full py-2 text-left"
        >
          <span className="text-sm font-medium">Price</span>
          <ChevronDown
            className={cn(
              'w-4 h-4 transition-transform duration-300',
              openSection === 'price' && 'rotate-180'
            )}
          />
        </button>
        <div
          className={cn(
            'overflow-hidden transition-all duration-300',
            openSection === 'price' ? 'max-h-48 opacity-100 mt-4' : 'max-h-0 opacity-0'
          )}
        >
          <div className="space-y-3">
            {priceRanges.map(range => (
              <label key={range.label} className="flex items-center gap-3 cursor-pointer group">
                <div
                  className={cn(
                    'w-4 h-4 rounded-full border-2 transition-all duration-200 flex items-center justify-center',
                    currentFilters.priceRange?.[0] === range.value[0] &&
                    currentFilters.priceRange?.[1] === range.value[1]
                      ? 'border-primary bg-primary'
                      : 'border-border group-hover:border-primary/50'
                  )}
                >
                  {currentFilters.priceRange?.[0] === range.value[0] &&
                    currentFilters.priceRange?.[1] === range.value[1] && (
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />
                  )}
                </div>
                <input
                  type="radio"
                  name="priceRange"
                  checked={
                    currentFilters.priceRange?.[0] === range.value[0] &&
                    currentFilters.priceRange?.[1] === range.value[1]
                  }
                  onChange={() => setPriceRange(range.value)}
                  className="sr-only"
                />
                <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                  {range.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="h-px bg-border" />

      {/* Size */}
      <div>
        <button
          onClick={() => toggleSection('size')}
          className="flex items-center justify-between w-full py-2 text-left"
        >
          <span className="text-sm font-medium">Size</span>
          <ChevronDown
            className={cn(
              'w-4 h-4 transition-transform duration-300',
              openSection === 'size' && 'rotate-180'
            )}
          />
        </button>
        <div
          className={cn(
            'overflow-hidden transition-all duration-300',
            openSection === 'size' ? 'max-h-48 opacity-100 mt-4' : 'max-h-0 opacity-0'
          )}
        >
          <div className="flex flex-wrap gap-2">
            {sizes.map(size => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                  className={cn(
                    'px-4 py-2 text-sm rounded-xl border-2 transition-all duration-200',
                    currentFilters.sizes.includes(size)
                      ? 'bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(139,30,63,0.4)]'
                      : 'border-border hover:border-primary hover:bg-primary/5'
                  )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-px bg-border" />

      {/* Color */}
      <div>
        <button
          onClick={() => toggleSection('color')}
          className="flex items-center justify-between w-full py-2 text-left"
        >
          <span className="text-sm font-medium">Color</span>
          <ChevronDown
            className={cn(
              'w-4 h-4 transition-transform duration-300',
              openSection === 'color' && 'rotate-180'
            )}
          />
        </button>
        <div
          className={cn(
            'overflow-hidden transition-all duration-300',
            openSection === 'color' ? 'max-h-60 opacity-100 mt-4' : 'max-h-0 opacity-0'
          )}
        >
          <div className="space-y-3">
            {colors.map(color => (
              <label key={color} className="flex items-center gap-3 cursor-pointer group">
                <div
                  className={cn(
                    'w-4 h-4 rounded border-2 transition-all duration-200 flex items-center justify-center',
                    currentFilters.colors.includes(color)
                      ? 'border-primary bg-primary'
                      : 'border-border group-hover:border-primary/50'
                  )}
                >
                  {currentFilters.colors.includes(color) && (
                    <svg className="w-2.5 h-2.5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <input
                  type="checkbox"
                  checked={currentFilters.colors.includes(color)}
                  onChange={() => toggleColor(color)}
                  className="sr-only"
                />
                <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                  {color}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
