// app/components/CanvasBlock.tsx

'use client';

import { useRef, useEffect } from 'react';

// Constants can be defined here or passed as props
const BLOCK_SIZE = 15;
const BORDER_SIZE = 1;
const CELL_SIZE = BLOCK_SIZE + BORDER_SIZE;

// This is the drawing logic, same as before but self-contained
const drawGrid = (context: CanvasRenderingContext2D, width: number, height: number) => {
  context.clearRect(0, 0, width, height);
  context.fillStyle = '#2E1A47';
  context.fillRect(0, 0, width, height);
  context.strokeStyle = '#333';
  context.lineWidth = BORDER_SIZE;

  for (let x = 0; x <= width; x += CELL_SIZE) {
    for (let y = 0; y <= height; y += CELL_SIZE) {
      context.strokeRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
    }
  }
};

export default function CanvasBlock() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;
    
    // Use a ResizeObserver to redraw when the grid cell size changes
    const resizeObserver = new ResizeObserver(entries => {
      if (!entries || entries.length === 0) return;
      
      const { width, height } = entries[0].contentRect;
      canvas.width = width;
      canvas.height = height;
      drawGrid(context, width, height);
    });

    resizeObserver.observe(canvas);

    // Cleanup observer on component unmount
    return () => resizeObserver.disconnect();
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" />;
}