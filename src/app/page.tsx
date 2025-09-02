'use client';

import AnimatedCodeBlock from '@/app/components/AnimatedCodeBlock';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import ParticleAnimation from './components/ParticleAnimation';
import {BouncingCanvas } from "./components/BouncingCanvas";
import AsciiLogo from "./components/HeaderCanvas"
import './cyberpunk.css';
// Import our new, specialized components
// import BasicCanvasBlock from '@/app/components/BasicCanvasBlock';
// import {HeaderCanvasBlock , DrawCanvasBlock} from '@/app/components/HeaderCanvasBlock';
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
  const constrainedAreaRef = useRef<HTMLElement | null>(null);
  return (
    <div className="cyber-body">
      <ParticleAnimation />
      <header className="cyber-header">
        <AsciiLogo/>
      </header>
      <BouncingCanvas 
        boundaryRef={constrainedAreaRef} drawFunc={drawBfs}
        backgroundColor="#0369a1" initialPosition={{x: 20, y: 40}}
      />
      <BouncingCanvas 
        boundaryRef={constrainedAreaRef} drawFunc={drawStickMan} 
        backgroundColor="#be185d" initialPosition={{x: 800, y: 450}}
      />
      <BouncingCanvas 
        boundaryRef={constrainedAreaRef} drawFunc={drawDp} 
        backgroundColor="#be185d" initialPosition={{x: 1500, y: 850}}
      />
      <BouncingCanvas 
        boundaryRef={constrainedAreaRef} drawFunc={drawGoGcTriColorMark} 
        backgroundColor="#be185d" initialPosition={{x: 300, y: 850}}
      />
      <BouncingCanvas 
        boundaryRef={constrainedAreaRef} drawFunc={drawGoGMP} 
        backgroundColor="#be185d" initialPosition={{x: 1200, y: 250}}
      />
      <BouncingCanvas 
        boundaryRef={constrainedAreaRef} drawFunc={drawBinaryIndexTree} 
        backgroundColor="#be185d" initialPosition={{x: 1800, y: 100}}
      />
      <div className="flex">
        <AnimatedCodeBlock />
      </div>

    </div>
  );
}