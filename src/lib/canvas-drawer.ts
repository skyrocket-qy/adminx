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


// --- NEW DP VISUALIZATION CODE ---

/**
 * Creates and animates a Dynamic Programming solution for the
 * Longest Common Subsequence problem between two arrays (strings).
 */
export const drawDp = (context: CanvasRenderingContext2D, width: number, height: number) => {
  // 1. Setup the problem
  const arr1 = "AGGTAB".split('');
  const arr2 = "GXTXAYB".split('');
  const m = arr1.length;
  const n = arr2.length;
  
  // DP table initialized with zeros
  const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

  // 2. Responsive layout calculations
  const topMargin = height * 0.1;
  const leftMargin = width * 0.1;
  const tableWidth = width * 0.8;
  const tableHeight = height * 0.8;
  const cellWidth = tableWidth / (n + 1);
  const cellHeight = tableHeight / (m + 1);
  const fontSize = Math.min(cellWidth, cellHeight) * 0.4;
  
  // 3. Animation state
  let animationFrameId: number;
  let i = 1, j = 1; // Current cell being computed
  let frameCounter = 0;
  const animationSpeed = 20; // Frames per step

  const animate = () => {
    frameCounter++;
    if (frameCounter < animationSpeed) {
        animationFrameId = requestAnimationFrame(animate);
        return;
    }
    frameCounter = 0;
    
    // Perform one step of DP calculation
    if (i <= m) {
        if (arr1[i - 1] === arr2[j - 1]) {
            dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
            dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }

    // --- Drawing ---
    context.clearRect(0, 0, width, height);
    drawBasicGrid(context, width, height);

    // Draw labels for arrays
    context.font = `${fontSize * 1.2}px "Inter", sans-serif`;
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    
    for (let k = 0; k < m; k++) {
        const x = leftMargin - cellWidth / 2;
        const y = topMargin + (k + 1.5) * cellHeight;
        context.fillStyle = (k === i - 1) ? '#F97316' : 'white';
        context.fillText(arr1[k], x, y);
    }
    for (let k = 0; k < n; k++) {
        const x = leftMargin + (k + 1.5) * cellWidth;
        const y = topMargin - cellHeight / 2;
        context.fillStyle = (k === j - 1 && i <= m) ? '#F97316' : 'white';
        context.fillText(arr2[k], x, y);
    }

    // Draw DP table
    for (let row = 0; row <= m; row++) {
        for (let col = 0; col <= n; col++) {
            const x = leftMargin + (col + 0.5) * cellWidth;
            const y = topMargin + (row + 0.5) * cellHeight;
            
            // Highlight current cell
            if (row === i && col === j && i <=m) {
                context.fillStyle = 'rgba(249, 115, 22, 0.5)'; // Orange semi-transparent
                context.fillRect(leftMargin + col * cellWidth, topMargin + row * cellHeight, cellWidth, cellHeight);
            }

            // Draw cell value
            context.font = `bold ${fontSize}px "Inter", sans-serif`;
            context.fillStyle = 'white';
            context.fillText(dp[row][col].toString(), x, y);

            // Draw cell borders
            context.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            context.strokeRect(leftMargin + col * cellWidth, topMargin + row * cellHeight, cellWidth, cellHeight);
        }
    }
    
    // --- Update state for next frame ---
    j++;
    if (j > n) {
        j = 1;
        i++;
    }

    if (i > m) {
        // Animation finished, highlight final result
        const finalX = leftMargin + (n + 0.5) * cellWidth;
        const finalY = topMargin + (m + 0.5) * cellHeight;
        context.fillStyle = '#22C55E'; // Green
        context.fillText(dp[m][n].toString(), finalX, finalY);
        cancelAnimationFrame(animationFrameId);
    } else {
        animationFrameId = requestAnimationFrame(animate);
    }
  };

  animate(); // Start the animation
};

// --- Union-Find Visualization Function ---

// Type definition for a node's position and properties
interface UFNode {
  x: number;
  y: number;
  radius: number;
  id: number;
}

/**
 * Renders and animates a sequence of Union-Find operations,
 * demonstrating path compression and union by size.
 *
 * @param context The 2D rendering context of the canvas.
 * @param width The width of the canvas.
 * @param height The height of the canvas.
 */
export const drawUnionFind = async (context: CanvasRenderingContext2D, width: number, height: number) => {
  const numNodes = 12;
  let animationFrameId: number;

  // --- Data Structure State ---
  let parent: number[] = [];
  let size: number[] = [];
  let nodes: UFNode[] = [];

  // --- Helper: Basic Setup & Drawing ---
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const init = () => {
    parent = Array.from({ length: numNodes }, (_, i) => i);
    size = Array.from({ length: numNodes }, () => 1);
    calculateNodePositions();
  };

  const calculateNodePositions = () => {
    nodes = [];
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) * 0.75;
    const nodeRadius = Math.max(15, radius / (numNodes / 1.5));
    
    for (let i = 0; i < numNodes; i++) {
        const angle = (i / numNodes) * 2 * Math.PI - Math.PI / 2; // Start from top
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        nodes.push({ x, y, radius: nodeRadius, id: i });
    }
  };

  const drawNode = (node: UFNode, color: string) => {
    context.beginPath();
    context.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();
    context.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    context.lineWidth = 2;
    context.stroke();

    context.fillStyle = '#FFFFFF';
    context.font = `bold ${node.radius * 0.8}px "Inter", sans-serif`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(node.id.toString(), node.x, node.y);
  };
  
  const drawEdge = (fromNode: UFNode, toNode: UFNode, color: string, isBold: boolean) => {
     context.beginPath();
     context.moveTo(fromNode.x, fromNode.y);
     const angle = Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x);
     const toX = toNode.x - toNode.radius * Math.cos(angle);
     const toY = toNode.y - toNode.radius * Math.sin(angle);
     context.lineTo(toX, toY);
     context.strokeStyle = color;
     context.lineWidth = isBold ? 4 : 2;
     context.stroke();
  };
  
  const drawScene = (message: string) => {
      context.clearRect(0, 0, width, height);
      nodes.forEach((_, i) => {
          if (parent[i] !== i) drawEdge(nodes[i], nodes[parent[i]], 'rgba(255, 255, 255, 0.3)', false);
      });
      nodes.forEach(node => drawNode(node, 'rgba(255, 255, 255, 0.2)'));
      
      context.fillStyle = 'rgba(255, 255, 255, 0.8)';
      context.font = `bold 18px "Inter", sans-serif`;
      context.textAlign = 'center';
      context.fillText(message, width / 2, 30);
  };

  // --- Core Union-Find Logic ---
  const find_internal = (i: number): number => {
    if (parent[i] === i) return i;
    return find_internal(parent[i]); // Find without path compression for visualization
  };
  
  const union_internal = (i: number, j: number) => {
    const rootI = find_internal(i);
    const rootJ = find_internal(j);
    if (rootI !== rootJ) {
      if (size[rootI] < size[rootJ]) {
        parent[rootI] = rootJ;
        size[rootJ] += size[rootI];
      } else {
        parent[rootJ] = rootI;
        size[rootI] += size[rootJ];
      }
    }
  };

  // --- Animation Logic ---
  const visualizeFind = async (startNodeId: number) => {
    let path = [];
    let current = startNodeId;
    while (parent[current] !== current) {
      path.push(current);
      drawScene(`Finding root of ${startNodeId}...`);
      drawNode(nodes[startNodeId], '#38BDF8'); // Start node
      path.forEach(id => drawNode(nodes[id], '#A5B4FC')); // Path node
      drawEdge(nodes[current], nodes[parent[current]], '#FBBF24', true);
      await sleep(600);
      current = parent[current];
    }
    path.push(current);
    const root = current;

    drawScene(`Root of ${startNodeId} is ${root}. Compressing path...`);
    path.forEach(id => drawNode(nodes[id], '#A5B4FC'));
    drawNode(nodes[root], '#34D399'); // Root node
    await sleep(1200);

    for (const nodeId of path) {
      if (nodeId !== root) parent[nodeId] = root;
    }
    drawScene(`Path for ${startNodeId} compressed to root ${root}.`);
    await sleep(1000);
  };
  
  const visualizeUnion = async (nodeId1: number, nodeId2: number) => {
      drawScene(`Union(${nodeId1}, ${nodeId2})`);
      await sleep(1000);
      
      const root1 = find_internal(nodeId1);
      const root2 = find_internal(nodeId2);

      if (root1 === root2) {
          drawScene(`${nodeId1} and ${nodeId2} are already in the same set.`);
          await sleep(1500);
          return;
      }
      
      const smallerRoot = size[root1] < size[root2] ? root1 : root2;
      const largerRoot = size[root1] < size[root2] ? root2 : root1;

      drawScene(`Set ${smallerRoot} is smaller. Merging into set ${largerRoot}.`);
      drawEdge(nodes[smallerRoot], nodes[largerRoot], '#34D399', true);
      await sleep(1500);
      
      union_internal(nodeId1, nodeId2);
      drawScene(`Union(${nodeId1}, ${nodeId2}) complete.`);
      await sleep(1000);
  };

  // --- Main Animation Script ---
  const runAnimation = async () => {
    init();
    
    const operations = [
      { type: 'union', args: [0, 1] },
      { type: 'union', args: [2, 3] },
      { type: 'union', args: [4, 5] },
      { type: 'union', args: [6, 7] },
      { type: 'union', args: [0, 2] },
      { type: 'union', args: [4, 6] },
      { type: 'union', args: [0, 4] },
      { type: 'find', args: [5] },
      { type: 'union', args: [8, 9] },
      { type: 'union', args: [10, 11] },
      { type: 'union', args: [8, 10] },
      { type: 'find', args: [11] },
    ];

    for (const op of operations) {
        if (op.type === 'union') {
            await visualizeUnion(op.args[0], op.args[1]);
        } else if (op.type === 'find') {
            await visualizeFind(op.args[0]);
        }
    }
    
    drawScene("Animation Complete!");
  };

  // Stop any previous animation before starting a new one
  if (window.unionFindAnimationId) {
      cancelAnimationFrame(window.unionFindAnimationId);
  }
  runAnimation();
};

