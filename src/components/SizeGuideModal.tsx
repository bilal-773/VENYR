import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Ruler } from 'lucide-react';
import { Product } from '@/data/products';
import { cn } from '@/lib/utils';

interface SizeGuideDropdownProps {
  product: Product;
}

export function SizeGuideDropdown({ product }: SizeGuideDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isWatch = product.category === 'watches';
  const isShoe = product.category === 'shoes';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors group"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Ruler className="w-3.5 h-3.5" />
        <span>Size Guide</span>
        <ChevronDown
          className={cn(
            'w-3.5 h-3.5 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/* Dropdown Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 top-full mt-2 w-[320px] md:w-[400px] bg-background border border-border rounded-xl shadow-2xl z-50 max-h-[80vh] overflow-hidden"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="p-4 md:p-5 overflow-y-auto max-h-[80vh]">
              {isWatch && (
                <div className="space-y-5">
                  <div>
                    <h3 className="font-medium text-sm md:text-base mb-3 text-foreground">How to Measure Your Wrist</h3>
                    <ol className="space-y-2 text-xs md:text-sm text-muted-foreground">
                      <li className="flex gap-2.5">
                        <span className="font-medium text-foreground min-w-[16px]">1.</span>
                        <span>Use a flexible measuring tape or a strip of paper.</span>
                      </li>
                      <li className="flex gap-2.5">
                        <span className="font-medium text-foreground min-w-[16px]">2.</span>
                        <span>Wrap it around your wrist just below the wrist bone.</span>
                      </li>
                      <li className="flex gap-2.5">
                        <span className="font-medium text-foreground min-w-[16px]">3.</span>
                        <span>Note the measurement in centimeters or inches.</span>
                      </li>
                    </ol>
                  </div>

                  <div className="border-t border-border pt-4">
                    <h3 className="font-medium text-sm md:text-base mb-3 text-foreground">Watch Case Size Guide</h3>
                    <div className="overflow-x-auto -mx-1 px-1">
                      <table className="w-full border-collapse text-xs md:text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2.5 px-2.5 font-medium text-foreground">Wrist Size</th>
                            <th className="text-left py-2.5 px-2.5 font-medium text-foreground">Case Size</th>
                          </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                          <tr className="border-b border-border/50">
                            <td className="py-2.5 px-2.5">14-16 cm (5.5-6.3")</td>
                            <td className="py-2.5 px-2.5 font-medium text-foreground">36-38mm</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2.5 px-2.5">16-18 cm (6.3-7.1")</td>
                            <td className="py-2.5 px-2.5 font-medium text-foreground">38-40mm</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2.5 px-2.5">18-20 cm (7.1-7.9")</td>
                            <td className="py-2.5 px-2.5 font-medium text-foreground">40-42mm</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-2.5">20+ cm (7.9"+)</td>
                            <td className="py-2.5 px-2.5 font-medium text-foreground">42-44mm</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {isShoe && (
                <div className="space-y-5">
                  <div>
                    <h3 className="font-medium text-sm md:text-base mb-3 text-foreground">How to Measure Your Foot</h3>
                    <ol className="space-y-2 text-xs md:text-sm text-muted-foreground">
                      <li className="flex gap-2.5">
                        <span className="font-medium text-foreground min-w-[16px]">1.</span>
                        <span>Place your foot on a piece of paper and trace around it.</span>
                      </li>
                      <li className="flex gap-2.5">
                        <span className="font-medium text-foreground min-w-[16px]">2.</span>
                        <span>Measure the longest distance from heel to toe in centimeters.</span>
                      </li>
                      <li className="flex gap-2.5">
                        <span className="font-medium text-foreground min-w-[16px]">3.</span>
                        <span>Use the size conversion chart below.</span>
                      </li>
                    </ol>
                  </div>

                  <div className="border-t border-border pt-4">
                    <h3 className="font-medium text-sm md:text-base mb-3 text-foreground">EU Size Conversion Chart</h3>
                    <div className="overflow-x-auto -mx-1 px-1">
                      <table className="w-full border-collapse text-xs md:text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2.5 px-2 font-medium text-foreground">EU</th>
                            <th className="text-left py-2.5 px-2 font-medium text-foreground">CM</th>
                            <th className="text-left py-2.5 px-2 font-medium text-foreground">UK</th>
                            <th className="text-left py-2.5 px-2 font-medium text-foreground">US</th>
                          </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                          <tr className="border-b border-border/50">
                            <td className="py-2.5 px-2 font-medium text-foreground">40</td>
                            <td className="py-2.5 px-2">25.0</td>
                            <td className="py-2.5 px-2">7</td>
                            <td className="py-2.5 px-2">7.5</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2.5 px-2 font-medium text-foreground">41</td>
                            <td className="py-2.5 px-2">25.7</td>
                            <td className="py-2.5 px-2">7.5</td>
                            <td className="py-2.5 px-2">8</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2.5 px-2 font-medium text-foreground">42</td>
                            <td className="py-2.5 px-2">26.3</td>
                            <td className="py-2.5 px-2">8</td>
                            <td className="py-2.5 px-2">8.5</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2.5 px-2 font-medium text-foreground">43</td>
                            <td className="py-2.5 px-2">27.0</td>
                            <td className="py-2.5 px-2">9</td>
                            <td className="py-2.5 px-2">9.5</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2.5 px-2 font-medium text-foreground">44</td>
                            <td className="py-2.5 px-2">27.7</td>
                            <td className="py-2.5 px-2">9.5</td>
                            <td className="py-2.5 px-2">10</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-2 font-medium text-foreground">45</td>
                            <td className="py-2.5 px-2">28.3</td>
                            <td className="py-2.5 px-2">10.5</td>
                            <td className="py-2.5 px-2">11</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-secondary/50 p-3 rounded-lg border border-border/50">
                    <p className="text-xs md:text-sm text-muted-foreground">
                      <strong className="text-foreground">Fit Note:</strong> Our Chelsea boots run true to size. 
                      If you're between sizes, we recommend sizing up for a more comfortable fit.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

