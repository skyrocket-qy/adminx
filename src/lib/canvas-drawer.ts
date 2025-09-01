// This file acts as a central library for all our canvas drawing logic.

const BLOCK_SIZE = 3;
const BORDER_SIZE = 1;
const CELL_SIZE = BLOCK_SIZE + BORDER_SIZE;

/**
 * The core, reusable function to draw the background grid.
 */
export const drawBasicGrid = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  colors: { bg: string; line: string } = { bg: '#2E1A47', line: '#333' }
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
 * --- NEW ---
 * Renders text by turning grid blocks "on" or "off".
 */
const drawTextWithBlocks = (
  mainContext: CanvasRenderingContext2D,
  width: number,
  height: number,
  text: string
) => {
  // 1. Create a hidden canvas to act as a stencil
  const offscreenCanvas = document.createElement('canvas');
  offscreenCanvas.width = width;
  offscreenCanvas.height = height;
  const offscreenContext = offscreenCanvas.getContext('2d')!;

  // 2. Draw the text onto the hidden canvas
  const fontSize = Math.min(width / 10, 60); // Make font a bit larger for better sampling
  offscreenContext.font = `bold ${fontSize}px "Inter", sans-serif`;
  offscreenContext.fillStyle = 'white';
  offscreenContext.textAlign = 'center';
  offscreenContext.textBaseline = 'middle';
  offscreenContext.fillText(text, width / 2, height / 2);

  // 3. Get the pixel data from the hidden canvas
  const imageData = offscreenContext.getImageData(0, 0, width, height);

  // 4. Loop through our visible grid and draw blocks based on the stencil
  for (let x = 0; x < width; x += CELL_SIZE) {
    for (let y = 0; y < height; y += CELL_SIZE) {
      // Find the center of the current block
      const centerX = x + BLOCK_SIZE / 2;
      const centerY = y + BORDER_SIZE / 2;

      // Find the corresponding pixel index in the stencil's data array
      const pixelIndex = (Math.floor(centerY) * width + Math.floor(centerX)) * 4;
      
      // The pixel data is an array of [R, G, B, A, R, G, B, A, ...]
      // We only need the Alpha channel (the 4th value) to see if the pixel is visible.
      const alpha = imageData.data[pixelIndex + 3];

      // If the alpha is greater than a threshold, the block is "on"
      if (alpha > 128) {
        mainContext.fillStyle = 'white'; // Or any color you want for the text blocks
        mainContext.fillRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
      }
    }
  }
};

/**
 * --- NEW HEADER FUNCTION ---
 * A specialized function for drawing the header with block-based text.
 */
export const drawHeaderWithBlockText = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  title: string,
  colors: { bg: string; line: string }
) => {
  // First, draw the basic background grid
  drawBasicGrid(context, width, height, colors);
  
  // Then, draw the text using our new block-rendering function
  drawTextWithBlocks(context, width, height, title);
};

