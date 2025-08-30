"use client";

import React, { useRef, useEffect } from 'react';

const ParticleAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
    };

    setCanvasDimensions();

    const characters = ['M', 'W', 'K', 'N', 'C', 'X', 'O', ':', ';', '.', ','];
    const colors = ['#00ff00', '#ff00ff', '#00ffff', '#ffff00'];

    class Particle {
      x: number;
      y: number;
      character: string;
      color: string;
      speed: number;

      constructor(x: number, y: number, character: string, color: string) {
        this.x = x;
        this.y = y;
        this.character = character;
        this.color = color;
        this.speed = Math.random() * 1.5 + 0.5;
      }

      draw() {
        if (ctx) {
          ctx.fillStyle = this.color;
          ctx.font = '15px Courier New';
          ctx.fillText(this.character, this.x, this.y);
        }
      }

      update() {
        if (!canvas) return;
        this.y += this.speed;
        if (this.y > canvas.height) {
          this.y = 0;
          this.x = Math.random() * canvas.width;
        }
        this.draw();
      }
    }

    let particles: Particle[] = [];
    const numberOfParticles = 200; // Increased for a larger canvas

    function init() {
      if (!canvas) return;
      particles = [];
      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const character = characters[Math.floor(Math.random() * characters.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, character, color));
      }
    }

    function animate() {
      if (ctx && canvas) {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => particle.update());
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    init();
    animate();

    const handleResize = () => {
      setCanvasDimensions();
      init();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(document.body);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', top: 0, left: 0, zIndex: -1 }} />;
};

export default ParticleAnimation;
