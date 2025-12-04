import { notFound } from 'next/navigation';
import { getProduct, getProducts } from '../../../../../lib/shopify';
import ProductGallery from '../../../../../components/product/ProductGallery';
import { AddToCart } from '../../../../../components/product/AddToCart';
import { formatPrice } from '../../../../../lib/utils';
import { generateProductJsonLd } from '../../../../../lib/seo';
import ProductModelViewer from '../../../../../components/product/ProductModelViewer';
import Link from 'next/link';
import { Suspense } from 'react';

export async function generateMetadata({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle);
  if (!product) return notFound();

  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle);
  if (!product) return notFound();

  const defaultVariant = product.variants[0];
  const jsonLd = generateProductJsonLd(product);

  return (
    <div className="container mx-auto px-4 py-12 lg:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        
        {/* Left: Media */}
        <div className="space-y-8">
          <ProductGallery images={product.images} />
        </div>

        {/* Right: Details */}
        <div className="flex flex-col h-full">
          <div className="sticky top-24 space-y-8">
            {/* Header */}
            <div className="space-y-2 border-b pb-6">
              <h1 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">{product.title}</h1>
              <p className="text-xl font-medium">
                {formatPrice(product.priceRange.minVariantPrice.amount)}
              </p>
            </div>

            {/* Description */}
            <div className="text-muted-foreground text-sm">
              {product.description}
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-4">
              <AddToCart 
                variantId={defaultVariant?.id} 
                available={true}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}