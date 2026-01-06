import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useProducts, useProduct } from '@/hooks/useProducts';

export function StructuredData() {
  const location = useLocation();
  const { data: allProducts = [] } = useProducts();
  
  // Get product ID for product detail pages
  const productId = location.pathname.startsWith('/product/') 
    ? location.pathname.split('/product/')[1] 
    : null;
  const { data: product } = useProduct(productId || undefined);

  useEffect(() => {
    // Remove any existing structured data scripts
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach((script) => script.remove());

    // Organization schema (for all pages)
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'VENYR',
      url: 'https://bilal-773.github.io/VENYR/',
      logo: 'https://bilal-773.github.io/VENYR/logo.png',
      description: 'Premium watches and handcrafted Chelsea boots with timeless design',
      foundingDate: '2020',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-555-123-4567',
        contactType: 'Customer Service',
        email: 'support@venyr.com',
        areaServed: 'Worldwide',
        availableLanguage: 'English',
      },
      sameAs: [
        'https://www.instagram.com/venyr',
        'https://twitter.com/venyr',
      ],
    };

    // Add organization schema
    const orgScript = document.createElement('script');
    orgScript.type = 'application/ld+json';
    orgScript.text = JSON.stringify(organizationSchema);
    document.head.appendChild(orgScript);

    // Product schema (for product detail pages)
    if (product && productId) {
        const productSchema = {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          image: product.images || [product.image],
          description: product.description,
          sku: product.id.toUpperCase(),
          brand: {
            '@type': 'Brand',
            name: 'VENYR',
          },
          offers: {
            '@type': 'Offer',
            url: `https://bilal-773.github.io/VENYR/#/product/${product.id}`,
            priceCurrency: 'PKR',
            price: product.price.toString(),
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/NewCondition',
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '127',
          },
        };

        const productScript = document.createElement('script');
        productScript.type = 'application/ld+json';
        productScript.text = JSON.stringify(productSchema);
        document.head.appendChild(productScript);
    }

    // Breadcrumb schema
    const breadcrumbItems: Array<{ '@type': string; position: number; name: string; item?: string }> = [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bilal-773.github.io/VENYR/' },
    ];

    if (location.pathname === '/watches' || location.pathname.startsWith('/product/')) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Watches',
        item: 'https://bilal-773.github.io/VENYR/#/watches',
      });
    }

    if (location.pathname === '/shoes' || location.pathname.startsWith('/product/')) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Shoes',
        item: 'https://bilal-773.github.io/VENYR/#/shoes',
      });
    }

    if (location.pathname.startsWith('/product/') && product) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 3,
        name: product.name,
      });
    }

    if (breadcrumbItems.length > 1) {
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbItems,
      };

      const breadcrumbScript = document.createElement('script');
      breadcrumbScript.type = 'application/ld+json';
      breadcrumbScript.text = JSON.stringify(breadcrumbSchema);
      document.head.appendChild(breadcrumbScript);
    }

    // Website schema (for homepage)
    if (location.pathname === '/') {
      const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'VENYR',
        url: 'https://bilal-773.github.io/VENYR/',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://bilal-773.github.io/VENYR/?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      };

      const websiteScript = document.createElement('script');
      websiteScript.type = 'application/ld+json';
      websiteScript.text = JSON.stringify(websiteSchema);
      document.head.appendChild(websiteScript);
    }
  }, [location.pathname, product, productId, allProducts]);

  return null;
}


