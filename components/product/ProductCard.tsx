'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '../../lib/utils';
import { Product } from '../../lib/shopify/type';

const ProductCard = ({ product }: { product: Product }) => {
  const firstImage = product.images[0];
  const secondImage = product.images[1];

  return (
    <Link href={`/product/${product.handle}`} className="group block space-y-3">
      <div className="relative aspect-4/5 overflow-hidden bg-secondary">
        {/* Main Image */}
        {firstImage && (
          <Image
            src={firstImage.src}
            alt={firstImage.alt || product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105 z-10"
          />
        )}
        {/* Hover Image (if exists) */}
        {secondImage && (
          <Image
            src={secondImage.src}
            alt={secondImage.alt || ""}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-primary leading-tight">{product.title}</h3>
        </div>
        <p className="text-sm font-medium">
          {formatPrice(product.priceRange.minVariantPrice.amount)}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;