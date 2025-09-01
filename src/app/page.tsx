'use client';

import AnimatedCodeBlock from '@/app/components/AnimatedCodeBlock';
// Import our new, specialized components
import BasicCanvasBlock from '@/app/components/BasicCanvasBlock';
import {HeaderCanvasBlock , DrawCanvasBlock} from '@/app/components/HeaderCanvasBlock';
import { drawHeaderWithBlockText,
   drawBfs, 
   drawStickMan, 
   drawUnionFind,
   drawDp,
   drawGoGcTriColorMark,
   drawGoGMP,
   drawBinaryIndexTree,
   drawSwissTable,
   drawTopologicalSort
  } from '@/lib/canvas-drawer'; 

export default function Home() {
  return (
    // Use h-screen to ensure the container fits the viewport exactly
    <main className="flex h-screen flex-col overflow-hidden">
      
      {/* Top Row: Use the specialized HeaderCanvasBlock */}
      {/* Remove flex-1 and set an explicit height */}
      <div className="h-[25%]">
        <HeaderCanvasBlock
          title="Skyrocket's playground"
          backgroundColor="#1E3A6A" 
          lineColor="#3B82F6"
        />
      </div>

      {/* Middle Row: Content height is determined by AnimatedCodeBlock */}
      <div className="flex h-full">
        {/* Left Canvas: Just needs the basic block */}
        <div className="flex-1 h-full">
          <div className='h-[50%]'>
            <DrawCanvasBlock 
              title="Skyrocket's playground"
              backgroundColor="#4C1D95" 
              lineColor="#A78BFA" 
              drawFunc={drawDp}
            />  
          </div>
          <div className='h-[50%]'>
            <DrawCanvasBlock
              title="Skyrocket's playground"
              backgroundColor="#1E3A8A" 
              lineColor="#3B82F6"
              drawFunc={drawBfs}
            />
          </div>
        </div>
        
        <AnimatedCodeBlock />
        
        {/* Right Canvas: Just needs the basic block */}
        <div className="flex-1 h-full">
          <div className='h-[50%]'>
            <DrawCanvasBlock 
              title="Skyrocket's playground"
              backgroundColor="#4C1D95" 
              lineColor="#A78BFA" 
              drawFunc={drawGoGcTriColorMark}
            />  
          </div>
          <div className='h-[50%]'>
            <DrawCanvasBlock
              title="Skyrocket's playground"
              backgroundColor="#1E3A8A" 
              lineColor="#3B82F6"
              drawFunc={drawGoGMP}
            />
          </div>
        </div>
      </div>

    </main>
  );
}
