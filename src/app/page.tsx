'use client';

import AnimatedCodeBlock from '@/app/components/AnimatedCodeBlock';
// Import our new, specialized components
import BasicCanvasBlock from '@/app/components/BasicCanvasBlock';
import HeaderCanvasBlock from '@/app/components/HeaderCanvasBlock';

export default function Home() {
  return (
    // Use h-screen to ensure the container fits the viewport exactly
    <main className="flex h-screen flex-col overflow-hidden">
      
      {/* Top Row: Use the specialized HeaderCanvasBlock */}
      {/* Remove flex-1 and set an explicit height */}
      <div className="h-[25%]">
        <HeaderCanvasBlock
          title="Skyrocket's playground"
          backgroundColor="#1E3A8A" 
          lineColor="#3B82F6"
        />
      </div>

      {/* Middle Row: Content height is determined by AnimatedCodeBlock */}
      <div className="flex">
        {/* Left Canvas: Just needs the basic block */}
        <div className="flex-1">
          <BasicCanvasBlock backgroundColor="#4C1D95" lineColor="#A78BFA" />
        </div>
        
        <AnimatedCodeBlock />
        
        {/* Right Canvas: Just needs the basic block */}
        <div className="flex-1">
          <BasicCanvasBlock />
        </div>
      </div>

      {/* Bottom Row: `flex-1` makes it fill all remaining vertical space */}
      <div className="flex-1">
        <BasicCanvasBlock backgroundColor="#064E3B" lineColor="#34D399" />
      </div>

    </main>
  );
}
