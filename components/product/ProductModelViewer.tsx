'use client';

import '@google/model-viewer';
import { useEffect, useState } from 'react';

export default function ProductModelViewer({ 
  modelUrl, 
  posterUrl 
}: { 
  modelUrl: string; 
  posterUrl?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="aspect-square bg-secondary animate-pulse" />;

  return (
    <div className="w-full aspect-square bg-secondary flex items-center justify-center relative">
      {/* @ts-ignore */}
      <model-viewer
        src={modelUrl}
        ios-src={modelUrl}
        poster={posterUrl}
        alt="3D Model of jewelry"
        shadow-intensity="1"
        camera-controls
        auto-rotate
        ar
        ar-modes="webxr scene-viewer quick-look"
        style={{ width: '100%', height: '100%' }}
      >
        <button slot="ar-button" className="absolute bottom-4 right-4 bg-black text-white px-4 py-2 text-sm font-bold rounded-full">
          View in your space
        </button>
        {/* @ts-ignore */}
      </model-viewer>
    </div>
  );
}