import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Minus, Plus, Check, Heart, Share2, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/products/ProductCard';
import { allProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/priceFormatter';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = allProducts.find(p => p.id === id);
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return (
      <Layout>
        <div className="container-main py-32 text-center">
          <h1 className="section-title">Product Not Found</h1>
          <Link to="/" className="btn-primary mt-8 inline-block">
            Back to Home
          </Link>
        </div>
      </Layout>
    );
  }

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 1) {
      return;
    }
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize || product.sizes[0],
      category: product.category,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Layout>
      <div className="container-main pt-24 pb-16 md:pt-32 md:pb-24">
        {/* Breadcrumb */}
        <Link
          to={`/${product.category}`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-10 transition-colors duration-200 opacity-0 animate-fade-up"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to {product.category === 'watches' ? 'Watches' : 'Shoes'}
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">
          {/* Image Gallery */}
          <div className="space-y-4 opacity-0 animate-fade-up stagger-1">
            <div className="relative aspect-[3/4] bg-secondary rounded-3xl overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
              
              {/* Wishlist & Share Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <motion.button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={cn(
                    'w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-lg transition-all duration-300',
                    isWishlisted && 'bg-primary text-primary-foreground'
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ scale: isWishlisted ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Heart
                    className="w-5 h-5"
                    fill={isWishlisted ? 'currentColor' : 'none'}
                    strokeWidth={2}
                  />
                </motion.button>
                <motion.button
                  className="w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Share2 className="w-5 h-5" strokeWidth={2} />
                </motion.button>
              </div>
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      'w-20 h-24 bg-secondary rounded-xl overflow-hidden border-2 transition-all duration-300',
                      selectedImage === index ? 'border-primary shadow-[0_0_15px_rgba(139,30,63,0.4)]' : 'border-transparent hover:border-primary/30'
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:py-8 opacity-0 animate-fade-up stagger-2">
            <div className="lg:sticky lg:top-32 space-y-8">
              <div>
                <span className="text-muted-foreground text-xs uppercase tracking-[0.2em]">
                  {product.category === 'watches' ? 'Timepiece' : 'Footwear'}
                </span>
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl mt-2">
                  {product.name}
                </h1>
                <p className="text-2xl mt-4">{formatPrice(product.price)}</p>
              </div>

              <p className="text-muted-foreground leading-relaxed">{product.description}</p>

              {/* Size Selector */}
              {product.sizes.length > 1 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Size</label>
                    <button className="text-xs text-primary hover:text-primary/80 transition-colors">
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <motion.button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          'w-12 h-12 border-2 rounded-xl text-sm font-medium transition-all duration-300',
                          selectedSize === size
                            ? 'bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(139,30,63,0.4)]'
                            : 'border-border hover:border-primary hover:bg-primary/5'
                        )}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate={selectedSize === size ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="space-y-4">
                <label className="text-sm font-medium">Quantity</label>
                <div className="flex items-center border-2 border-border hover:border-primary/30 transition-colors rounded-xl w-fit">
                  <motion.button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-4 hover:bg-primary/10 transition-colors rounded-l-xl"
                    aria-label="Decrease quantity"
                    whileTap={{ scale: 0.9 }}
                  >
                    <Minus className="w-4 h-4" />
                  </motion.button>
                  <motion.span
                    className="px-6 font-medium min-w-[60px] text-center text-primary"
                    key={quantity}
                    initial={{ scale: 1.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {quantity}
                  </motion.span>
                  <motion.button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-4 hover:bg-primary/10 transition-colors rounded-r-xl"
                    aria-label="Increase quantity"
                    whileTap={{ scale: 0.9 }}
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Add to Cart */}
              <motion.button
                onClick={handleAddToCart}
                disabled={!selectedSize && product.sizes.length > 1}
                className={cn(
                  'btn-primary w-full py-5 text-base flex items-center justify-center gap-3',
                  !selectedSize && product.sizes.length > 1 && 'opacity-50 cursor-not-allowed',
                  isAdded && 'bg-[#4CAF50] hover:bg-[#4CAF50]'
                )}
                whileHover={selectedSize || product.sizes.length === 1 ? { scale: 1.02 } : {}}
                whileTap={selectedSize || product.sizes.length === 1 ? { scale: 0.98 } : {}}
              >
                <AnimatePresence mode="wait">
                  {isAdded ? (
                    <motion.div
                      key="added"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex items-center gap-3"
                    >
                      <Check className="w-5 h-5" />
                      Added to Cart
                    </motion.div>
                  ) : !selectedSize && product.sizes.length > 1 ? (
                    <motion.span key="select">Select a Size</motion.span>
                  ) : (
                    <motion.span key="add">Add to Cart</motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Details */}
              <div className="border-t border-border pt-8 space-y-4">
                <h3 className="font-medium">Details</h3>
                <ul className="space-y-3">
                  {product.details.map((detail, index) => (
                    <li key={index} className="text-muted-foreground text-sm flex items-start gap-3">
                      <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Colors */}
              <div className="border-t border-border pt-8 space-y-4">
                <h3 className="font-medium">Available Colors</h3>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((color, index) => (
                    <motion.span
                      key={color}
                      className="px-4 py-2 bg-secondary rounded-full text-sm border border-primary/20 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {color}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-24 md:mt-32">
            <h2 className="font-serif text-2xl md:text-3xl mb-10">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
