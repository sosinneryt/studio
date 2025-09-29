"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const patterns = [
  { id: 'pulse', name: 'Pulse' },
  { id: 'fade', name: 'Fade' },
  { id: 'aurora', name: 'Aurora' },
];

const colors = [
    { id: 'serene', name: 'Serene', from: 'from-primary', via: 'via-accent', to: 'to-blue-300' },
    { id: 'sunset', name: 'Sunset', from: 'from-yellow-300', via: 'via-red-400', to: 'to-purple-400' },
    { id: 'forest', name: 'Forest', from: 'from-green-300', via: 'via-teal-400', to: 'to-blue-400' },
    { id: 'soft-sunset', name: 'Soft Sunset', from: 'from-[#FFD6C0]', via: 'via-[#FFA8A0]', to: 'to-[#FFDEE9]' },
    { id: 'tranquil-blue', name: 'Tranquil Blue', from: 'from-[#B8E0FF]', via: 'via-[#A2D5C6]', to: 'to-[#C1CEE6]' },
    { id: 'serene-green', name: 'Serene Green', from: 'from-[#D8E6DF]', via: 'via-[#B5EAD7]', to: 'to-[#C7FFD8]' },
    { id: 'dreamy-aurora', name: 'Dreamy Aurora', from: 'from-[#C8B8E8]', via: 'via-[#BDE0FE]', to: 'to-[#FFF9CA]' },
    { id: 'peaceful-ocean', name: 'Peaceful Ocean', from: 'from-[#CFE9DB]', via: 'via-[#AED9E0]', to: 'to-[#BBCDD8]' },
    { id: 'misty-pastels', name: 'Misty Pastels', from: 'from-[#FFD3E2]', via: 'via-[#D7E3FC]', to: 'to-[#D5F0FF]' },
    { id: 'zen-garden', name: 'Zen Garden', from: 'from-[#D1E2C4]', via: 'via-[#FAE3D9]', to: 'to-[#BFD8D4]' },
];


export function LightPatternCustomizer() {
  const [pattern, setPattern] = useState(patterns[0].id);
  const [speed, setSpeed] = useState(10); // in seconds
  const [color, setColor] = useState(colors[0]);

  const animationClass = {
    pulse: 'animate-[pulse_10s_ease-in-out_infinite]',
    fade: 'animate-[fadeInOut_10s_ease-in-out_infinite]',
    aurora: 'animate-[aurora_20s_ease-in-out_infinite]',
  };
  
  // A keyframe definition is needed for fadeInOut and aurora
  const keyframes = `
    @keyframes fadeInOut {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 1; }
    }
    @keyframes aurora {
        0% { background-position: 0% 50% }
        50% { background-position: 100% 50% }
        100% { background-position: 0% 50% }
    }
  `;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <style>{keyframes}</style>
      <Card className="lg:col-span-2">
        <CardContent className="p-0">
          <div
            className={cn(
              "w-full h-96 rounded-lg bg-gradient-to-br transition-all duration-1000",
              color.from, color.via, color.to,
              pattern === 'aurora' ? 'bg-[size:400%_400%]' : ''
            )}
            style={{ 
              animationName: pattern === 'aurora' ? 'aurora' : (pattern === 'pulse' ? 'pulse' : 'fadeInOut'),
              animationDuration: `${speed}s`,
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite'
             }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customize</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="mb-2 block">Pattern</Label>
            <RadioGroup value={pattern} onValueChange={setPattern} className="flex gap-4">
              {patterns.map(p => (
                <div key={p.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={p.id} id={p.id} />
                  <Label htmlFor={p.id}>{p.name}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="speed-slider">Speed ({speed}s)</Label>
            <Slider
              id="speed-slider"
              min={2}
              max={30}
              step={1}
              value={[speed]}
              onValueChange={(value) => setSpeed(value[0])}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Color Palette</Label>
            <ScrollArea className="w-full whitespace-nowrap rounded-md">
              <div className="flex w-max space-x-2 p-2">
                {colors.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setColor(c)}
                    className={cn(
                      "h-14 w-14 flex-shrink-0 rounded-md border-2 transition-all",
                      c.id === color.id ? 'border-ring' : 'border-transparent',
                    )}
                  >
                    <div className={cn("w-full h-full rounded bg-gradient-to-br", c.from, c.via, c.to)} />
                    <span className="sr-only">{c.name}</span>
                  </button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
