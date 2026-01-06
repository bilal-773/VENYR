import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface SocialProof {
  name: string;
  location: string;
  product: string;
  image: string;
}

const mockPurchases: SocialProof[] = [
  { name: 'Sarah', location: 'New York', product: 'Chronograph Elite', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80' },
  { name: 'Michael', location: 'Chicago', product: 'Classic Black Chelsea', image: 'https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=100&q=80' },
  { name: 'Emma', location: 'London', product: 'Minimalist Black', image: 'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=100&q=80' },
  { name: 'James', location: 'Toronto', product: 'Vintage Automatic', image: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=100&q=80' },
  { name: 'Sophie', location: 'Paris', product: 'Cognac Suede Chelsea', image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=100&q=80' },
  { name: 'David', location: 'Sydney', product: 'Sport Titanium', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80' },
];

export function SocialProofToast() {
  const [visible, setVisible] = useState(false);
  const [currentPurchase, setCurrentPurchase] = useState<SocialProof | null>(null);

  useEffect(() => {
    const showNotification = () => {
      const randomPurchase = mockPurchases[Math.floor(Math.random() * mockPurchases.length)];
      setCurrentPurchase(randomPurchase);
      setVisible(true);
      
      setTimeout(() => {
        setVisible(false);
      }, 5000);
    };

    // Show first notification after 30 seconds
    const initialTimeout = setTimeout(showNotification, 30000);

    // Then show every 45-60 seconds
    const interval = setInterval(() => {
      showNotification();
    }, 45000 + Math.random() * 15000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && currentPurchase && (
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed bottom-4 left-4 z-[90] max-w-sm"
        >
          <div className="bg-background border border-border rounded-xl shadow-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                <img
                  src={currentPurchase.image}
                  alt={currentPurchase.product}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {currentPurchase.name} from {currentPurchase.location}
                </p>
                <p className="text-xs text-muted-foreground">
                  just purchased <span className="text-primary font-medium">{currentPurchase.product}</span>
                </p>
              </div>
              <button
                onClick={() => setVisible(false)}
                className="flex-shrink-0 p-1 hover:opacity-70 transition-opacity"
                aria-label="Close notification"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}




