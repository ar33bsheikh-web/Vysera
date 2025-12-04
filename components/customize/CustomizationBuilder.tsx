'use client';

import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import CanvasPreview from './CanvasPreview';
import { addCustomItem } from '../../actions/cart';
import { useCart } from '../../hooks/use-cart';
import { Loader2 } from 'lucide-react';
import { formatPrice } from '../../lib/utils';

// Mock Product Variant ID for the custom base
const BASE_VARIANT_ID = "gid://shopify/ProductVariant/3"; // Corresponds to Mock Data "Custom Ring"

export default function CustomizationBuilder() {
  const [step, setStep] = useState(1);
  const [text, setText] = useState('');
  const [font, setFont] = useState<'inter' | 'cairo'>('inter');
  const [metal, setMetal] = useState<'gold' | 'silver' | 'rose'>('gold');
  const [previewImage, setPreviewImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { onOpen } = useCart();

  const handleAddToCart = async () => {
    setIsSubmitting(true);
    try {
      await addCustomItem(BASE_VARIANT_ID, {
        text,
        font,
        image: previewImage // This creates a very long string. In prod, upload to S3 first and save URL.
      });
      onOpen();
    } catch (e) {
      console.error('Error:', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full">
      {/* Left: Visualizer */}
      <div className="flex flex-col justify-center order-2 lg:order-1">
        <CanvasPreview 
          text={text} 
          font={font} 
          color="black" 
          metalTone={metal}
          onPreviewGenerate={setPreviewImage}
        />
        <p className="text-xs text-center mt-4 text-muted-foreground">
          *Preview is an approximation. Actual engraving may vary slightly.
        </p>
      </div>

      {/* Right: Controls */}
      <div className="flex flex-col justify-center space-y-8 order-1 lg:order-2">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Engraved Bar Necklace</h1>
          <p className="text-xl font-medium">{formatPrice("150.00")}</p>
        </div>

        <div className="space-y-6">
          {/* Step 1: Metal */}
          <div className="space-y-3">
            <Label className="uppercase text-xs font-bold tracking-wider">1. Choose Metal</Label>
            <div className="flex gap-3">
              {['gold', 'silver', 'rose'].map((m) => (
                <button
                  key={m}
                  onClick={() => setMetal(m as 'gold' | 'silver' | 'rose')}
                  className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent w-24 capitalize ${
                    metal === m ? 'border-primary bg-primary/10' : 'border-muted'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Text */}
          <div className="space-y-3">
            <Label className="uppercase text-xs font-bold tracking-wider">2. Enter Inscription</Label>
            <Input 
              placeholder="Type a name, date, or phrase..." 
              value={text}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value.slice(0, 20))}
              className="h-12 text-lg"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Supports English (A-Z) & Arabic (أ-ي)</span>
              <span>{text.length}/20</span>
            </div>
          </div>

          {/* Step 3: Font */}
          <div className="space-y-3">
            <Label className="uppercase text-xs font-bold tracking-wider">3. Select Font Style</Label>
            <div className="grid w-full grid-cols-2 gap-2">
              <button
                onClick={() => setFont('inter')}
                className={`px-4 py-2 rounded border ${
                  font === 'inter' ? 'bg-primary text-white' : 'border-muted'
                }`}
              >
                Modern (Sans)
              </button>
              <button
                onClick={() => setFont('cairo')}
                className={`px-4 py-2 rounded border ${
                  font === 'cairo' ? 'bg-primary text-white' : 'border-muted'
                }`}
              >
                Editorial (Bold)
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t">
          <Button 
            size="lg" 
            className="w-full h-14 uppercase font-bold text-base"
            disabled={text.length === 0 || isSubmitting}
            onClick={handleAddToCart}
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : `Add to Bag — ${formatPrice("150.00")}`}
          </Button>
          <p className="text-center text-xs text-muted-foreground mt-3">
            Custom orders ship within 5-7 business days.
          </p>
        </div>
      </div>
    </div>
  );
}