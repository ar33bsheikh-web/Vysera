import { getProducts } from '../../../lib/shopify';
import { Hero } from '../../../components/hero';
import ProductCard from '../../../components/product/ProductCard';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../../../components/ui/button';

export default async function HomePage() {
  // Fetch first 4 products for the "New Releases" grid
  const products = await getProducts({ sortKey: 'CREATED_AT', reverse: true });
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      <Hero />

      {/* New Releases Grid */}
      <section className="py-20 container px-4">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase">New Releases</h2>
          <Link href="/new" className="text-sm font-bold uppercase border-b border-black pb-1 hover:opacity-60 transition">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {featuredProducts.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Editorial / Story Section */}
      <section className="py-20 bg-secondary/30 border-y border-border">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square lg:aspect-[4/5] overflow-hidden bg-gray-200 group">
               <Image 
                 src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2075&auto=format&fit=crop"
                 alt="Artisan working on ring"
                 fill
                 className="object-cover transition-transform duration-1000 group-hover:scale-105"
               />
            </div>
            
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
                Engineered <br/>for the <br/>Individual
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground max-w-md">
                <p>
                  At Vysera, we don't just make jewelry. We engineer artifacts. 
                  Our process blends traditional casting with modern 3D precision, 
                  allowing for levels of customization previously impossible.
                </p>
                <p>
                  From Arabic calligraphy to coordinate mapping, make it yours.
                </p>
              </div>
              <Button asChild size="lg" className="rounded-none font-bold uppercase">
                <Link href="/about">Read Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee / Trust Indicators */}
      <section className="py-12 border-b border-border overflow-hidden">
        <div className="flex gap-16 justify-center items-center text-sm font-bold uppercase tracking-widest text-muted-foreground/60 whitespace-nowrap">
          <span>Lifetime Warranty</span>
          <span>•</span>
          <span>Ethically Sourced</span>
          <span>•</span>
          <span>Carbon Neutral</span>
          <span>•</span>
          <span>Next-Day Shipping</span>
          <span>•</span>
          <span>Lifetime Warranty</span>
        </div>
      </section>
    </>
  );
}