"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';

export function StressBall() {
  const [isSqueezing, setIsSqueezing] = useState(false);

  const handleSqueeze = () => {
    setIsSqueezing(true);
    setTimeout(() => setIsSqueezing(false), 200);
  };

  return (
    <div 
      className="w-full h-[400px] flex items-center justify-center cursor-pointer"
      onMouseDown={handleSqueeze}
      onTouchStart={handleSqueeze}
    >
      <div
        className={cn(
          'w-48 h-48 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg transition-transform duration-200 ease-out',
          isSqueezing ? 'scale-x-110 scale-y-90' : 'scale-100'
        )}
      />
    </div>
  );
}
