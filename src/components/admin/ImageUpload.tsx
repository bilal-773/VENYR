import { useState } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { uploadImage, deleteImage } from '@/lib/storage';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
  onRemove?: () => void;
  currentImageUrl?: string;
  pathPrefix?: string; // e.g., "watches" or "shoes"
  label?: string;
  className?: string;
}

export function ImageUpload({
  onUploadComplete,
  onRemove,
  currentImageUrl,
  pathPrefix = 'products',
  label = 'Upload Image',
  className,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // Generate unique filename
      const timestamp = Date.now();
      const extension = file.name.split('.').pop();
      const filename = `${timestamp}.${extension}`;
      const path = pathPrefix ? `${pathPrefix}/${filename}` : filename;

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to Supabase Storage
      const url = await uploadImage(file, path);

      onUploadComplete(url);
      toast.success('Image uploaded successfully');
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image', {
        description: error.message || 'Please try again.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemove = async () => {
    if (currentImageUrl && onRemove) {
      // Extract path from URL if needed for deletion
      // Note: This assumes the URL contains the path info
      // You may need to store the path separately
      try {
        // If you need to delete from storage, extract path from URL
        // const path = currentImageUrl.split('/').slice(-2).join('/');
        // await deleteImage(path);
        
        setPreview(null);
        onRemove();
        toast.success('Image removed');
      } catch (error: any) {
        console.error('Error removing image:', error);
        toast.error('Failed to remove image');
      }
    } else {
      setPreview(null);
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="block text-sm font-medium mb-2">{label}</label>
      )}

      <div
        className={cn(
          'relative border-2 border-dashed rounded-xl p-6 transition-all duration-300',
          dragActive
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-primary/50',
          preview && 'border-transparent p-0'
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative group"
            >
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-xl"
              />
              {onRemove && (
                <motion.button
                  onClick={handleRemove}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              )}
              <div className="absolute bottom-2 left-2 right-2">
                <motion.label
                  htmlFor={`image-upload-${pathPrefix}`}
                  className="btn-secondary w-full py-2 text-xs cursor-pointer flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Upload className="w-4 h-4" />
                  Replace Image
                </motion.label>
                <input
                  id={`image-upload-${pathPrefix}`}
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                  disabled={isUploading}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <input
                id={`image-upload-${pathPrefix}`}
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
                disabled={isUploading}
              />
              <label
                htmlFor={`image-upload-${pathPrefix}`}
                className="cursor-pointer flex flex-col items-center gap-4"
              >
                {isUploading ? (
                  <Loader2 className="w-12 h-12 text-primary animate-spin" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-primary" />
                  </div>
                )}
                <div>
                  <p className="font-medium mb-1">
                    {isUploading ? 'Uploading...' : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              </label>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}



