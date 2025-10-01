"use client";

import { useState, useRef, useEffect, useTransition } from 'react';
import screenfull from 'screenfull';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Expand, Minimize, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const scenes = [
  { id: 'beach', name: 'Peaceful Beach', videoSrc: '/videos/beach.mp4', audioSrc: '/sounds/waves.mp3' },
  { id: 'forest', name: 'Tranquil Forest', videoSrc: '/videos/forest.mp4', audioSrc: '/sounds/forest.mp3' },
  { id: 'night-sky', name: 'Starry Night', videoSrc: '/videos/night-sky.mp4', audioSrc: '/sounds/night.mp3' },
];

export function EscapeViewer() {
  const [selectedScene, setSelectedScene] = useState(scenes[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Setup the scene audio
    audioRef.current = new Audio(selectedScene.audioSrc);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    if (isPlaying) {
      audioRef.current.play();
    }
    
    // Setup video
    if(videoRef.current) {
        videoRef.current.src = selectedScene.videoSrc;
        videoRef.current.load();
        videoRef.current.play().catch(e => console.error("Video autoplay failed", e));
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
      setSelectedScene(newScene);
    }
  };

  const handleFullscreenToggle = () => {
    if (screenfull.isEnabled && containerRef.current) {
      screenfull.toggle(containerRef.current);
    }
  };

  return (
    <div ref={containerRef} className={cn("relative w-full transition-all bg-black", isFullscreen ? "fixed inset-0 z-50" : "rounded-lg border aspect-video")}>
        <video 
            ref={videoRef}
            src={selectedScene.videoSrc}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
        />

        <div className="absolute inset-0 bg-black/20" />
        
        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between gap-4">
            <Select value={selectedScene.id} onValueChange={handleSceneChange}>
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
                <Button size="icon" variant="secondary" onClick={handleFullscreenToggle}>
                    {isFullscreen ? <Minimize /> : <Expand />}
                </Button>
            </div>
        </div>

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
