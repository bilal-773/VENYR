export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  images: string[];
  category: 'watches' | 'shoes';
  description: string;
  details: string[];
  sizes: string[];
  colors: string[];
  featured?: boolean;
}

// USD to PKR conversion rate (approximate)
const USD_TO_PKR = 278;

export const watches: Product[] = [
  {
    id: 'watch-1',
    name: 'Chronograph Elite',
    price: Math.round(289 * USD_TO_PKR),
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80',
      'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=800&q=80',
    ],
    category: 'watches',
    description: 'A sophisticated chronograph timepiece featuring premium stainless steel construction and Swiss-made precision movement.',
    details: ['Swiss quartz movement', 'Sapphire crystal glass', '42mm case diameter', 'Water resistant to 100m'],
    sizes: ['One Size'],
    colors: ['Silver', 'Gold', 'Black'],
    featured: true,
  },
  {
    id: 'watch-2',
    name: 'Minimalist Black',
    price: Math.round(179 * USD_TO_PKR),
    image: 'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=800&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    ],
    category: 'watches',
    description: 'Clean lines and understated elegance define this minimalist timepiece, perfect for the modern professional.',
    details: ['Japanese movement', 'Hardened mineral glass', '40mm case diameter', 'Genuine leather strap'],
    sizes: ['One Size'],
    colors: ['Black', 'Brown'],
  },
  {
    id: 'watch-3',
    name: 'Sport Titanium',
    price: Math.round(249 * USD_TO_PKR),
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    ],
    category: 'watches',
    description: 'Engineered for performance with lightweight titanium construction and advanced chronograph functionality.',
    details: ['Titanium case', 'Tachymeter bezel', '44mm case diameter', 'Water resistant to 200m'],
    sizes: ['One Size'],
    colors: ['Silver', 'Black'],
  },
  {
    id: 'watch-4',
    name: 'Classic Rose Gold',
    price: Math.round(219 * USD_TO_PKR),
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80',
    ],
    category: 'watches',
    description: 'Timeless elegance meets modern craftsmanship in this stunning rose gold timepiece.',
    details: ['Rose gold plating', 'Mother of pearl dial', '36mm case diameter', 'Mesh bracelet'],
    sizes: ['One Size'],
    colors: ['Rose Gold'],
  },
  {
    id: 'watch-5',
    name: 'Vintage Automatic',
    price: Math.round(299 * USD_TO_PKR),
    image: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&q=80',
    ],
    category: 'watches',
    description: 'A tribute to classic horology featuring an automatic movement and vintage-inspired design.',
    details: ['Automatic movement', 'Exhibition case back', '38mm case diameter', 'Crocodile leather strap'],
    sizes: ['One Size'],
    colors: ['Brown', 'Black'],
    featured: true,
  },
  {
    id: 'watch-6',
    name: 'Digital Pro',
    price: Math.round(159 * USD_TO_PKR),
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&q=80',
    ],
    category: 'watches',
    description: 'Modern digital functionality meets bold design in this feature-packed timepiece.',
    details: ['Multi-function digital display', 'Backlight', '45mm case diameter', 'Silicone strap'],
    sizes: ['One Size'],
    colors: ['Black', 'Navy'],
  },
  {
    id: 'watch-7',
    name: 'Slim Dress Watch',
    price: Math.round(189 * USD_TO_PKR),
    image: 'https://images.unsplash.com/photo-1551818255-d609c39a0f5e?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1551818255-d609c39a0f5e?w=800&q=80',
    ],
    category: 'watches',
    description: 'Ultra-thin profile and refined aesthetics make this the perfect formal companion.',
    details: ['Ultra-thin case', 'Roman numerals', '38mm case diameter', 'Calf leather strap'],
    sizes: ['One Size'],
    colors: ['Silver', 'Gold'],
  },
  {
    id: 'watch-8',
    name: 'Adventure GMT',
    price: Math.round(279 * USD_TO_PKR),
    image: 'https://images.unsplash.com/photo-1557531365-e8b22d93dbd0?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1557531365-e8b22d93dbd0?w=800&q=80',
    ],
    category: 'watches',
    description: 'Built for the world traveler with dual time zone functionality and rugged construction.',
    details: ['GMT function', 'Rotating bezel', '42mm case diameter', 'NATO strap included'],
    sizes: ['One Size'],
    colors: ['Black', 'Green'],
  },
];