// Add a global handle to cancel animation if the function is called again
declare global {
    interface Window { 
        unionFindAnimationId: number;
        binaryIndexedTreeAnimationId: number;
        swissTableAnimationId: number;
        topologicalSortAnimationId: number;
    }
}


/**
 * Renders and animates a sequence of Binary Indexed Tree operations,
 * demonstrating updates and prefix sum queries.
 *
 * @param context The 2D rendering context of the canvas.
 * @param width The width of the canvas.
 * @param height The height of the canvas.
 */
export const drawBinaryIndexTree = async (context: CanvasRenderingContext2D, width: number, height: number) => {
  const n = 8; // Size of the array
  let nums: number[] = [];
  let bit: number[] = [];
  
  // --- Helpers ---
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // --- Layout & Drawing ---
  const boxSize = Math.min(width / (n + 2), 60);
  const startX = (width - n * boxSize) / 2;
  const arrY = height / 2 - boxSize;
  const bitY = height / 2 + boxSize;
  const fontSize = boxSize * 0.4;

  const drawArrays = (message: string, highlights: any = {}) => {
      context.clearRect(0, 0, width, height);
      
      // Draw message
      context.fillStyle = 'rgba(255, 255, 255, 0.8)';
      context.font = `bold 18px "Inter", sans-serif`;
      context.textAlign = 'center';
      context.fillText(message, width / 2, 60);

      // Draw array labels
      context.font = `bold ${fontSize * 1.2}px "Inter", sans-serif`;
      context.textAlign = 'left';
      context.fillText("Array:", startX - boxSize, arrY + boxSize / 2);
      context.fillText("BIT:", startX - boxSize, bitY + boxSize / 2);
      
      // Draw array boxes
      for (let i = 0; i < n; i++) {
          const x = startX + i * boxSize;
          context.strokeStyle = highlights.arr && highlights.arr.includes(i) ? '#FBBF24' : 'rgba(255, 255, 255, 0.5)';
          context.lineWidth = highlights.arr && highlights.arr.includes(i) ? 4 : 2;
          context.strokeRect(x, arrY, boxSize, boxSize);

          context.fillStyle = 'white';
          context.font = `bold ${fontSize}px "Inter", sans-serif`;
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          context.fillText(nums[i].toString(), x + boxSize / 2, arrY + boxSize / 2);
          context.font = `${fontSize * 0.7}px "Inter", sans-serif`;
          context.fillText(`idx ${i}`, x + boxSize / 2, arrY + boxSize * 1.25);
      }

      // Draw BIT boxes
      for (let i = 1; i <= n; i++) {
          const x = startX + (i - 1) * boxSize;
          context.strokeStyle = highlights.bit && highlights.bit.includes(i) ? '#34D399' : 'rgba(255, 255, 255, 0.5)';
          context.lineWidth = highlights.bit && highlights.bit.includes(i) ? 4 : 2;
          context.strokeRect(x, bitY, boxSize, boxSize);

          context.fillStyle = 'white';
          context.font = `bold ${fontSize}px "Inter", sans-serif`;
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          context.fillText(bit[i].toString(), x + boxSize / 2, bitY + boxSize / 2);
          context.font = `${fontSize * 0.7}px "Inter", sans-serif`;
          context.fillText(`idx ${i}`, x + boxSize / 2, bitY + boxSize * 1.25);
      }
  };

  // --- Core BIT Logic ---
  const update_internal = (index: number, val: number) => {
      index++; // 1-based index
      while (index <= n) {
          bit[index] += val;
          index += index & -index;
      }
  };

  const getSum_internal = (index: number) => {
      let sum = 0;
      index++; // 1-based index
      while (index > 0) {
          sum += bit[index];
          index -= index & -index;
      }
      return sum;
  };
  
  const constructBIT = (arr: number[]) => {
      nums = [...arr];
      bit = Array(n + 1).fill(0);
      for (let i = 0; i < n; i++) {
          update_internal(i, nums[i]);
      }
  };

  // --- Animation Logic ---
  const visualizeUpdate = async (index: number, newVal: number) => {
    const diff = newVal - nums[index];
    nums[index] = newVal;
    let currentIdx = index + 1;

    while(currentIdx <= n) {
        bit[currentIdx] += diff;
        drawArrays(`Updating index ${index} by ${diff}. Propagating to BIT index ${currentIdx}...`, {
            arr: [index],
            bit: [currentIdx]
        });
        await sleep(1500);
        currentIdx += currentIdx & -currentIdx;
    }
  };

  const visualizeQuery = async (index: number) => {
    let sum = 0;
    let currentIdx = index + 1;
    const highlightedBitIndices = [];
    
    while(currentIdx > 0) {
        sum += bit[currentIdx];
        highlightedBitIndices.push(currentIdx);
        drawArrays(`Querying sum up to index ${index}. Adding BIT[${currentIdx}]. Current sum: ${sum}`, {
            arr: Array.from({length: index + 1}, (_, i) => i),
            bit: highlightedBitIndices
        });
        await sleep(1500);
        currentIdx -= currentIdx & -currentIdx;
    }
    drawArrays(`Final sum for query(${index}) is ${sum}.`, {
        arr: Array.from({length: index + 1}, (_, i) => i),
        bit: highlightedBitIndices
    });
    await sleep(2000);
  };
  
  // --- Main Animation Script ---
  const runAnimation = async () => {
      const initialArray = [2, 1, 1, 3, 2, 3, 4, 5];
      constructBIT(initialArray);
      
      drawArrays("Initial state of Array and Binary Indexed Tree (BIT).");
      await sleep(2000);

      await visualizeUpdate(3, 6); // Update index 3 to value 6
      drawArrays("Update complete. New state:");
      await sleep(2000);

      await visualizeQuery(5); // Get sum up to index 5
      drawArrays("Query complete.");
      await sleep(2000);
      
      await visualizeUpdate(0, 1); // Update index 0 to value 1
      drawArrays("Update complete. New state:");
      await sleep(2000);
      
      await visualizeQuery(7); // Get sum up to index 7
      drawArrays("Animation Complete!");
  };

  // Stop any previous animation before starting a new one
  if (window.binaryIndexedTreeAnimationId) {
      cancelAnimationFrame(window.binaryIndexedTreeAnimationId);
  }
  runAnimation();
};

