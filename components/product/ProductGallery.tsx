'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { Image as ShopifyImage } from '../../lib/shopify/type';

export default function ProductGallery({ images }: { images: ShopifyImage[] }) {
  const [activeImage, setActiveImage] = useState(0);

  if (!images.length) return <div className="bg-secondary aspect-square" />;

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnails (Desktop Left / Mobile Bottom) */}
      <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px] no-scrollbar snap-x">
        {images.map((img, idx) => (
          <button
            key={img.src}
            onClick={() => setActiveImage(idx)}
            className={cn(
              "relative w-20 h-20 lg:w-24 lg:h-24 shrink-0 border-2 transition-all overflow-hidden snap-start",
              activeImage === idx ? "border-black" : "border-transparent hover:border-gray-300"
            )}
          >
            <Image
              src={img.src}
              alt={img.alt || "Thumbnail"}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative aspect-square w-full bg-secondary overflow-hidden">
         <Image
           src={images[activeImage].src}
           alt={images[activeImage].alt || "Product Image"}
           fill
           priority
           className="object-cover"
           sizes="(max-width: 768px) 100vw, 50vw"
         />
         {/* Zoom hint usually goes here */}
      </div>
    </div>
  );
}