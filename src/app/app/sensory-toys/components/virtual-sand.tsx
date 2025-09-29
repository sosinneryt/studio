"use client";

import { useRef, useEffect, useState } from 'react';

export function VirtualSand() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPosition = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const parent = canvas.parentElement;
    if(!parent) return;

    const resizeCanvas = () => {
        canvas.width = parent!.clientWidth;
        canvas.height = 400;
        ctx.fillStyle = "hsl(var(--secondary))";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "hsl(var(--secondary-foreground))";
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
        window.removeEventListener('resize', resizeCanvas);
    };

  }, []);
  
  const getMousePos = (canvas: HTMLCanvasElement, evt: React.MouseEvent | React.TouchEvent) => {
    const rect = canvas.getBoundingClientRect();
    if (evt.nativeEvent instanceof MouseEvent) {
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
      };
    }
    // Touch event
    const touch = (evt.nativeEvent as TouchEvent).touches[0];
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pos = getMousePos(canvas, e);
    setIsDrawing(true);
    lastPosition.current = pos;
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const pos = getMousePos(canvas, e);

    ctx.beginPath();
    ctx.moveTo(lastPosition.current!.x, lastPosition.current!.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    lastPosition.current = pos;
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseOut={stopDrawing}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
      className="w-full h-[400px] bg-secondary/30 rounded-lg cursor-pointer"
    />
  );
}
