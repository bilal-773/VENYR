/**
 * Example Component: Fetching Products from Supabase
 * 
 * This component demonstrates how to fetch products from Supabase
 * and display them in your frontend.
 * 
 * ✅ All products are now fetched live from Supabase
 */

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Product } from "@/data/products";
import { formatPrice } from "@/lib/priceFormatter";
import { Loader2 } from "lucide-react";

const HomeProductsExample = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("products")
          .select("*");

        if (error) {
          console.error("Error fetching products:", error);
          setError(error.message);
          setProducts([]);
        } else {
          // Map Supabase data to Product interface
          // Handle both 'image' and 'image_url' fields
          const mappedProducts = (data || []).map((item: any) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image_url || item.image || item.images?.[0] || "",
            images: item.images || (item.image_url ? [item.image_url] : []) || (item.image ? [item.image] : []),
            category: item.category,
            description: item.description || "",
            details: item.details || [],
            sizes: item.sizes || [],
            colors: item.colors || [],
            featured: item.featured || false,
          }));
          
          setProducts(mappedProducts);
        }
      } catch (err: any) {
        console.error("Unexpected error:", err);
        setError(err.message || "Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-3 text-muted-foreground">Loading products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-destructive">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
          <div className="aspect-[3/4] bg-secondary overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-medium mb-2">{product.name}</h3>
            <p className="text-primary font-semibold mb-1">{formatPrice(product.price)}</p>
            <p className="text-xs text-muted-foreground uppercase">{product.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeProductsExample;


