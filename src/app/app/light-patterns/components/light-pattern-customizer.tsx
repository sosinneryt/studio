"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const patterns = [
  { id: 'pulse', name: 'Pulse' },
  { id: 'fade', name: 'Fade' },
  { id: 'aurora', name: 'Aurora' },
];

const colors = [
  { id: 'serene', name: 'Serene', from: 'from-primary', via: 'via-accent', to: 'to-blue-300' },
  { id: 'sunset', name: 'Sunset', from: 'from-yellow-300', via: 'via-red-400', to: 'to-purple-400' },
  { id: 'forest', name: 'Forest', from: 'from-green-300', via: 'via-teal-400', to: 'to-blue-400' },
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
            <div className="mt-2 grid grid-cols-3 gap-2">
              {colors.map(c => (
                <button
                  key={c.id}
                  onClick={() => setColor(c)}
                  className={cn(
                    "h-14 rounded-md border-2 transition-all",
                    c.id === color.id ? 'border-ring' : 'border-transparent',
                  )}
                >
                  <div className={cn("w-full h-full rounded bg-gradient-to-br", c.from, c.to)} />
                  <span className="sr-only">{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
