'use client';

import { useRef, useEffect } from 'react';
import { drawGrid } from "./BasicCanvasBlock"

// Props for our specialized header block
interface HeaderCanvasBlockProps {
  title: string;
  backgroundColor?: string;
  lineColor?: string;
}

const BLOCK_SIZE = 15;
const BORDER_SIZE = 1;
const CELL_SIZE = BLOCK_SIZE + BORDER_SIZE;

// This drawing function first draws the grid, then adds the text
const drawHeader = (
  context: CanvasRenderingContext2D, 
  width: number, 
  height: number,
  title: string,
  colors: { bg: string, line: string } = { bg: '#2E1A47', line: '#333' }
) => {
    drawGrid(context, width, height, colors);
    // --- Step 2: Add the specialized text drawing ---
    const fontSize = Math.min(width / 12, 48);
    context.font = `bold ${fontSize}px "Inter", sans-serif`;
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(title, width / 2, height / 2);
};

/**
 * A specialized component that renders a title on a canvas grid.
 * It contains all the necessary drawing logic for its specific purpose.
 */
export default function HeaderCanvasBlock({ title, backgroundColor, lineColor }: HeaderCanvasBlockProps) {
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
      drawHeader(context, width, height, title, { 
        bg: backgroundColor || '#2E1A47',
        line: lineColor || '#333'
      });
    });

    resizeObserver.observe(canvas);
    return () => resizeObserver.disconnect();
  }, [title, backgroundColor, lineColor]);

  return <canvas ref={canvasRef} className="h-full w-full" />;
}
