import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchProductById, fetchProductsByCategory } from "@/lib/products";
import { Product } from "@/data/products";
import { allProducts } from "@/data/products";

/**
 * Hook to fetch all products
 */
export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    retryOnMount: false,
    // Fallback to static products if Supabase fails
    onError: (error) => {
      console.error('Error fetching products from Supabase:', error);
      console.log('Falling back to static products');
    },
  });
}

/**
 * Hook to fetch a single product by ID
 */
export function useProduct(productId: string | undefined) {
  return useQuery<Product | null>({
    queryKey: ["product", productId],
    queryFn: () => (productId ? fetchProductById(productId) : Promise.resolve(null)),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch products by category
 */
export function useProductsByCategory(category: "watches" | "shoes") {
  return useQuery<Product[]>({
    queryKey: ["products", category],
    queryFn: () => fetchProductsByCategory(category),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

