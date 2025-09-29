"use client";

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

const BUBBLE_COUNT = 48;

export function BubblePop() {
  const [poppedBubbles, setPoppedBubbles] = useState<boolean[]>(Array(BUBBLE_COUNT).fill(false));
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Correctly referencing the audio file from the public directory
    audioRef.current = new Audio('/sounds/pop.mp3');
  }, []);

  const handlePop = (index: number) => {
    if (!poppedBubbles[index]) {
      const newPoppedBubbles = [...poppedBubbles];
      newPoppedBubbles[index] = true;
      setPoppedBubbles(newPoppedBubbles);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(error => console.error("Audio play failed:", error));
      }
    }
  };

  const resetBubbles = () => {
    setPoppedBubbles(Array(BUBBLE_COUNT).fill(false));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-6 gap-2 p-4 bg-primary/10 rounded-lg">
        {poppedBubbles.map((isPopped, index) => (
          <button
            key={index}
            onClick={() => handlePop(index)}
            className={cn(
              "w-12 h-12 rounded-full transition-transform duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              isPopped
                ? "bg-primary/30 scale-90"
                : "bg-primary/60 hover:bg-primary/80 active:scale-95 transform hover:scale-105"
            )}
            aria-label={isPopped ? "Bubble popped" : `Pop bubble ${index + 1}`}
          />
        ))}
      </div>
      <Button onClick={resetBubbles} variant="outline" className="mt-6">
        <RotateCcw className="mr-2 h-4 w-4" />
        Reset
      </Button>
    </div>
  );
}
