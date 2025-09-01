'use client'; // Directive to mark this as a Client Component in Next.js

import { useRef, useEffect } from 'react';

// Define constants for our grid
const BLOCK_SIZE = 11;
const BORDER_SIZE = 1;
const CELL_SIZE = BLOCK_SIZE + BORDER_SIZE; // Total size for one cell (12px)

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // This function will contain all the drawing logic for the grid
  const drawGrid = (context: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) => {
    // 1. Clear the entire canvas first
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    // 2. Set the background color for the canvas
    context.fillStyle = '#2E1A47'; // Dark background
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    // 3. Set the style for the grid lines (the borders)
    context.strokeStyle = '#333'; // A slightly lighter grey for the grid lines
    context.lineWidth = BORDER_SIZE;

    // 4. Draw the grid using nested loops
    for (let x = 0; x <= canvasWidth; x += CELL_SIZE) {
      for (let y = 0; y <= canvasHeight; y += CELL_SIZE) {
        // We use strokeRect to draw the outline of the block
        context.strokeRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Call our drawing function whenever the size changes
      drawGrid(context, canvas.width, canvas.height);
    };

    // Initial draw
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main>
      <canvas
        ref={canvasRef}
        style={{ display: 'block' }}
      />
    </main>
  );
}

