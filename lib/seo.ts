import { Product } from './shopify/type';

export function generateProductJsonLd(product: Product) {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images[0]?.src,
    offers: {
      '@type': 'Offer',
      price: product.priceRange.minVariantPrice.amount,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };
}
