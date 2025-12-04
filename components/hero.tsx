import Link from 'next/link';
import { Button } from '../components/ui/button';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Background Image - Flash Photography Style */}
      <div 
        className="absolute inset-0 z-0 opacity-80"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1618453292507-4959efe6e35b?q=80&w=2070&auto=format&fit=crop)', // Dark, moody jewelry shot
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-black/30 z-10" />

      {/* Content */}
      <div className="relative z-20 container h-full flex flex-col justify-end pb-32 md:pb-40 px-4">
        <div className="max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <h2 className="text-brand-rose font-medium tracking-wider uppercase text-sm">
            Collection 04
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9]">
            NOCTURNAL <br /> 
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-gray-500">
              ELEGANCE
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-md leading-relaxed">
            Bold structures meet delicate light. Discover the new season of engineered luxury.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200 rounded-none text-base font-bold uppercase tracking-wide">
              <Link href="/new">
                Shop New Arrivals
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black rounded-none text-base font-bold uppercase tracking-wide bg-transparent">
              <Link href="/customize" className="flex items-center gap-2">
                Customize Yours <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}