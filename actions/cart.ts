'use server';

import { cookies } from 'next/headers';
import { addToCart, createCart, getCart, removeFromCart, updateCart } from '../lib/shopify';
import { revalidatePath } from 'next/cache';

export async function getCartId() {
  const cookieStore = await cookies();
  return cookieStore.get('cartId')?.value;
}

export async function createCartAndSetCookie() {
  const cart = await createCart();
  const cookieStore = await cookies();
  cookieStore.set('cartId', cart.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  });
  return cart;
}

export async function addItem(prevState: any, selectedVariantId: string | undefined) {
  let cartId = await getCartId();
  let cart;

  if (!cartId) {
    cart = await createCartAndSetCookie();
    cartId = cart.id;
  }

  if (!selectedVariantId) {
    return 'Missing product variant ID';
  }

  try {
    await addToCart(cartId, [{ merchandiseId: selectedVariantId, quantity: 1 }]);
    revalidatePath('/');
    return 'success';
  } catch (e) {
    return 'Error adding item to cart';
  }
}

export async function addCustomItem(variantId: string, customizationData: { text: string; font: string; image: string }) {
  let cartId = await getCartId();
  if (!cartId) {
    const cart = await createCartAndSetCookie();
    cartId = cart.id;
  }

  const attributes = [
    { key: 'Custom Text', value: customizationData.text },
    { key: 'Font', value: customizationData.font },
    { key: '_Custom Preview', value: customizationData.image } // _prefix hides from checkout in some themes, usually
  ];

  await addToCart(cartId, [{ merchandiseId: variantId, quantity: 1, attributes }]);
  revalidatePath('/');
}

export async function updateItemQuantity(lineId: string, variantId: string, quantity: number) {
  const cartId = await getCartId();
  if (!cartId) return;

  if (quantity === 0) {
    await removeFromCart(cartId, [lineId]);
  } else {
    await updateCart(cartId, [{ id: lineId, quantity }]);
  }
  revalidatePath('/');
}