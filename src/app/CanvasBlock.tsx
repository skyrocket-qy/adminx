// app/components/CanvasBlock.tsx

'use client';

import { useRef, useEffect } from 'react';

// 1. Add `displayText` to the props interface
interface CanvasBlockProps {
  backgroundColor?: string;
  lineColor?: string;
  displayText?: string; // The text to display
}

const BLOCK_SIZE = 15;
const BORDER_SIZE = 1;
const CELL_SIZE = BLOCK_SIZE + BORDER_SIZE;

// 2. Update the drawing function to accept and draw the text
const drawGrid = (
  context: CanvasRenderingContext2D, 
  width: number, 
  height: number,
  colors: { bg: string, line: string } = { bg: '#2E1A47', line: '#333' },
  text?: string // Add text as an optional parameter
) => {
  // Clear and draw background/grid (same as before)
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

  // --- NEW: Draw the text if it exists ---
  if (text) {
    // Set font style - make it look good!
    const fontSize = Math.min(width / 12, 48); // Responsive font size
    context.font = `bold ${fontSize}px "Inter", sans-serif`;
    context.fillStyle = 'white';
    
    // Center the text horizontally and vertically
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    
    // Draw the text at the center of the canvas
    context.fillText(text, width / 2, height / 2);
  }
};

// 3. Update the component to accept and use the new prop
export default function CanvasBlock({ backgroundColor, lineColor, displayText }: CanvasBlockProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;
    
    const resizeObserver = new ResizeObserver(entries => {
      if (!entries || entries.length === 0) return;
      
      const { width, height } = entries[0].contentRect;
      canvas.width = width;
      canvas.height = height;

      // 4. Pass the displayText prop down to the drawing function
      drawGrid(context, width, height, { 
        bg: backgroundColor || '#2E1A47',
        line: lineColor || '#333'
      }, displayText); // Pass the text here
    });

    resizeObserver.observe(canvas);

    return () => resizeObserver.disconnect();
    // 5. Add `displayText` to the dependency array to trigger redraws on change
  }, [backgroundColor, lineColor, displayText]);

  return <canvas ref={canvasRef} className="h-full w-full" />;
}