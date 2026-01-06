import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { CartItem, addToCart as addToCartDB, getCartItems, updateCartItemQuantity, removeCartItem, clearCart as clearCartDB } from '@/lib/cart';
import { toast } from 'sonner';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, 'quantity' | 'id'>, quantity?: number) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  refreshCart: () => Promise<void>;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  // Fetch cart items from database for logged-in users
  const refreshCart = useCallback(async () => {
    // For guests we keep cart purely in local state (no Supabase fetch)
    if (!user) {
      return;
    }

    setIsLoading(true);
    try {
      const cartItems = await getCartItems(user.id);
      setItems(cartItems);
    } catch (error: any) {
      console.error('Error fetching cart:', error);
      toast.error('Failed to load cart', {
        description: error.message || 'Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Load cart when user changes
  useEffect(() => {
    refreshCart();
  }, [user, refreshCart]);

  const addItem = useCallback(async (newItem: Omit<CartItem, 'quantity' | 'id'>, quantity: number = 1) => {
    // Guest users: manage cart purely in local state
    if (!user) {
      setItems(prev => {
        const existingIndex = prev.findIndex(
          item => item.product_id === newItem.product_id && item.size === newItem.size
        );

        if (existingIndex !== -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
          };
          return updated;
        }

        const guestItem: CartItem = {
          id: `${newItem.product_id}-${newItem.size || 'default'}-${Date.now()}`,
          product_id: newItem.product_id,
          name: newItem.name,
          price: newItem.price,
          image: newItem.image,
          size: newItem.size,
          quantity,
          category: newItem.category,
        };
        return [...prev, guestItem];
      });

      toast.success('Added to cart', {
        description: `${newItem.name} has been added to your cart.`,
        duration: 2000,
      });
      setIsOpen(true);
      return;
    }

    // Logged-in users: sync with Supabase
    try {
      await addToCartDB(user.id, newItem.product_id, quantity, newItem.size);
      toast.success('Added to cart', {
        description: `${newItem.name} has been added to your cart.`,
        duration: 2000,
      });
      // Refresh cart to get updated data
      await refreshCart();
      setIsOpen(true);
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart', {
        description: error.message || 'Please try again.',
      });
    }
  }, [user, refreshCart]);

  const removeItem = useCallback(async (cartItemId: string) => {
    // Guest users: update local state only
    if (!user) {
      setItems(prev => prev.filter(item => item.id !== cartItemId));
      toast.success('Item removed', {
        description: 'Item has been removed from your cart.',
        duration: 2000,
      });
      return;
    }

    try {
      await removeCartItem(cartItemId);
      toast.success('Item removed', {
        description: 'Item has been removed from your cart.',
        duration: 2000,
      });
      // Refresh cart to get updated data
      await refreshCart();
    } catch (error: any) {
      console.error('Error removing item:', error);
      toast.error('Failed to remove item', {
        description: error.message || 'Please try again.',
      });
    }
  }, [user, refreshCart]);

  const updateQuantity = useCallback(async (cartItemId: string, quantity: number) => {
    // Guest users: update local state only
    if (!user) {
      setItems(prev =>
        prev
          .map(item =>
            item.id === cartItemId
              ? { ...item, quantity }
              : item
          )
          .filter(item => item.quantity > 0)
      );
      return;
    }

    if (quantity < 1) {
      await removeItem(cartItemId);
      return;
    }

    try {
      await updateCartItemQuantity(cartItemId, quantity);
      // Refresh cart to get updated data
      await refreshCart();
    } catch (error: any) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity', {
        description: error.message || 'Please try again.',
      });
    }
  }, [user, removeItem, refreshCart]);

  const clearCart = useCallback(async () => {
    // Guest users: clear local state
    if (!user) {
      setItems([]);
      toast.success('Cart cleared', {
        description: 'All items have been removed from your cart.',
        duration: 2000,
      });
      return;
    }

    try {
      await clearCartDB(user.id);
      toast.success('Cart cleared', {
        description: 'All items have been removed from your cart.',
        duration: 2000,
      });
      // Refresh cart to get updated data
      await refreshCart();
    } catch (error: any) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart', {
        description: error.message || 'Please try again.',
      });
    }
  }, [user, refreshCart]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        isLoading,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        refreshCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
