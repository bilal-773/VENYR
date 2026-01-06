# Troubleshooting: Shoes Page Not Showing Products

## Quick Debug Steps

### 1. Open Browser Console (F12)
Navigate to `/shoes` page and check the console for these logs:

```
🔍 [SHOES] DEBUG INFO:
Query used: .eq("category", "shoes")
Fetched products: [...]
Products count: X
Error: null
```

### 2. Common Issues & Solutions

#### Issue 1: Category Value Mismatch
**Symptom**: `Products count: 0` but no error

**Cause**: Database has "Shoes" (capitalized) instead of "shoes" (lowercase)

**Solution**: 
```sql
-- Check what categories exist in your database
SELECT DISTINCT category FROM products;

-- If you see "Shoes" instead of "shoes", update them:
UPDATE products SET category = 'shoes' WHERE category = 'Shoes';
UPDATE products SET category = 'watches' WHERE category = 'Watches';
```

#### Issue 2: RLS Policy Blocking
**Symptom**: Error message contains "row-level security" or "RLS"

**Solution**: In Supabase SQL Editor, run:
```sql
-- Allow public read access to products
CREATE POLICY "Allow public read access to products"
ON products
FOR SELECT
TO public
USING (true);
```

#### Issue 3: No Products in Database
**Symptom**: `Products count: 0`, no error

**Solution**: Add products to your Supabase `products` table with `category = 'shoes'`

#### Issue 4: Supabase Not Initialized
**Symptom**: Console shows "Supabase not initialized"

**Solution**: 
1. Create `.env` file in project root
2. Add:
```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```
3. Restart dev server: `npm run dev`

## Expected Console Output (Success)

```
🔍 [SHOES] DEBUG INFO:
Query used: .eq("category", "shoes")
Fetched products: [{id: "...", name: "...", category: "shoes", ...}, ...]
Products count: 8
Error: null
✅ Successfully fetched 8 products for category "shoes"
```

## What to Check in Supabase

1. **Table exists**: Go to Table Editor → `products` table
2. **Data exists**: Check if you have rows with `category = 'shoes'` (lowercase!)
3. **RLS enabled**: Go to Authentication → Policies → Check if SELECT is allowed
4. **Column name**: Ensure column is named `category` (not `Category` or `categories`)

## Quick Test Query

Run this in Supabase SQL Editor to test:

```sql
-- Test 1: Check all categories
SELECT DISTINCT category FROM products;

-- Test 2: Count shoes
SELECT COUNT(*) FROM products WHERE category = 'shoes';

-- Test 3: See actual shoes data
SELECT id, name, category FROM products WHERE category = 'shoes';
```

