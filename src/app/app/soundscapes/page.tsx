"use client"

import { useState } from 'react';
import Image from 'next/image';
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CloudRain, Waves, TreeDeciduous, Speaker, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { cn } from '@/lib/utils';

const soundscapes = [
  { id: 'gentle-rain', title: 'Gentle Rain', icon: CloudRain, imageId: 'gentle-rain' },
  { id: 'ocean-waves', title: 'Ocean Waves', icon: Waves, imageId: 'ocean-waves' },
  { id: 'forest-ambience', title: 'Forest Ambience', icon: TreeDeciduous, imageId: 'forest-ambience' },
  { id: 'white-noise', title: 'White Noise', icon: Speaker, imageId: 'white-noise' },
];

export default function SoundscapesPage() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handlePlayToggle = (id: string) => {
    setPlayingId(currentId => (currentId === id ? null : id));
    // In a real app, you would handle audio playback here.
  };

  return (
    <div>
      <PageHeader
        title="Calming Soundscapes"
        description="Immerse yourself in a world of soothing sounds."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {soundscapes.map((sound) => {
          const image = PlaceHolderImages.find(img => img.id === sound.imageId);
          const isPlaying = playingId === sound.id;

          return (
            <Card key={sound.id} className={cn("overflow-hidden transition-all duration-300", isPlaying ? "shadow-primary/40 shadow-lg ring-2 ring-primary" : "hover:shadow-xl")}>
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  {image && (
                     <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint={image.imageHint}
                      />
                  )}
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <sound.icon className="h-8 w-8 mb-2 opacity-80" />
                    <h3 className="font-bold text-xl">{sound.title}</h3>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4">
                <Button
                  variant={isPlaying ? "default" : "outline"}
                  className="w-full"
                  onClick={() => handlePlayToggle(sound.id)}
                >
                  {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                  {isPlaying ? "Pause" : "Play"}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
