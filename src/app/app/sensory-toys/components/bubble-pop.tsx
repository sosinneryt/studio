"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const BUBBLE_COUNT = 30;

interface Bubble {
  id: number;
  popped: boolean;
}

export function BubblePop() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const initialBubbles = Array.from({ length: BUBBLE_COUNT }, (_, i) => ({
      id: i,
      popped: false,
    }));
    setBubbles(initialBubbles);
  }, []);

  const handlePop = (id: number) => {
    // Pop the bubble
    setBubbles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );

    // Regenerate the bubble after a delay
    setTimeout(() => {
      setBubbles((prev) =>
        prev.map((b) => (b.id === id ? { ...b, popped: false } : b))
      );
    }, 1500);
  };

  return (
    <div className="relative w-full h-[400px] flex flex-wrap items-center justify-center gap-2 p-4 bg-secondary/30 rounded-lg">
      {bubbles.map((bubble) => (
        <button
          key={bubble.id}
          onClick={() => handlePop(bubble.id)}
          className={cn(
            'w-16 h-16 rounded-full transition-all duration-150 ease-in-out',
            'bg-primary/50 border-2 border-primary/80 backdrop-blur-sm',
            'hover:scale-110 hover:bg-primary/70',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-secondary',
            bubble.popped ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
          )}
          aria-label="Pop bubble"
          disabled={bubble.popped}
        />
      ))}
    </div>
  );
}
