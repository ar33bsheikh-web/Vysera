export type Image = {
  src: string;
  alt: string;
};

export type Product = {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: Image[];
  variants: Variant[];
  priceRange: PriceRange;
};

export type Variant = {
  id: string;
  title: string;
  price: string;
};

export type PriceRange = {
  minVariantPrice: { amount: string };
};

export type Cart = {
  id: string;
  lines: CartLine[];
  cost: CartCost;
};

export type CartLine = {
  id: string;
  quantity: number;
  merchandise: Variant;
};

export type CartCost = {
  totalAmount: { amount: string };
};

export type Connection<T> = {
  edges: Array<{ node: T }>;
};

export type Collection = {
  id: string;
  title: string;
  handle: string;
  description: string;
};