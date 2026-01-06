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

    // ✅ STEP 3 — LOG what Supabase returns (THIS WILL EXPOSE IT)
    console.log("[ALL PRODUCTS] Fetched products:", data);
    console.log("[ALL PRODUCTS] Error:", error);
    console.log("[ALL PRODUCTS] Data length:", data?.length || 0);

    if (error) {
      console.error("Error fetching products:", error);
      // Return empty array instead of throwing to prevent app crash
      return [];
    }

    // ❌ If data = [] → filter mismatch or no products in database
    if (!data || data.length === 0) {
      console.warn("⚠️ No products found in database. Check if products table has data.");
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
        category: (item.category || '').toLowerCase() as 'watches' | 'shoes', // Normalize to lowercase for frontend
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

    // ✅ STEP 3 — LOG what Supabase returns (THIS WILL EXPOSE IT)
    console.log(`[PRODUCT ${productId}] Fetched product:`, data);
    console.log(`[PRODUCT ${productId}] Error:`, error);

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
      category: (data.category || '').toLowerCase() as 'watches' | 'shoes', // Normalize to lowercase for frontend
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

    // ✅ STEP 2 — Confirm frontend query (CRITICAL)
    // Database has "Shoes" and "Watches" (capitalized), so we capitalize the category
    const categoryCapitalized = category.charAt(0).toUpperCase() + category.slice(1); // "shoes" → "Shoes"
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", categoryCapitalized);

    // ✅ STEP 3 — LOG what Supabase returns (THIS WILL EXPOSE IT)
    console.log(`\n🔍 [${category.toUpperCase()}] DEBUG INFO:`);
    console.log(`Query used: .eq("category", "${categoryCapitalized}")`);
    console.log(`(Input: "${category}" → Capitalized: "${categoryCapitalized}")`);
    console.log(`Fetched products:`, data);
    console.log(`Products count:`, data?.length || 0);
    console.log(`Error:`, error);
    
    if (error) {
      console.error(`❌ Error fetching ${category}:`, error);
      console.error(`Error details:`, JSON.stringify(error, null, 2));
      
      // If RLS error, provide helpful message
      if (error.message?.includes('row-level security') || error.message?.includes('RLS')) {
        console.error(`\n⚠️ RLS POLICY ISSUE: Your Supabase RLS policy is blocking this query.`);
        console.error(`Fix: Allow SELECT on products table for public/anonymous users.`);
      }
      
      return [];
    }

    // ❌ If data = [] → filter mismatch
    if (!data || data.length === 0) {
      console.warn(`\n⚠️ NO PRODUCTS FOUND for category "${category}"`);
      console.warn(`Possible causes:`);
      console.warn(`1. Category value mismatch - Database might have "Shoes" (capitalized) instead of "shoes"`);
      console.warn(`2. No products in database with category = "${category}"`);
      console.warn(`3. RLS policy blocking results`);
      
      // Try to fetch all products to see what categories exist
      const { data: allData } = await supabase.from("products").select("category");
      if (allData && allData.length > 0) {
        const uniqueCategories = [...new Set(allData.map((p: any) => p.category))];
        console.warn(`\n📊 Categories found in database:`, uniqueCategories);
      console.warn(`Looking for: "${categoryCapitalized}" (capitalized from "${category}")`);
      console.warn(`Case-sensitive match required!`);
      }
    } else {
      console.log(`✅ Successfully fetched ${data.length} products for category "${category}"`);
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
        category: (item.category || '').toLowerCase() as 'watches' | 'shoes', // Normalize to lowercase for frontend
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

