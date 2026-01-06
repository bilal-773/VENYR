# Supabase Integration Guide

This guide demonstrates how products, cart, and checkout are integrated with Supabase.

## ✅ STEP 4: Fetch Products in Frontend

Products are now fetched live from Supabase. The application uses React Query hooks for efficient data fetching:

### Using the `useProducts` Hook (Recommended)

```tsx
import { useProducts } from '@/hooks/useProducts';

const MyComponent = () => {
  const { data: products = [], isLoading } = useProducts();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="product-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{formatPrice(product.price)}</p>
          <p>{product.category}</p>
        </div>
      ))}
    </div>
  );
};
```

### Direct Supabase Fetch (Alternative)

See `src/components/examples/HomeProductsExample.tsx` for a direct implementation example.

**Key Points:**
- Products are fetched from the `products` table in Supabase
- The `image_url` field is supported (falls back to `image` if not present)
- All product data is mapped to the `Product` interface
- Loading and error states are handled automatically

## ✅ STEP 5: Product Details Page

The product detail page fetches a single product by ID:

```tsx
import { useProduct } from '@/hooks/useProducts';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProduct(id);

  if (isLoading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <img src={product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <p>{formatPrice(product.price)}</p>
      <p>{product.description}</p>
    </div>
  );
};
```

**Implementation:**
- Located in `src/pages/ProductDetail.tsx`
- Uses `useProduct(id)` hook which queries: `supabase.from("products").select("*").eq("id", productId).single()`
- Displays: `product.name`, `product.price`, `product.description`, `product.image`, `product.images`

## ✅ STEP 6: Cart & Checkout

### Adding to Cart

Cart items are stored in Supabase `cart_items` table:

```tsx
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const { user } = useAuth();

  const handleAddToCart = () => {
    if (!user) {
      // Redirect to login
      return;
    }

    addItem({
      product_id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.sizes[0],
      category: product.category,
    }, quantity: 1);
  };

  return (
    <button onClick={handleAddToCart}>Add to Cart</button>
  );
};
```

**Cart Operations:**
- `addItem()` - Adds item to cart (inserts into `cart_items` table)
- `removeItem(cartItemId)` - Removes item from cart
- `updateQuantity(cartItemId, quantity)` - Updates item quantity
- `clearCart()` - Clears all cart items for user

### Checkout Flow

1. **Create Order** - Creates order record in `orders` table with status 'pending'
2. **Create Order Items** - Creates records in `order_items` table
3. **Stripe Checkout** - Redirects to Stripe for payment
4. **Payment Success** - Updates order status to 'paid' and clears cart

**Implementation:**
- Checkout page: `src/pages/Checkout.tsx`
- Order creation: `src/lib/orders.ts` → `createOrder()`
- Payment processing: `src/lib/payments.ts` → `createCheckoutSession()`
- Cart clearing: Automatically handled after successful payment

## Database Schema

### Products Table
```sql
- id (uuid, primary key)
- name (text)
- price (numeric)
- image (text) or image_url (text)
- images (text[])
- category (text: 'watches' | 'shoes')
- description (text)
- details (text[])
- sizes (text[])
- colors (text[])
- featured (boolean)
```

### Cart Items Table
```sql
- id (uuid, primary key)
- user_id (uuid, foreign key → auth.users)
- product_id (uuid, foreign key → products)
- quantity (integer)
- size (text)
```

### Orders Table
```sql
- id (uuid, primary key)
- user_id (uuid, foreign key → auth.users)
- total (numeric)
- status (text: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled')
- created_at (timestamp)
```

### Order Items Table
```sql
- id (uuid, primary key)
- order_id (uuid, foreign key → orders)
- product_id (uuid, foreign key → products)
- quantity (integer)
- price_at_order (numeric)
```

## Key Files

- **Product Fetching**: `src/lib/products.ts`
- **Cart Operations**: `src/lib/cart.ts`
- **Order Management**: `src/lib/orders.ts`
- **Payment Processing**: `src/lib/payments.ts`
- **React Hooks**: `src/hooks/useProducts.ts`
- **Cart Context**: `src/context/CartContext.tsx`

## Notes

- All product fetching supports both `image` and `image_url` fields
- Cart requires user authentication (Supabase Auth)
- Orders are created before payment, then updated to 'paid' after successful payment
- Cart is automatically cleared after successful payment


