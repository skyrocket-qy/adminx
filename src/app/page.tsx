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
      <AsciiLogo/>
      <ParticleAnimation />
      <header className="cyber-header">
        <h1 className="cyber-h1 glitch" data-text="Yo">Hi</h1>
        <p className="cyber-p">
          Welcome to my playground, explore everywhere to know about this world
        </p>
      </header>
      <BouncingCanvas 
        boundaryRef={constrainedAreaRef} drawFunc={drawBfs}
        backgroundColor="#0369a1" initialPosition={{x: 20, y: 40}}
      />
      <BouncingCanvas 
        boundaryRef={constrainedAreaRef} drawFunc={drawStickMan} 
        backgroundColor="#be185d" initialPosition={{x: 300, y: 150}}
      />
      <div className="flex">
        <AnimatedCodeBlock />
      </div>

    </div>
  );
}