export const shoes: Product[] = [
  {
    id: 'shoe-1',
    name: 'Classic Black Chelsea',
    price: Math.round(189 * USD_TO_PKR),
    image: 'https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=800&q=80',
    ],
    category: 'shoes',
    description: 'Timeless Chelsea boot crafted from premium Italian leather with a refined silhouette.',
    details: ['Italian calfskin leather', 'Blake stitched construction', 'Leather sole', 'Elastic side panels'],
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: ['Black'],
    featured: true,
  },
  {
    id: 'shoe-2',
    name: 'Cognac Suede Chelsea',
    price: Math.round(199 * USD_TO_PKR),
    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80',
    ],
    category: 'shoes',
    description: 'Luxurious suede Chelsea boot in a rich cognac hue, perfect for casual sophistication.',
    details: ['Premium suede upper', 'Goodyear welted', 'Rubber sole', 'Pull tab detail'],
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: ['Brown'],
    featured: true,
  },
  {
    id: 'shoe-3',
    name: 'Dark Brown Chelsea',
    price: Math.round(179 * USD_TO_PKR),
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80',
    ],
    category: 'shoes',
    description: 'Versatile dark brown Chelsea boot that transitions seamlessly from office to evening.',
    details: ['Full grain leather', 'Cushioned insole', 'Durable rubber sole', 'Burnished toe'],
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: ['Brown'],
  },
  {
    id: 'shoe-4',
    name: 'Burgundy Leather Chelsea',
    price: Math.round(209 * USD_TO_PKR),
    image: 'https://images.unsplash.com/photo-1621996659490-3275b4d0d951?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1621996659490-3275b4d0d951?w=800&q=80',
    ],
    category: 'shoes',
    description: 'Make a statement with these striking burgundy Chelsea boots in polished leather.',
    details: ['Hand-burnished leather', 'Memory foam insole', 'Leather sole with rubber heel', 'Tonal stitching'],
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: ['Burgundy'],
  },
  {
    id: 'shoe-5',
    name: 'Tan Chelsea Boot',
    price: Math.round(169 * USD_TO_PKR),
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
    ],
    category: 'shoes',
    description: 'Light tan Chelsea boot perfect for spring and summer styling.',
    details: ['Smooth calf leather', 'Cushioned footbed', 'Stacked leather heel', 'Easy pull-on style'],
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: ['Tan'],
  },
  {
    id: 'shoe-6',
    name: 'Black Suede Chelsea',
    price: Math.round(189 * USD_TO_PKR),
    image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&q=80',
    ],
    category: 'shoes',
    description: 'Sophisticated black suede Chelsea boot with a contemporary slim profile.',
    details: ['Soft suede upper', 'Leather lining', 'Slim rubber sole', 'Contrast elastic'],
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: ['Black'],
  },
  {
    id: 'shoe-7',
    name: 'Matte Black Chelsea',
    price: Math.round(199 * USD_TO_PKR),
    image: 'https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?w=800&q=80',
    ],
    category: 'shoes',
    description: 'Modern matte finish leather Chelsea boot with clean minimal lines.',
    details: ['Matte leather finish', 'Padded collar', 'EVA midsole', 'Chunky sole'],
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: ['Black'],
  },
  {
    id: 'shoe-8',
    name: 'Chocolate Chelsea Boot',
    price: Math.round(175 * USD_TO_PKR),
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80',
    ],
    category: 'shoes',
    description: 'Rich chocolate brown Chelsea boot in butter-soft leather.',
    details: ['Nappa leather', 'OrthoLite footbed', 'Leather sole', 'Antiqued finish'],
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: ['Brown'],
  },
];

export const allProducts = [...watches, ...shoes];
