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
        const resolvedStyle = getComputedStyle(canvas);
        ctx.fillStyle = resolvedStyle.getPropertyValue('--secondary');
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = resolvedStyle.getPropertyValue('--secondary-foreground');
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
    const event = 'touches' in evt.nativeEvent ? evt.nativeEvent.touches[0] : evt;
    return {
      x: (event as MouseEvent).clientX - rect.left,
      y: (event as MouseEvent).clientY - rect.top,
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
    e.preventDefault(); // Prevent scrolling on touch devices
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const pos = getMousePos(canvas, e);

    if (lastPosition.current) {
        ctx.beginPath();
        ctx.moveTo(lastPosition.current.x, lastPosition.current.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    }

    lastPosition.current = pos;
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    lastPosition.current = null;
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
      className="w-full h-[400px] bg-secondary rounded-lg cursor-pointer"
    />
  );
}
