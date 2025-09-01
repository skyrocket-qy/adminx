'use client';

import { useRef, useEffect } from 'react';
// 1. Import the specific drawing function you need
import { drawBasicGrid } from '@/lib/canvas-drawer'; 

interface BasicCanvasBlockProps {
  backgroundColor?: string;
  lineColor?: string;
}

export default function BasicCanvasBlock({ backgroundColor, lineColor }: BasicCanvasBlockProps) {
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
      
      // 2. Call the imported function with the correct arguments
      drawBasicGrid(context, width, height, { 
        bg: backgroundColor || '#2E1A47',
        line: lineColor || '#333'
      });
    });

    resizeObserver.observe(canvas);
    return () => resizeObserver.disconnect();
  }, [backgroundColor, lineColor]);

  return <canvas ref={canvasRef} className="h-full w-full" />;
}