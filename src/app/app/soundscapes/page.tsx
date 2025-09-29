"use client"

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CloudRain, Waves, TreeDeciduous, Speaker, Play, Pause, BrainCircuit, BotMessageSquare } from "lucide-react";
import { cn } from '@/lib/utils';

const soundscapes = [
  { id: 'gentle-rain', title: 'Gentle Rain', icon: CloudRain, imageId: 'gentle-rain', audioSrc: '/sounds/rain.mp3' },
  { id: 'ocean-waves', title: 'Ocean Waves', icon: Waves, imageId: 'ocean-waves', audioSrc: '/sounds/waves.mp3' },
  { id: 'forest-ambience', title: 'Forest Ambience', icon: TreeDeciduous, imageId: 'forest-ambience', audioSrc: '/sounds/forest.mp3' },
  { id: '852hz', title: '852 Hz Solfeggio', icon: BrainCircuit, imageId: '852hz', audioSrc: '/sounds/852hz.mp3' },
  { id: 'om-chant', title: 'Om Chant', icon: BotMessageSquare, imageId: 'om-chant', audioSrc: '/sounds/om-chant.mp3' },
  { id: 'white-noise', title: 'White Noise', icon: Speaker, imageId: 'white-noise', audioSrc: '/sounds/white-noise.mp3' },
];

export default function SoundscapesPage() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.loop = true;
    
    const audio = audioRef.current;
    
    return () => {
      audio.pause();
    }
  }, []);

  const handlePlayToggle = (id: string, src: string) => {
    if (audioRef.current) {
        if (playingId === id) {
          audioRef.current.pause();
          setPlayingId(null);
        } else {
          audioRef.current.src = src;
          audioRef.current.play();
          setPlayingId(id);
        }
    }
  };

  return (
    <div>
      <PageHeader
        title="Calming Soundscapes"
        description="Immerse yourself in a world of soothing sounds."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  onClick={() => handlePlayToggle(sound.id, sound.audioSrc)}
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
