"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label';

const breathingCycles = {
  'balanced': {
    name: 'Balanced Breathing',
    cycle: [
      { state: 'Breathe In', duration: 4000 },
      { state: 'Hold', duration: 4000 },
      { state: 'Breathe Out', duration: 4000 },
      { state: 'Hold', duration: 4000 },
    ]
  },
  '4-7-8': {
    name: '4-7-8 Method',
    cycle: [
      { state: 'Breathe In', duration: 4000 },
      { state: 'Hold', duration: 7000 },
      { state: 'Breathe Out', duration: 8000 },
    ]
  },
  'box': {
    name: 'Box Breathing',
    cycle: [
      { state: 'Breathe In', duration: 4000 },
      { state: 'Hold', duration: 4000 },
      { state: 'Breathe Out', duration: 4000 },
      { state: 'Hold', duration: 4000 },
    ]
  }
};

export function BreathingExercise() {
  const [cycleType, setCycleType] = useState('balanced');
  const [cycleIndex, setCycleIndex] = useState(0);

  const currentBreathingCycle = breathingCycles[cycleType].cycle;

  useEffect(() => {
    const interval = setInterval(() => {
      setCycleIndex((prevIndex) => (prevIndex + 1) % currentBreathingCycle.length);
    }, currentBreathingCycle[cycleIndex].duration);

    return () => clearInterval(interval);
  }, [cycleIndex, currentBreathingCycle]);
  
  useEffect(() => {
    setCycleIndex(0);
  }, [cycleType]);

  const currentPhase = currentBreathingCycle[cycleIndex];
  const isHolding = currentPhase.state === 'Hold';
  const isBreathingIn = currentPhase.state === 'Breathe In';

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="w-full max-w-sm mb-8">
        <Label htmlFor="breathing-style-select" className="mb-2 block text-center">Breathing Style</Label>
        <Select value={cycleType} onValueChange={setCycleType}>
          <SelectTrigger id="breathing-style-select" className="w-full">
            <SelectValue placeholder="Select a breathing style" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(breathingCycles).map(([key, value]) => (
                <SelectItem key={key} value={key}>{value.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
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
    </div>
  );
}
