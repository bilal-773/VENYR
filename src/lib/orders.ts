import { supabase } from "./supabase";
import { CartItem } from "./cart";

export interface Order {
  id: string;
  user_id: string | null; // Can be null for guest checkout
  total: number;
  status: "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled";
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_order: number;
}

/**
 * Create a new order from cart items
 * Gets user_id directly from Supabase auth to ensure it matches authenticated user
 */
export async function createOrder(
  cartItems: CartItem[]
): Promise<Order> {
  // Get current authenticated user directly from Supabase
  const { data: { user } } = await supabase.auth.getUser();
  
  // Calculate total
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Create order with status 'pending' (will be updated to 'paid' after payment)
  // user.id is VERY IMPORTANT - must match authenticated user for RLS policies
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user?.id ?? null, // Use user.id from Supabase auth, or null for guests
      total,
      status: "pending",
    })
    .select()
    .single();

  if (orderError) {
    console.error("Error creating order:", orderError);
    throw orderError;
  }

  // Create order items
  const orderItems = cartItems.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price_at_order: item.price,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    console.error("Error creating order items:", itemsError);
    // Rollback order creation if order items fail
    await supabase.from("orders").delete().eq("id", order.id);
    throw itemsError;
  }

  // Don't clear cart here - cart will be cleared after successful payment
  // This ensures cart is only cleared when payment is confirmed

  return order;
}

/**
 * Get all orders for a user
 */
export async function getUserOrders(userId: string): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }

  return data || [];
}

/**
 * Get order with items
 */
export async function getOrderWithItems(orderId: string) {
  // Use join query to get order with items and products in one call
  const { data, error } = await supabase
    .from("orders")
    .select(`
      id,
      user_id,
      total,
      status,
      created_at,
      order_items (
        id,
        order_id,
        product_id,
        quantity,
        price_at_order,
        products (
          id,
          name,
          image,
          image_url,
          images
        )
      )
    `)
    .eq("id", orderId)
    .single();

  if (error) {
    console.error("Error fetching order:", error);
    throw error;
  }

  return {
    order: {
      id: data.id,
      user_id: data.user_id,
      total: data.total,
      status: data.status,
      created_at: data.created_at,
    },
    items: (data.order_items || []).map((item: any) => ({
      id: item.id,
      order_id: item.order_id,
      product_id: item.product_id,
      quantity: item.quantity,
      price_at_order: item.price_at_order,
      products: item.products,
    })),
  };
}

