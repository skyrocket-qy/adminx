// app/page.tsx

'use client';

import AnimatedCodeBlock from '@/app/components/AnimatedCodeBlock';
import CanvasBlock from './CanvasBlock'; // Import the new component

export default function Home() {
  return (
    <main className="flex h-full flex-col overflow-hidden bg-[#2E1A47]">
      
      <div className="flex-1 h-[25%]">
        <CanvasBlock backgroundColor="#1E3A8A" lineColor="#3B82F6" displayText="Skyrocket's playground"/>
      </div>

      <div className="flex">
        <div className="flex-1">
          <CanvasBlock backgroundColor="#4C1D95" lineColor="#A78BFA" />
        </div>
        
        <AnimatedCodeBlock />
        
        <div className="flex-1">
          <CanvasBlock />
        </div>
      </div>

      <div className="flex-1">
        <CanvasBlock backgroundColor="#064E3B" lineColor="#34D399" />
      </div>

    </main>
  );
}