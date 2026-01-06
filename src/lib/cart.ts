import { supabase } from "./supabase";
import { Product } from "@/data/products";

export interface CartItemFromDB {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  size?: string;
  products: Product;
}

export interface CartItem {
  id: string; // cart_item id
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
  category: 'watches' | 'shoes';
  product_id: string; // actual product id
}

/**
 * Add item to cart
 */
export async function addToCart(
  userId: string,
  productId: string,
  quantity: number = 1,
  size?: string
): Promise<void> {
  // Check if item already exists in cart
  const { data: existingItems, error: fetchError } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .eq("size", size || "");

  if (fetchError) throw fetchError;

  const existing = existingItems && existingItems.length > 0 ? existingItems[0] : null;

  if (existing) {
    // Update quantity if item exists
    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: existing.quantity + quantity })
      .eq("id", existing.id);
    
    if (error) throw error;
  } else {
    // Insert new item
    const { error } = await supabase.from("cart_items").insert({
      user_id: userId,
      product_id: productId,
      quantity,
      size: size || null,
    });
    
    if (error) throw error;
  }
}

/**
 * Get all cart items for a user
 */
export async function getCartItems(userId: string): Promise<CartItem[]> {
  if (!supabase) {
    console.warn('Supabase not initialized');
    return [];
  }

  const { data, error } = await supabase
    .from("cart_items")
    .select(`
      id,
      quantity,
      size,
      product_id,
      products (
        id,
        name,
        price,
        image,
        image_url,
        images,
        category
      )
    `)
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }

  if (!data) return [];

  // Transform database format to CartItem format
  // Handle both 'image' and 'image_url' fields from Supabase
  return data.map((item: any) => {
    const product = item.products;
    const productImage = product.image_url || product.image || product.images?.[0] || "";
    
    return {
      id: item.id, // cart_item id
      product_id: product.id,
      name: product.name,
      price: product.price,
      image: productImage,
      size: item.size || product.sizes?.[0] || "One Size",
      quantity: item.quantity,
      category: product.category,
    };
  });
}

/**
 * Update cart item quantity
 */
export async function updateCartItemQuantity(
  cartItemId: string,
  quantity: number
): Promise<void> {
  if (quantity < 1) {
    // Delete if quantity is 0
    const { error } = await supabase.from("cart_items").delete().eq("id", cartItemId);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("cart_items")
      .update({ quantity })
      .eq("id", cartItemId);
    if (error) throw error;
  }
}

/**
 * Remove item from cart
 */
export async function removeCartItem(cartItemId: string): Promise<void> {
  const { error } = await supabase.from("cart_items").delete().eq("id", cartItemId);
  if (error) throw error;
}

/**
 * Clear all items from cart
 */
export async function clearCart(userId: string): Promise<void> {
  const { error } = await supabase.from("cart_items").delete().eq("user_id", userId);
  if (error) throw error;
}

