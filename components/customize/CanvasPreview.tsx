'use client';

import { useEffect, useRef } from 'react';
import { cairo, inter } from '../../lib/fonts';

interface CanvasPreviewProps {
  text: string;
  font: 'inter' | 'cairo';
  color: string;
  metalTone: 'gold' | 'silver' | 'rose';
  onPreviewGenerate: (dataUrl: string) => void;
}

export default function CanvasPreview({
  text,
  font,
  color,
  metalTone,
  onPreviewGenerate
}: CanvasPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Product Base Images (Simulated with colors for now, normally these are transparent PNGs)
  const getMetalColor = () => {
    switch (metalTone) {
      case 'gold': return '#D4AF37';
      case 'rose': return '#B76E79';
      case 'silver': return '#E0E0E0';
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Draw Product Base (Simplified as a rectangle for demo, normally drawImage)
    // In a real app: const img = new Image(); img.src = '...'; img.onload = () => { ... }
    ctx.fillStyle = getMetalColor();
    ctx.fillRect(50, 100, 700, 150); // A flat bar necklace shape
    
    // Add some shine/gradient
    const grad = ctx.createLinearGradient(50, 100, 50, 250);
    grad.addColorStop(0, 'rgba(255,255,255,0.4)');
    grad.addColorStop(0.5, 'rgba(255,255,255,0)');
    grad.addColorStop(1, 'rgba(0,0,0,0.1)');
    ctx.fillStyle = grad;
    ctx.fillRect(50, 100, 700, 150);

    // 3. Configure Text
    const isArabic = /[\u0600-\u06FF]/.test(text);
    const fontFamily = font === 'cairo' || isArabic ? 'sans-serif' : 'serif'; // using system fonts mapping to our loaded fonts effectively
    
    ctx.font = `bold 60px ${fontFamily}`;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'; // Engraving look
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // 4. Draw Text (Handle RTL)
    if (isArabic) {
      ctx.direction = 'rtl';
    } else {
      ctx.direction = 'ltr';
    }

    // Center text on the bar
    ctx.fillText(text, 400, 175);

    // 5. Export
    const dataUrl = canvas.toDataURL('image/png');
    onPreviewGenerate(dataUrl);

  }, [text, font, color, metalTone]);

  return (
    <div className="relative w-full aspect-video bg-neutral-100 rounded-lg overflow-hidden shadow-inner border">
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={450} 
        className="w-full h-full object-contain"
      />
      <div className="absolute bottom-2 right-2 text-[10px] text-gray-400 uppercase font-bold">
        Live Preview
      </div>
    </div>
  );
}