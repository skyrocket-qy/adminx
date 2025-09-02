'use client';

import AnimatedCodeBlock from '@/app/components/AnimatedCodeBlock';
import ParticleAnimation from './components/ParticleAnimation';
import './cyberpunk.css';
// Import our new, specialized components
// import BasicCanvasBlock from '@/app/components/BasicCanvasBlock';
// import {HeaderCanvasBlock , DrawCanvasBlock} from '@/app/components/HeaderCanvasBlock';
// import { drawHeaderWithBlockText,
//    drawBfs, 
//    drawStickMan, 
//    drawUnionFind,
//    drawDp,
//    drawGoGcTriColorMark,
//    drawGoGMP,
//    drawBinaryIndexTree,
//    drawSwissTable,
//    drawTopologicalSort
//   } from '@/lib/canvas-drawer'; 

export default function Home() {
  return (
    <div className="cyber-body">
      <ParticleAnimation />
      <header className="cyber-header">
        <h1 className="cyber-h1 glitch" data-text="Yo">Hi</h1>
        <p className="cyber-p">
          Welcome to my playground, explore everywhere to know about this world
        </p>
      </header>
      {/* <div className="h-[25%]">
        <HeaderCanvasBlock
          title="Skyrocket's playground"
          backgroundColor="#1E3A6A" 
          lineColor="#3B82F6"
        />
      </div> */}

      <div className="flex">
        <AnimatedCodeBlock />
      </div>

    </div>
  );
}
