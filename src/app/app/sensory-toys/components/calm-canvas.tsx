"use client";

import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Ripple {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  maxRadius: number;
}

export function CalmCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ripples = useRef<Ripple[]>([]);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let parent = canvas.parentElement;
    if(!parent) return;

    const resizeCanvas = () => {
        canvas.width = parent!.clientWidth;
        canvas.height = 400;
    };
    
    resizeCanvas();
    
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ripples.current.forEach((ripple, index) => {
        ripple.radius += 1;
        ripple.opacity -= 0.01;

        if (ripple.opacity <= 0) {
          ripples.current.splice(index, 1);
        } else {
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(var(--primary), ${ripple.opacity})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();
    
    window.addEventListener('resize', resizeCanvas);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ripples.current.push({
      x,
      y,
      radius: 0,
      opacity: 1,
      maxRadius: 100,
    });
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      className="w-full h-[400px] bg-secondary/30 rounded-lg cursor-pointer"
    />
  );
}
