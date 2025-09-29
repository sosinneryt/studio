"use client";

import { useState, useRef, useEffect, useTransition } from 'react';
import Image from 'next/image';
import screenfull from 'screenfull';
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Expand, Minimize, Pause, Play, Volume2, VolumeX, Sparkles, Loader } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { generateVideoAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

const scenes = [
  { id: 'beach', name: 'Peaceful Beach', imageId: 'escape-beach', audioSrc: '/sounds/waves.mp3', prompt: 'A tranquil beach scene with calm turquoise water and white sand, cinematic quality.' },
  { id: 'forest', name: 'Tranquil Forest', imageId: 'escape-forest', audioSrc: '/sounds/forest.mp3', prompt: 'A peaceful forest with tall trees and soft light filtering through the leaves, cinematic quality.' },
  { id: 'night-sky', name: 'Starry Night', imageId: 'escape-night-sky', audioSrc: '/sounds/night.mp3', prompt: 'A clear night sky full of stars over a calm landscape, timelapse, cinematic quality.' },
];

export function EscapeViewer() {
  const [selectedScene, setSelectedScene] = useState(scenes[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isGenerating, startTransition] = useTransition();
  const { toast } = useToast();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(selectedScene.audioSrc);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    if (isPlaying) {
      audioRef.current.play();
    }
    
    const audio = audioRef.current;

    return () => {
      audio.pause();
    };
  }, [selectedScene]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    const handleChange = () => {
      if(screenfull.isEnabled) {
        setIsFullscreen(screenfull.isFullscreen);
      }
    };
    if (screenfull.isEnabled) {
      screenfull.on('change', handleChange);
    }
    return () => {
      if (screenfull.isEnabled) {
        screenfull.off('change', handleChange);
      }
    };
  }, []);
  
  useEffect(() => {
    if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.play().catch(e => console.error("Video play failed", e));
    }
  }, [videoUrl])

  const handlePlayToggle = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleSceneChange = (sceneId: string) => {
    const newScene = scenes.find(s => s.id === sceneId);
    if(newScene) {
      setIsPlaying(false);
      setVideoUrl(null);
      setSelectedScene(newScene);
    }
  };

  const handleFullscreenToggle = () => {
    if (screenfull.isEnabled && containerRef.current) {
      screenfull.toggle(containerRef.current);
    }
  };

  const handleGenerateVideo = () => {
    startTransition(async () => {
      setVideoUrl(null);
      const result = await generateVideoAction(selectedScene.prompt);
      if (result.success && result.data) {
        setVideoUrl(result.data);
      } else {
        toast({
            variant: "destructive",
            title: "Video Generation Failed",
            description: result.error || "An unknown error occurred.",
        })
      }
    });
  }

  const image = PlaceHolderImages.find(img => img.id === selectedScene.imageId);

  return (
    <div ref={containerRef} className={cn("relative w-full transition-all bg-black", isFullscreen ? "fixed inset-0 z-50" : "rounded-lg border aspect-video")}>
        {videoUrl ? (
            <video
              ref={videoRef}
              src={videoUrl}
              loop
              playsInline
              className="w-full h-full object-cover"
            />
        ) : (
          image && (
            <Image
                src={image.imageUrl}
                alt={selectedScene.name}
                fill
                className="object-cover"
                data-ai-hint={image.imageHint}
                priority
            />
          )
        )}
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between gap-4">
            <Select value={selectedScene.id} onValueChange={handleSceneChange} disabled={isGenerating}>
                <SelectTrigger className="w-[200px] bg-background/70 backdrop-blur-sm">
                    <SelectValue placeholder="Select a scene" />
                </SelectTrigger>
                <SelectContent>
                    {scenes.map(scene => (
                        <SelectItem key={scene.id} value={scene.id}>{scene.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
                <Button size="default" variant="secondary" onClick={handleGenerateVideo} disabled={isGenerating}>
                    {isGenerating ? <Loader className="animate-spin" /> : <Sparkles />}
                    <span>{isGenerating ? 'Generating...' : 'Animate'}</span>
                </Button>
                <Button size="icon" variant="secondary" onClick={handleFullscreenToggle}>
                    {isFullscreen ? <Minimize /> : <Expand />}
                </Button>
            </div>
        </div>
        
        {isGenerating && (
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-20">
                <Loader className="h-12 w-12 animate-spin text-white" />
                <p className="mt-4 text-white text-lg font-semibold">Generating your virtual escape... this may take a minute.</p>
             </div>
        )}

        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-center gap-4 rounded-lg bg-background/70 p-2 backdrop-blur-sm">
            <Button size="icon" variant="ghost" onClick={handlePlayToggle}>
                {isPlaying ? <Pause /> : <Play />}
            </Button>
            <div className="flex items-center gap-2 w-full max-w-xs">
              <Button size="icon" variant="ghost" onClick={() => setIsMuted(!isMuted)}>
                {isMuted || volume === 0 ? <VolumeX /> : <Volume2 />}
              </Button>
              <Slider 
                min={0}
                max={1}
                step={0.01}
                value={[volume]}
                onValueChange={(value) => setVolume(value[0])}
                disabled={isMuted}
              />
            </div>
        </div>
    </div>
  );
}
