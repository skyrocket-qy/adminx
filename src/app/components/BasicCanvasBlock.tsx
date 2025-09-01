'use client';

import { useRef, useEffect } from 'react';

// Props for our basic, reusable block
interface BasicCanvasBlockProps {
  backgroundColor?: string;
  lineColor?: string;
}

const BLOCK_SIZE = 15;
const BORDER_SIZE = 1;
const CELL_SIZE = BLOCK_SIZE + BORDER_SIZE;

export const drawGrid = (
  context: CanvasRenderingContext2D, 
  width: number, 
  height: number,
  colors: { bg: string, line: string } = { bg: '#2E1A47', line: '#333' }
) => {
  context.clearRect(0, 0, width, height);
  context.fillStyle = colors.bg;
  context.fillRect(0, 0, width, height);
  context.strokeStyle = colors.line;
  context.lineWidth = BORDER_SIZE;

  for (let x = 0; x <= width; x += CELL_SIZE) {
    for (let y = 0; y <= height; y += CELL_SIZE) {
      context.strokeRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
    }
  }
};

/**
 * A simple, reusable component that only renders a background grid on a canvas.
 * It has no other specialized functionality.
 */
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
      drawGrid(context, width, height, { 
        bg: backgroundColor || '#2E1A47',
        line: lineColor || '#333'
      });
    });

    resizeObserver.observe(canvas);
    return () => resizeObserver.disconnect();
  }, [backgroundColor, lineColor]);

  return <canvas ref={canvasRef} className="h-full w-full" />;
}