/**
 * Renders and animates a Swiss-system tournament pairing.
 *
 * @param context The 2D rendering context of the canvas.
 * @param width The width of the canvas.
 * @param height The height of the canvas.
 */
export const drawSwissTable = async (context: CanvasRenderingContext2D, width: number, height: number) => {
  // --- State ---
  interface Player {
    id: number;
    name: string;
    score: number;
    opponentsPlayed: number[];
    x: number;
    y: number;
    targetY: number;
  }
  let players: Player[] = [];
  const numPlayers = 8;
  const totalRounds = 4;

  // --- Helpers ---
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // --- Layout & Drawing ---
  const boxWidth = Math.min(width * 0.4, 250);
  const boxHeight = Math.min(height / (numPlayers + 2), 60);
  const startX = width / 2 - boxWidth / 2;
  const startY = boxHeight;
  const fontSize = boxHeight * 0.35;

  const initPlayers = () => {
    players = Array.from({ length: numPlayers }, (_, i) => ({
      id: i,
      name: `Player ${i + 1}`,
      score: 0,
      opponentsPlayed: [],
      x: startX,
      y: startY + i * boxHeight * 1.2,
      targetY: startY + i * boxHeight * 1.2,
    }));
  };

  const drawPlayer = (player: Player, highlightColor?: string) => {
    context.fillStyle = highlightColor || 'rgba(255, 255, 255, 0.1)';
    context.strokeStyle = highlightColor ? '#FBBF24' : 'rgba(255, 255, 255, 0.5)';
    context.lineWidth = highlightColor ? 4 : 2;
    
    context.beginPath();
    context.roundRect(player.x, player.y, boxWidth, boxHeight, 8);
    context.fill();
    context.stroke();

    context.fillStyle = 'white';
    context.font = `bold ${fontSize}px "Inter", sans-serif`;
    context.textAlign = 'left';
    context.textBaseline = 'middle';
    context.fillText(player.name, player.x + 15, player.y + boxHeight / 2);

    context.font = `bold ${fontSize * 1.2}px "Inter", sans-serif`;
    context.textAlign = 'right';
    context.fillText(player.score.toString(), player.x + boxWidth - 15, player.y + boxHeight / 2);
  };

  const drawMatchupLine = (p1: Player, p2: Player) => {
    context.beginPath();
    context.moveTo(p1.x + boxWidth, p1.y + boxHeight / 2);
    context.strokeStyle = '#34D399';
    context.lineWidth = 3;
    const midX = p1.x + boxWidth + 40;
    context.bezierCurveTo(midX, p1.y + boxHeight / 2, midX, p2.y + boxHeight / 2, p2.x + boxWidth, p2.y + boxHeight / 2);
    context.stroke();
  };
  
  const drawScene = (message: string, pairings: [Player, Player][] = []) => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = '#111827';
      context.fillRect(0,0,width,height);
      
      players.forEach(p => drawPlayer(p));
      pairings.forEach(([p1, p2]) => drawMatchupLine(p1, p2));
      
      context.fillStyle = 'rgba(255, 255, 255, 0.8)';
      context.font = `bold 24px "Inter", sans-serif`;
      context.textAlign = 'center';
      context.fillText(message, width / 2, startY / 2);
  };

  // --- Animation Loop ---
  let animationFrameId: number;
  const animate = () => {
    let allInPlace = true;
    players.forEach(p => {
        const dy = p.targetY - p.y;
        if (Math.abs(dy) > 0.5) {
            p.y += dy * 0.1; // Easing
            allInPlace = false;
        } else {
            p.y = p.targetY;
        }
    });

    drawScene(currentMessage, currentPairings);

    if (!allInPlace) {
        animationFrameId = requestAnimationFrame(animate);
    }
  };

  // --- Main Logic ---
  let currentMessage = "";
  let currentPairings: [Player, Player][] = [];

  const runAnimation = async () => {
    initPlayers();

    for (let round = 1; round <= totalRounds; round++) {
        currentPairings = [];
        currentMessage = `Round ${round}: Sorting by score...`;
        
        // 1. Sort players by score
        players.sort((a, b) => b.score - a.score);
        players.forEach((p, index) => {
            p.targetY = startY + index * boxHeight * 1.2;
        });
        
        animationFrameId = requestAnimationFrame(animate);
        await sleep(2000);

        // 2. Pair players
        currentMessage = `Round ${round}: Pairing players...`;
        const paired = new Set<number>();
        const pairings: [Player, Player][] = [];
        for (let i = 0; i < players.length; i++) {
            if (paired.has(players[i].id)) continue;
            for (let j = i + 1; j < players.length; j++) {
                if (!paired.has(players[j].id) && !players[i].opponentsPlayed.includes(players[j].id)) {
                    paired.add(players[i].id);
                    paired.add(players[j].id);
                    pairings.push([players[i], players[j]]);
                    break;
                }
            }
        }
        currentPairings = pairings;
        drawScene(currentMessage, currentPairings);
        await sleep(2000);

        // 3. Simulate results and update scores
        currentMessage = `Round ${round}: Simulating matches...`;
        drawScene(currentMessage, currentPairings);
        
        // Simple simulation: higher-ranked player wins
        pairings.forEach(([p1, p2]) => {
            p1.score += 1; // p1 has higher or equal score, so they win
            p1.opponentsPlayed.push(p2.id);
            p2.opponentsPlayed.push(p1.id);
        });
        
        await sleep(1500);
        drawScene(currentMessage, currentPairings); // Redraw to show final scores
    }
    
    currentMessage = `Tournament Complete! Final Standings:`;
    currentPairings = [];
    drawScene(currentMessage);
  };
  
  if (window.swissTableAnimationId) {
      cancelAnimationFrame(window.swissTableAnimationId);
  }
  runAnimation();
};

