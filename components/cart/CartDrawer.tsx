'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../../components/ui/sheet';
import { useCart } from '../../hooks/use-cart';
import { Button } from '../../components/ui/button';
import { ShoppingBag } from 'lucide-react';
import { formatPrice } from '../../lib/utils';
import Image from 'next/image';

// Mock data used here for visualization until real data flows
const CartDrawer = ({ cart }: { cart: any }) => {
  const { isOpen, onClose } = useCart();
  const items = cart?.lines?.edges || [];
  const subtotal = cart?.cost?.subtotalAmount?.amount || "0.00";

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="flex items-center gap-2">
            Your Bag <span className="text-muted-foreground text-sm font-normal">({cart?.totalQuantity || 0})</span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <ShoppingBag className="h-12 w-12 text-muted-foreground/50" />
            <p className="text-muted-foreground">Your bag is empty.</p>
            <Button onClick={onClose} variant="outline">Start Shopping</Button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto py-4 space-y-6">
            {items.map(({ node }: any) => (
              <div key={node.id} className="flex gap-4">
                <div className="relative h-24 w-24 overflow-hidden bg-secondary">
                  {node.merchandise.product.featuredImage && (
                     <Image 
                        src={node.merchandise.product.featuredImage.url} 
                        alt={node.merchandise.product.title} 
                        fill
                        className="object-cover"
                     />
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium text-sm">{node.merchandise.product.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{node.merchandise.title}</p>
                    {/* Show customizations */}
                    {node.attributes.map((attr: any) => (
                       !attr.key.startsWith('_') && (
                         <p key={attr.key} className="text-[10px] text-muted-foreground uppercase mt-1">
                           {attr.key}: {attr.value}
                         </p>
                       )
                    ))}
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="text-sm font-medium">{formatPrice(node.cost.totalAmount.amount)}</p>
                    {/* Quantity controls would go here */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div className="border-t pt-4 space-y-4">
            <div className="flex justify-between text-base font-medium">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs text-muted-foreground text-center">Shipping and taxes calculated at checkout.</p>
            <Button className="w-full" onClick={() => window.location.href = cart?.checkoutUrl}>
              Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;