/**
 * Format price in Pakistani Rupees (PKR)
 * @param price - Price in PKR
 * @returns Formatted price string (e.g., "Rs. 80,342")
 */
export function formatPrice(price: number): string {
  return `Rs. ${price.toLocaleString('en-PK')}`;
}

/**
 * Format price in PKR with abbreviated format for large numbers
 * @param price - Price in PKR
 * @returns Formatted price string
 */
export function formatPriceShort(price: number): string {
  if (price >= 1000000) {
    return `Rs. ${(price / 1000000).toFixed(1)}M`;
  }
  if (price >= 1000) {
    return `Rs. ${(price / 1000).toFixed(0)}K`;
  }
  return formatPrice(price);
}









