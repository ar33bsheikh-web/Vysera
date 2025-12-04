'use client';

import Link from 'next/link';
import { useCart } from '../../hooks/use-cart';
import { ShoppingBag, Search, Menu, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import CartDrawer from '../../components/cart/CartDrawer';

export default function Header({ cart }: { cart: any }) {
  const { onOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 w-full z-40 transition-all duration-300 border-b border-transparent",
          scrolled ? "bg-background/95 backdrop-blur-sm border-border py-3" : "bg-transparent py-5 text-white"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Left: Mobile Menu / Desktop Links */}
          <div className="flex items-center gap-6">
            <button className="lg:hidden">
              <Menu className="w-6 h-6" />
            </button>
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium tracking-wide">
              <Link href="/new" className="hover:opacity-70">NEW ARRIVALS</Link>
              <Link href="/collections/all" className="hover:opacity-70">SHOP</Link>
              <Link href="/customize" className="hover:opacity-70 text-brand-rose">CUSTOMIZE</Link>
            </nav>
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="text-2xl font-black tracking-tighter uppercase">
              Vysera
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-5">
            <Link href="/search" className="hover:opacity-70">
              <Search className="w-5 h-5" />
            </Link>
            <Link href="/wishlist" className="hidden sm:block hover:opacity-70">
              <Heart className="w-5 h-5" />
            </Link>
            <button onClick={onOpen} className="relative hover:opacity-70">
              <ShoppingBag className="w-5 h-5" />
              {cart?.totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-rose text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                  {cart.totalQuantity}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <CartDrawer cart={cart} />
    </>
  );
}