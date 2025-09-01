// This file will act as a central library for all our canvas drawing logic.

const BLOCK_SIZE = 15;
const BORDER_SIZE = 1;
const CELL_SIZE = BLOCK_SIZE + BORDER_SIZE;

/**
 * The core, reusable function to draw the background grid.
 * All other drawing functions will use this as their base.
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
 * A specialized function for drawing the header.
 * It REUSES `drawBasicGrid` and then adds the title on top.
 */
export const drawHeader = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  title: string,
  colors: { bg: string; line: string }
) => {
  // --- 1. Reuse the basic drawing logic ---
  drawBasicGrid(context, width, height, colors);

  // --- 2. Add the specialized header text ---
  const fontSize = Math.min(width / 12, 48);
  context.font = `bold ${fontSize}px "Inter", sans-serif`;
  context.fillStyle = 'white';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(title, width / 2, height / 2);
};
