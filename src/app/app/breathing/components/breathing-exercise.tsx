"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const breathingCycle = [
  { state: 'Breathe In', duration: 4000 },
  { state: 'Hold', duration: 4000 },
  { state: 'Breathe Out', duration: 6000 },
];

export function BreathingExercise() {
  const [cycleIndex, setCycleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCycleIndex((prevIndex) => (prevIndex + 1) % breathingCycle.length);
    }, breathingCycle[cycleIndex].duration);

    return () => clearInterval(interval);
  }, [cycleIndex]);

  const currentPhase = breathingCycle[cycleIndex];
  const isHolding = currentPhase.state === 'Hold';
  const isBreathingIn = currentPhase.state === 'Breathe In';

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className={cn(
          'absolute rounded-full bg-primary/20 transition-transform duration-[3000ms] ease-in-out',
          isBreathingIn || isHolding ? 'scale-100' : 'scale-50'
        )}
        style={{ width: '100%', height: '100%', transitionDuration: `${currentPhase.duration}ms` }}
      />
       <div
        className={cn(
          'absolute rounded-full bg-primary/40 transition-transform duration-[3000ms] ease-in-out',
          isBreathingIn || isHolding ? 'scale-75' : 'scale-25'
        )}
        style={{ width: '100%', height: '100%', transitionDuration: `${currentPhase.duration}ms` }}
      />
      <div
        className={cn(
          'relative w-48 h-48 rounded-full bg-primary flex items-center justify-center transition-transform ease-in-out',
          isBreathingIn ? 'scale-125' : 'scale-100'
        )}
        style={{ transitionDuration: `${currentPhase.duration}ms` }}
      >
        <span className="text-xl font-bold text-primary-foreground tracking-wider">
          {currentPhase.state}
        </span>
      </div>
    </div>
  );
}
