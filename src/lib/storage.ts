import { supabase } from "./supabase";

const BUCKET_NAME = "products";

/**
 * Upload image to Supabase Storage
 * @param file - File to upload
 * @param path - Path in bucket (e.g., "watches/watch-1.jpg")
 * @returns Public URL of uploaded image
 */
export async function uploadImage(
  file: File,
  path: string
): Promise<string> {
  // Upload file
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading image:", error);
    throw error;
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}

/**
 * Delete image from Supabase Storage
 * @param path - Path in bucket
 */
export async function deleteImage(path: string): Promise<void> {
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([path]);

  if (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
}

/**
 * Upload multiple images
 * @param files - Array of files to upload
 * @param basePath - Base path for files (e.g., "watches/watch-1")
 * @returns Array of public URLs
 */
export async function uploadImages(
  files: File[],
  basePath: string
): Promise<string[]> {
  const uploadPromises = files.map((file, index) => {
    const extension = file.name.split(".").pop();
    const path = `${basePath}-${index + 1}.${extension}`;
    return uploadImage(file, path);
  });

  return Promise.all(uploadPromises);
}

/**
 * Get public URL for an image in storage
 * @param path - Path in bucket
 * @returns Public URL
 */
export function getImageUrl(path: string): string {
  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(path);

  return data.publicUrl;
}



