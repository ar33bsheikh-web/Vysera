import { createUrl } from '../utils';
import { mockProducts, mockCart } from '../mock-data';
import { getProductQuery, getProductsQuery, getCartQuery, getCollectionQuery } from './queries';
import { createCartMutation, addToCartMutation, removeFromCartMutation, updateCartMutation } from './mutations';
import { Cart, Connection, Product, Collection } from './type';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
const endpoint = `https://${domain}/api/2024-01/graphql.json`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';
const USE_MOCK = process.env.USE_MOCK_DATA === 'true';

type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;

export async function shopifyFetch<T>({
  cache = 'force-cache',
  headers,
  query,
  tags,
  variables
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: object;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key,
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache,
      ...(tags && { next: { tags } })
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Shopify Fetch Error:', e);
    }
    throw {
      error: e,
      query
    };
  }
}

// --- Product Fetchers ---

export async function getProducts({ query, reverse, sortKey }: { query?: string; reverse?: boolean; sortKey?: string }): Promise<Product[]> {
  if (USE_MOCK) return mockProducts;

  const res = await shopifyFetch<{ data: { products: Connection<Product> } }>({
    query: getProductsQuery,
    variables: { query, reverse, sortKey },
    tags: ['products']
  });

  return res.body.data.products.edges.map((edge: any) => edge.node);
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  if (USE_MOCK) return mockProducts.find(p => p.handle === handle);

  const res = await shopifyFetch<{ data: { product: Product } }>({
    query: getProductQuery,
    variables: { handle },
    tags: ['products']
  });

  return res.body.data.product;
}

// --- Cart Fetchers ---

export async function getCart(cartId: string): Promise<Cart | undefined> {
  if (USE_MOCK) return mockCart;

  const res = await shopifyFetch<{ data: { cart: Cart } }>({
    query: getCartQuery,
    variables: { cartId },
    tags: ['cart'],
    cache: 'no-store'
  });

  return res.body.data.cart;
}

export async function createCart(): Promise<Cart> {
  if (USE_MOCK) return mockCart;

  const res = await shopifyFetch<{ data: { cartCreate: { cart: Cart } } }>({
    query: createCartMutation,
    cache: 'no-store'
  });

  return res.body.data.cartCreate.cart;
}

export async function addToCart(cartId: string, lines: { merchandiseId: string; quantity: number; attributes?: { key: string; value: string }[] }[]): Promise<Cart> {
  if (USE_MOCK) {
    // Very basic mock logic
    return mockCart;
  }

  const res = await shopifyFetch<{ data: { cartLinesAdd: { cart: Cart } } }>({
    query: addToCartMutation,
    variables: { cartId, lines },
    cache: 'no-store'
  });

  return res.body.data.cartLinesAdd.cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  if (USE_MOCK) return mockCart;

  const res = await shopifyFetch<{ data: { cartLinesRemove: { cart: Cart } } }>({
    query: removeFromCartMutation,
    variables: { cartId, lineIds },
    cache: 'no-store'
  });

  return res.body.data.cartLinesRemove.cart;
}

export async function updateCart(cartId: string, lines: { id: string; quantity: number; attributes?: { key: string; value: string }[] }[]): Promise<Cart> {
  if (USE_MOCK) return mockCart;

  const res = await shopifyFetch<{ data: { cartLinesUpdate: { cart: Cart } } }>({
    query: updateCartMutation,
    variables: { cartId, lines },
    cache: 'no-store'
  });

  return res.body.data.cartLinesUpdate.cart;
}