import { Product, Cart } from './shopify/type';

export const mockProducts: Product[] = [
  {
    id: 'gid://shopify/Product/1',
    handle: 'crossover-pave-bangle',
    title: 'Crossover Pavé Bangle',
    description: 'A stunning rose-gold tone bangle featuring an intricate crossover design embedded with pavé crystals. Perfect for evening wear.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80',
        alt: 'Crossover Pavé Bangle'
      }
    ],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/1',
        title: 'Default',
        price: '120.00'
      }
    ],
    priceRange: {
      minVariantPrice: { amount: '120.00' }
    }
  },
  {
    id: 'gid://shopify/Product/2',
    handle: 'teardrop-blue-pendant',
    title: 'Teardrop Blue Pendant',
    description: 'A deep sapphire blue stone set in a minimal silver-tone claw setting.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
        alt: 'Teardrop Blue Pendant'
      }
    ],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/2',
        title: 'Default',
        price: '85.00'
      }
    ],
    priceRange: {
      minVariantPrice: { amount: '85.00' }
    }
  },
  {
    id: 'gid://shopify/Product/3',
    handle: 'custom-name-ring',
    title: 'Custom Name Ring',
    description: 'Personalize your style. Available in English and Arabic engraving.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
        alt: 'Custom Name Ring'
      }
    ],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/3',
        title: 'Default',
        price: '150.00'
      }
    ],
    priceRange: {
      minVariantPrice: { amount: '150.00' }
    }
  }
];

export const mockCart: Cart = {
  id: 'mock-cart-id',
  lines: [],
  cost: {
    totalAmount: { amount: '0' }
  }
};