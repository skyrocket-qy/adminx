'use client';

import { useRef, useEffect } from 'react';
// 1. Import the specialized header drawing function
import { drawHeaderWithBlockText, drawBfs, drawStickMan } from '@/lib/canvas-drawer'; 

interface HeaderCanvasBlockProps {
  title: string;
  backgroundColor?: string;
  lineColor?: string;
}

export function HeaderCanvasBlock({ title, backgroundColor, lineColor }: HeaderCanvasBlockProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    const resizeObserver = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      canvas.width = width;
      canvas.height = height;

      // 2. Call the imported function, providing the extra `title` argument
      drawHeaderWithBlockText(context, width, height, title, { 
        bg: backgroundColor || '#2E1A47',
        line: lineColor || '#333'
      });
    });

    resizeObserver.observe(canvas);
    return () => resizeObserver.disconnect();
  }, [title, backgroundColor, lineColor]);

  return <canvas ref={canvasRef} className="h-full w-full" />;
}

interface DrawCanvasBlockProps {
  backgroundColor?: string;
  lineColor?: string;
  drawFunc: (context: CanvasRenderingContext2D, width: number, height: number) => void;
}

export function DrawCanvasBlock({backgroundColor, lineColor, drawFunc }: DrawCanvasBlockProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    const resizeObserver = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      canvas.width = width;
      canvas.height = height;

      // 2. Call the imported function, providing the extra `title` argument
    //   drawHeaderWithBlockText(context, width, height, title, { 
    //     bg: backgroundColor || '#2E1A47',
    //     line: lineColor || '#333'
    //   });
        drawFunc(context, width, height)
    });

    resizeObserver.observe(canvas);
    return () => resizeObserver.disconnect();
  }, [backgroundColor, lineColor]);

  return <canvas ref={canvasRef} className="h-full w-full" />;
}