'use client';

import { useState, useTransition } from 'react';
import { addItem } from '../../actions/cart';
import { Button } from '../../components/ui/button';
import { useCart } from '../../hooks/use-cart';
import { Loader2 } from 'lucide-react';

export function AddToCart({ 
  variantId, 
  available 
}: { 
  variantId: string | undefined; 
  available: boolean; 
}) {
  const [isPending, startTransition] = useTransition();
  const { onOpen } = useCart();

  const handleAddToCart = () => {
    if (!variantId) return;

    startTransition(async () => {
      const result = await addItem(null, variantId);
      
      if (result === 'success') {
        onOpen(); // Open cart drawer
      }
    });
  };

  return (
    <Button
      size="lg"
      className="w-full text-base font-bold uppercase rounded-none h-14"
      onClick={handleAddToCart}
      disabled={isPending || !available || !variantId}
    >
      {isPending ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : !available ? (
        'Out of Stock'
      ) : (
        'Add to Bag'
      )}
    </Button>
  );
}