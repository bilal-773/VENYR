import { supabase } from "./supabase";
import { Product } from "@/data/products";

/**
 * Fetch all products from Supabase
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    // Check if Supabase is initialized
    if (!supabase) {
      console.warn('Supabase not initialized, using empty array');
      return [];
    }

    const { data, error } = await supabase
      .from("products")
      .select("*");

    if (error) {
      console.error("Error fetching products:", error);
      // Return empty array instead of throwing to prevent app crash
      return [];
    }

    // Map database fields to Product interface if needed
    // Handle both 'image' and 'image_url' fields from Supabase
    return (data || []).map((item: any) => {
      const primaryImage = item.image_url || item.image || item.images?.[0] || "";
      const imageArray = item.images || (item.image_url ? [item.image_url] : []) || (item.image ? [item.image] : []);
      
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        image: primaryImage,
        images: imageArray.length > 0 ? imageArray : [primaryImage],
        category: item.category,
        description: item.description || "",
        details: item.details || [],
        sizes: item.sizes || [],
        colors: item.colors || [],
        featured: item.featured || false,
      };
    });
  } catch (error) {
    console.error('Unexpected error fetching products:', error);
    return [];
  }
}

/**
 * Fetch a single product by ID from Supabase
 */
export async function fetchProductById(productId: string): Promise<Product | null> {
  try {
    if (!supabase) {
      console.warn('Supabase not initialized');
      return null;
    }

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();

    if (error) {
      console.error("Error fetching product:", error);
      return null;
    }

    if (!data) return null;

    // Map database fields to Product interface
    // Handle both 'image' and 'image_url' fields from Supabase
    const primaryImage = data.image_url || data.image || data.images?.[0] || "";
    const imageArray = data.images || (data.image_url ? [data.image_url] : []) || (data.image ? [data.image] : []);
    
    return {
      id: data.id,
      name: data.name,
      price: data.price,
      image: primaryImage,
      images: imageArray.length > 0 ? imageArray : [primaryImage],
      category: data.category,
      description: data.description || "",
      details: data.details || [],
      sizes: data.sizes || [],
      colors: data.colors || [],
      featured: data.featured || false,
    };
  } catch (error) {
    console.error('Unexpected error fetching product:', error);
    return null;
  }
}

/**
 * Fetch products by category
 */
export async function fetchProductsByCategory(category: "watches" | "shoes"): Promise<Product[]> {
  try {
    if (!supabase) {
      console.warn('Supabase not initialized');
      return [];
    }

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", category);

    if (error) {
      console.error(`Error fetching ${category}:`, error);
      return [];
    }

    // Handle both 'image' and 'image_url' fields from Supabase
    return (data || []).map((item: any) => {
      const primaryImage = item.image_url || item.image || item.images?.[0] || "";
      const imageArray = item.images || (item.image_url ? [item.image_url] : []) || (item.image ? [item.image] : []);
      
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        image: primaryImage,
        images: imageArray.length > 0 ? imageArray : [primaryImage],
        category: item.category,
        description: item.description || "",
        details: item.details || [],
        sizes: item.sizes || [],
        colors: item.colors || [],
        featured: item.featured || false,
      };
    });
  } catch (error) {
    console.error(`Unexpected error fetching ${category}:`, error);
    return [];
  }
}

