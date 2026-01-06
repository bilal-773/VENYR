# Supabase Storage Setup Guide

## Phase 7: Image Storage Configuration

To enable product image uploads, you need to set up Supabase Storage:

### Step 1: Create Storage Bucket

1. Go to your Supabase Dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **New Bucket**
4. Configure the bucket:
   - **Name**: `products`
   - **Public bucket**: ✅ **Enable** (Check this box)
   - **File size limit**: 5 MB (or as needed)
   - **Allowed MIME types**: `image/*` (or specific types like `image/jpeg,image/png,image/webp`)

### Step 2: Set Bucket Policies

After creating the bucket, set up RLS (Row Level Security) policies:

#### Policy 1: Allow Public Read Access
- **Policy name**: `Public read access`
- **Allowed operation**: SELECT
- **Target roles**: `anon`, `authenticated`
- **USING expression**: `true`

#### Policy 2: Allow Authenticated Upload
- **Policy name**: `Authenticated upload`
- **Allowed operation**: INSERT
- **Target roles**: `authenticated`
- **WITH CHECK expression**: `true`

#### Policy 3: Allow Authenticated Update/Delete
- **Policy name**: `Authenticated update/delete`
- **Allowed operation**: UPDATE, DELETE
- **Target roles**: `authenticated`
- **USING expression**: `true`

### Step 3: Update Products Table

Make sure your `products` table has an `image_url` column:

```sql
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS image_url TEXT;
```

Or if you want to support multiple images:

```sql
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS image_urls TEXT[];
```

### Step 4: Usage

The `ImageUpload` component is available at `src/components/admin/ImageUpload.tsx`.

**Example usage:**

```tsx
import { ImageUpload } from '@/components/admin/ImageUpload';

function ProductForm() {
  const [imageUrl, setImageUrl] = useState('');

  return (
    <ImageUpload
      pathPrefix="watches" // or "shoes"
      currentImageUrl={imageUrl}
      onUploadComplete={(url) => {
        setImageUrl(url);
        // Save to database
        await updateProduct({ image_url: url });
      }}
      onRemove={() => {
        setImageUrl('');
        // Remove from database
      }}
      label="Product Image"
    />
  );
}
```

### Storage Functions

The `src/lib/storage.ts` file provides:

- `uploadImage(file, path)` - Upload single image
- `uploadImages(files, basePath)` - Upload multiple images
- `deleteImage(path)` - Delete image from storage
- `getImageUrl(path)` - Get public URL for image

### Notes

- Images are stored in the `products` bucket with paths like: `watches/1234567890.jpg`
- The bucket must be **public** for images to be accessible via URL
- Maximum file size is 5MB (configurable in bucket settings)
- Supported formats: PNG, JPG, GIF, WebP (configurable)



