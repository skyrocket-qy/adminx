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


// --- NEW BFS VISUALIZATION CODE ---

interface TreeNode {
  id: string;
  children: TreeNode[];
  // Properties for drawing
  x: number;
  y: number;
  radius: number;
}

// Helper function to draw a single node
const drawNode = (context: CanvasRenderingContext2D, node: TreeNode, color: string) => {
  context.beginPath();
  context.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
  context.fillStyle = color;
  context.fill();
  context.strokeStyle = 'white';
  context.stroke();
  
  context.fillStyle = 'white';
  // Responsive font size for the node ID
  context.font = `${node.radius * 0.8}px "Inter", sans-serif`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(node.id, node.x, node.y);
};

// Helper function to draw an edge between two nodes
const drawEdge = (context: CanvasRenderingContext2D, from: TreeNode, to: TreeNode) => {
  context.beginPath();
  context.moveTo(from.x, from.y);
  context.lineTo(to.x, to.y);
  context.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  context.lineWidth = 2;
  context.stroke();
};

// Helper function to draw the entire tree structure
const drawTree = (context: CanvasRenderingContext2D, node: TreeNode) => {
  for (const child of node.children) {
    drawEdge(context, node, child);
    drawTree(context, child); // Recurse
  }
  // Draw the node itself last so it appears on top of the edge
  drawNode(context, node, 'rgba(255, 255, 255, 0.3)');
};

/**
 * Creates and animates a Breadth-First Search traversal on a sample tree.
 */
export const drawBfs = (context: CanvasRenderingContext2D, width: number, height: number) => {
  // 1. Define the tree structure and layout responsively
  const nodeRadius = Math.max(15, Math.min(width, height) / 20);
  const yLevel1 = height * 0.15;
  const yLevel2 = height * 0.45;
  const yLevel3 = height * 0.75;

  const root: TreeNode = {
    id: 'A', x: width / 2, y: yLevel1, radius: nodeRadius, children: [
      { id: 'B', x: width / 4, y: yLevel2, radius: nodeRadius, children: [
          { id: 'D', x: width / 8, y: yLevel3, radius: nodeRadius, children: [] },
          { id: 'E', x: (width * 3) / 8, y: yLevel3, radius: nodeRadius, children: [] },
      ]},
      { id: 'C', x: (width * 3) / 4, y: yLevel2, radius: nodeRadius, children: [
          { id: 'F', x: (width * 5) / 8, y: yLevel3, radius: nodeRadius, children: [] },
          { id: 'G', x: (width * 7) / 8, y: yLevel3, radius: nodeRadius, children: [] },
      ]},
    ],
  };

  // 2. Perform BFS to get the traversal order
  const bfsOrder: TreeNode[] = [];
  const queue: TreeNode[] = [root];
  while (queue.length > 0) {
    const node = queue.shift()!;
    bfsOrder.push(node);
    for (const child of node.children) {
      queue.push(child);
    }
  }

  // 3. Set up and start the animation
  let animationFrameId: number;
  let currentStep = 0;
  let frameCounter = 0;
  const animationSpeed = 30; // Number of frames to wait before advancing a step

  const animate = () => {
    frameCounter++;

    // Clear the canvas on each frame
    context.clearRect(0, 0, width, height);
    drawBasicGrid(context, width, height);
    
    // Draw the static structure of the tree
    drawTree(context, root);

    // Highlight the nodes that have been visited
    for (let i = 0; i < currentStep; i++) {
      drawNode(context, bfsOrder[i], '#22C55E'); // Green for visited
    }
    
    // Highlight the current node being processed
    if (currentStep < bfsOrder.length) {
      drawNode(context, bfsOrder[currentStep], '#F97316'); // Orange for current
    }

    // Advance to the next step after a delay
    if (frameCounter > animationSpeed) {
      frameCounter = 0;
      currentStep++;
    }

    // Stop the animation when all nodes have been visited
    if (currentStep > bfsOrder.length) {
      // Keep the final state visible
      cancelAnimationFrame(animationFrameId);
    } else {
      animationFrameId = requestAnimationFrame(animate);
    }
  };

  animate(); // Start the animation loop
};