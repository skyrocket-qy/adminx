'use client';

import AnimatedCodeBlock from '@/app/components/AnimatedCodeBlock';
import React, { useState, useEffect, useMemo, useRef } from 'react';
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

      <BouncingCanvas />
      <div className="flex">
        <AnimatedCodeBlock />
      </div>

    </div>
  );
}

const BouncingCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // Use refs for animation state to avoid re-renders on every frame.
    const position = useRef({ x: 100, y: 100 });
    const velocity = useRef({ dx: 2, dy: 2 });
    const dragInfo = useRef({ isDragging: false, startX: 0, startY: 0 });
    const animationFrameId = useRef<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Draw content on the canvas
        ctx.fillStyle = 'white';
        ctx.font = 'bold 20px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Drag Me!', canvas.width / 2, canvas.height / 2);
        ctx.font = '14px Inter, sans-serif';
        ctx.fillText('🚀', canvas.width / 2, canvas.height / 2 + 25);

        // Animation loop
        const animate = () => {
            if (dragInfo.current.isDragging) {
                // Dragging logic is handled by pointermove
            } else {
                position.current.x += velocity.current.dx;
                position.current.y += velocity.current.dy;

                // Wall collision detection
                if (position.current.x + canvas.width > window.innerWidth || position.current.x < 0) {
                    velocity.current.dx *= -1;
                }
                if (position.current.y + canvas.height > window.innerHeight || position.current.y < 0) {
                    velocity.current.dy *= -1;
                }
            }
            canvas.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
            animationFrameId.current = requestAnimationFrame(animate);
        };

        const onPointerDown = (e: PointerEvent) => {
            dragInfo.current.isDragging = true;
            canvas.style.cursor = 'grabbing';
            dragInfo.current.startX = e.clientX - position.current.x;
            dragInfo.current.startY = e.clientY - position.current.y;
            velocity.current = { dx: 0, dy: 0 };
        };

        const onPointerMove = (e: PointerEvent) => {
            if (dragInfo.current.isDragging) {
                position.current.x = e.clientX - dragInfo.current.startX;
                position.current.y = e.clientY - dragInfo.current.startY;
            }
        };

        const onPointerUp = () => {
            if (dragInfo.current.isDragging) {
                dragInfo.current.isDragging = false;
                canvas.style.cursor = 'grab';
                // Give it a random push on release
                velocity.current.dx = (Math.random() - 0.5) * 8;
                velocity.current.dy = (Math.random() - 0.5) * 8;
            }
        };
        
        // Initialize position to the center of the screen
        position.current = {
            x: window.innerWidth / 2 - canvas.width / 2,
            y: window.innerHeight / 3 - canvas.height / 2,
        };
        canvas.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;

        // Attach event listeners
        canvas.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
        
        animate();

        // Cleanup function to remove listeners when the component unmounts
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            canvas.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
        };
    }, []); // Empty dependency array ensures this runs only once

    return (
        <canvas
            ref={canvasRef}
            width="200"
            height="120"
            style={{
                position: 'absolute',
                top: 0, left: 0,
                backgroundColor: '#4f46e5',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
                borderRadius: '0.75rem',
                cursor: 'grab',
                touchAction: 'none' // Important for mobile dragging
            }}
        />
    );
};