/**
 * Renders and animates a topological sort of a directed acyclic graph (DAG)
 * using Kahn's algorithm.
 *
 * @param context The 2D rendering context of the canvas.
 * @param width The width of the canvas.
 * @param height The height of the canvas.
 */
export const drawTopologicalSort = async (context: CanvasRenderingContext2D, width: number, height: number) => {
  // --- State ---
  interface TopoNode {
    id: number;
    label: string;
    x: number;
    y: number;
    radius: number;
    inDegree: number;
  }

  let nodes: TopoNode[] = [];
  let adj: Map<number, number[]> = new Map();
  let inDegree: Map<number, number> = new Map();
  let queue: number[] = [];
  let sortedList: number[] = [];
  
  const graph = {
    nodes: [
      { id: 0, label: 'A' }, { id: 1, label: 'B' }, { id: 2, label: 'C' },
      { id: 3, label: 'D' }, { id: 4, label: 'E' }, { id: 5, label: 'F' },
      { id: 6, label: 'G' },
    ],
    edges: [
      [0, 2], [0, 3], [1, 3], [1, 4], [2, 5], [3, 5], [3, 6], [4, 6]
    ]
  };

  // --- Helpers ---
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // --- Layout & Drawing ---
  const nodeRadius = Math.max(20, Math.min(width, height) / 25);
  const layout = {
      queue: { x: width * 0.1, y: height * 0.85, w: width * 0.8, h: nodeRadius * 2.5 },
      sorted: { x: width * 0.1, y: height * 0.1, w: width * 0.8, h: nodeRadius * 2.5 }
  };

  const initGraph = () => {
    graph.nodes.forEach(n => {
        inDegree.set(n.id, 0);
        adj.set(n.id, []);
    });
    graph.edges.forEach(([u, v]) => {
        adj.get(u)!.push(v);
        inDegree.set(v, inDegree.get(v)! + 1);
    });

    // Manual layout for clarity
    const positions: { [key: number]: { x: number, y: number } } = {
        0: { x: 0.15, y: 0.3 }, 1: { x: 0.15, y: 0.6 },
        2: { x: 0.4, y: 0.25 }, 3: { x: 0.4, y: 0.45 }, 4: { x: 0.4, y: 0.65 },
        5: { x: 0.65, y: 0.35 }, 6: { x: 0.65, y: 0.55 },
    };

    nodes = graph.nodes.map(n => ({
        id: n.id, label: n.label,
        x: width * positions[n.id].x, y: height * positions[n.id].y,
        radius: nodeRadius,
        inDegree: inDegree.get(n.id)!
    }));
  };

  const drawNode = (node: TopoNode, state: 'default' | 'highlight' | 'in-queue' | 'processed') => {
    let fillColor = 'rgba(255, 255, 255, 0.1)';
    if (state === 'highlight') fillColor = '#38BDF8';
    if (state === 'in-queue') fillColor = '#A5B4FC';
    if (state === 'processed') fillColor = '#34D399';
    
    context.beginPath();
    context.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
    context.fillStyle = fillColor;
    context.fill();
    context.strokeStyle = 'white';
    context.lineWidth = 2;
    context.stroke();

    context.fillStyle = 'white';
    context.font = `bold ${node.radius * 0.7}px "Inter", sans-serif`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(node.label, node.x, node.y);
    
    context.font = ` ${node.radius * 0.5}px "Inter", sans-serif`;
    context.fillText(`${node.inDegree}`, node.x, node.y + node.radius * 1.5);
  };
  
  const drawEdge = (u: number, v: number, isHighlight: boolean) => {
    const fromNode = nodes.find(n => n.id === u)!;
    const toNode = nodes.find(n => n.id === v)!;

    context.beginPath();
    context.moveTo(fromNode.x, fromNode.y);
    const angle = Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x);
    const toX = toNode.x - (toNode.radius + 5) * Math.cos(angle);
    const toY = toNode.y - (toNode.radius + 5) * Math.sin(angle);
    context.lineTo(toX, toY);
    context.strokeStyle = isHighlight ? '#FBBF24' : 'rgba(255, 255, 255, 0.4)';
    context.lineWidth = isHighlight ? 4 : 2;
    context.stroke();

    // Arrowhead
    const arrowSize = 10;
    context.save();
    context.translate(toX, toY);
    context.rotate(angle);
    context.beginPath();
    context.moveTo(-arrowSize, -arrowSize / 2);
    context.lineTo(0, 0);
    context.lineTo(-arrowSize, arrowSize / 2);
    context.stroke();
    context.restore();
  };

  const drawLayoutBox = (title: string, box: { x: number, y: number, w: number, h: number }) => {
    context.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    context.lineWidth = 1;
    context.strokeRect(box.x, box.y, box.w, box.h);
    context.fillStyle = 'rgba(255, 255, 255, 0.7)';
    context.font = `16px "Inter", sans-serif`;
    context.textAlign = 'left';
    context.textBaseline = 'middle';
    context.fillText(title, box.x + 10, box.y - 15);
  };

  const drawScene = (message: string, highlightEdges: number[][] = []) => {
    context.clearRect(0, 0, width, height);
    context.fillStyle = '#111827';
    context.fillRect(0,0,width,height);
    
    drawLayoutBox("Sorted Order", layout.sorted);
    drawLayoutBox("Processing Queue", layout.queue);

    graph.edges.forEach(([u,v]) => {
      const isHighlight = highlightEdges.some(([hu, hv]) => hu === u && hv === v);
      drawEdge(u, v, isHighlight);
    });
    
    nodes.forEach(node => {
        let state: 'default' | 'highlight' | 'in-queue' | 'processed' = 'default';
        if (queue.includes(node.id)) state = 'in-queue';
        if (sortedList.includes(node.id)) state = 'processed';
        drawNode(node, state);
    });

    context.fillStyle = 'rgba(255, 255, 255, 0.9)';
    context.font = `bold 20px "Inter", sans-serif`;
    context.textAlign = 'center';
    context.fillText(message, width / 2, layout.sorted.y - 40);
  };

  // --- Animation Loop ---
  const animateNodeToPosition = async (nodeId: number, targetX: number, targetY: number) => {
    const node = nodes.find(n => n.id === nodeId)!;
    const duration = 500;
    const startTime = Date.now();
    const startX = node.x;
    const startY = node.y;

    return new Promise<void>(resolve => {
        const step = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            node.x = startX + (targetX - startX) * progress; // Linear interpolation
            node.y = startY + (targetY - startY) * progress;
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                resolve();
            }
        };
        requestAnimationFrame(step);
    });
  };

  const runAnimation = async () => {
    initGraph();
    
    // Animate scene rendering
    const animationLoop = () => {
        drawScene(currentMessage, currentHighlightEdges);
        animationFrameId = requestAnimationFrame(animationLoop);
    };
    let animationFrameId = requestAnimationFrame(animationLoop);
    let currentMessage = "Starting Topological Sort (Kahn's Algorithm)";
    let currentHighlightEdges: number[][] = [];
    
    await sleep(2000);
    
    // 1. Initial enqueue
    currentMessage = "Finding nodes with in-degree of 0...";
    const initialQueue = [];
    for (const [id, degree] of inDegree.entries()) {
        if (degree === 0) {
            initialQueue.push(id);
        }
    }
    
    for (const nodeId of initialQueue) {
        queue.push(nodeId);
        const targetX = layout.queue.x + nodeRadius * 1.5 + queue.length * nodeRadius * 2.5;
        const targetY = layout.queue.y + layout.queue.h / 2;
        await animateNodeToPosition(nodeId, targetX, targetY);
    }
    
    await sleep(1000);

    // 2. Main loop
    while (queue.length > 0) {
        currentMessage = "Processing queue...";
        const u = queue.shift()!;
        
        // Move to sorted list
        sortedList.push(u);
        const sortedTargetX = layout.sorted.x + nodeRadius * 1.5 + (sortedList.length -1) * nodeRadius * 2.5;
        const sortedTargetY = layout.sorted.y + layout.sorted.h / 2;
        await animateNodeToPosition(u, sortedTargetX, sortedTargetY);
        
        // Update neighbors
        const neighbors = adj.get(u)!;
        currentHighlightEdges = neighbors.map(v => [u, v]);
        currentMessage = `Processing neighbors of node ${graph.nodes[u].label}...`;
        await sleep(1500);

        for (const v of neighbors) {
            const vNode = nodes.find(n => n.id === v)!;
            vNode.inDegree -= 1;
            inDegree.set(v, inDegree.get(v)! - 1);
            
            if (inDegree.get(v) === 0) {
                currentMessage = `Node ${graph.nodes[v].label} has in-degree 0. Enqueueing.`;
                await sleep(1500);
                queue.push(v);
                const targetX = layout.queue.x + nodeRadius * 1.5 + (queue.length + sortedList.length) * nodeRadius * 2.5;
                const targetY = layout.queue.y + layout.queue.h / 2;
                await animateNodeToPosition(v, targetX, targetY);
            }
        }
        currentHighlightEdges = [];
    }

    // Check for cycle
    if (sortedList.length !== nodes.length) {
        currentMessage = "Cycle detected! Topological sort not possible.";
    } else {
        currentMessage = "Topological Sort Complete!";
    }
    
    await sleep(1000);
    cancelAnimationFrame(animationFrameId);
    drawScene(currentMessage);
  };
  
  if (window.topologicalSortAnimationId) {
      cancelAnimationFrame(window.topologicalSortAnimationId);
  }
  runAnimation();
};