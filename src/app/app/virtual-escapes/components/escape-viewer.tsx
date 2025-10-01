"use client";

import { useState, useRef, useEffect, useTransition } from 'react';
import screenfull from 'screenfull';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Expand, Minimize, Pause, Play, Volume2, VolumeX, Wand2, Loader } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { generateVideoAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

const scenes = [
  { id: 'beach', name: 'Peaceful Beach', prompt: 'A tranquil beach with gentle waves lapping on the shore under a clear blue sky.', audioSrc: '/sounds/waves.mp3' },
  { id: 'forest', name: 'Tranquil Forest', prompt: 'Sunlight filtering through the canopy of a lush, green, and peaceful forest.', audioSrc: '/sounds/forest.mp3' },
  { id: 'night-sky', name: 'Starry Night', prompt: 'A clear night sky full of twinkling stars and the Milky Way over a calm, dark landscape.', audioSrc: '/sounds/night.mp3' },
];

export function EscapeViewer() {
  const [selectedScene, setSelectedScene] = useState(scenes[0]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGenerating, startTransition] = useTransition();
  const { toast } = useToast();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Setup the scene audio
    audioRef.current = new Audio(selectedScene.audioSrc);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    
    // Reset video URL when scene changes
    setVideoUrl(null); 
    setIsPlaying(false);

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
    if (audioRef.current && videoRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        videoRef.current.pause();
      } else {
        audioRef.current.play();
        videoRef.current.play();
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

  const handleAnimateClick = () => {
    startTransition(async () => {
      const result = await generateVideoAction(selectedScene.prompt);
      if (result.success && result.data) {
        setVideoUrl(result.data);
        setIsPlaying(true);
        // Ensure audio and video play
        if(audioRef.current) audioRef.current.play();
        if(videoRef.current) videoRef.current.play();
      } else {
        toast({
          variant: "destructive",
          title: "Video Generation Failed",
          description: result.error || "Could not generate the video. Please try again later.",
        });
      }
    });
  };

  return (
    <div ref={containerRef} className={cn("relative w-full transition-all bg-black", isFullscreen ? "fixed inset-0 z-50" : "rounded-lg border aspect-video")}>
        {videoUrl ? (
          <video 
              ref={videoRef}
              src={videoUrl}
              className="w-full h-full object-cover"
              loop
              playsInline
              onCanPlay={() => {
                if (isPlaying && videoRef.current) {
                    videoRef.current.play();
                }
              }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-secondary">
            {isGenerating ? (
              <>
                <Loader className="h-10 w-10 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">Animating your escape... this may take a minute.</p>
              </>
            ) : (
              <>
                <Wand2 className="h-12 w-12 text-primary" />
                <p className="mt-4 text-muted-foreground">Bring this scene to life.</p>
                <Button onClick={handleAnimateClick} className="mt-4" disabled={isGenerating}>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Animate Scene
                </Button>
              </>
            )}
          </div>
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
                {videoUrl && (
                  <Button onClick={handleAnimateClick} size="sm" variant="secondary" disabled={isGenerating}>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Re-Animate
                  </Button>
                )}
                <Button size="icon" variant="secondary" onClick={handleFullscreenToggle}>
                    {isFullscreen ? <Minimize /> : <Expand />}
                </Button>
            </div>
        </div>

        {videoUrl && (
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
        )}
    </div>
  );
}
