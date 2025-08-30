'use client';

import './retro-futuristic.css';
import { vt323 } from '@/global/fonts';
import AnimatedCodeBlock from '@/app/components/AnimatedCodeBlock';

export default function Home() {
  return (
    <div className={`retro-body w-screen h-screen flex flex-col items-center justify-center text-4xl ${vt323.className}`}>
      <div className="text-center">
        <div className="retro-box mb-8">
          <p className="retro-text-pink text-8xl">Hi</p>
        </div>
        <div className="mb-4">
          <span className="retro-text-cyan">I am </span>
          <span className="retro-text-yellow">Jimmy</span>
        </div>
        <p className="retro-text-purple">
          Welcome to my playground
        </p>
      </div>
      <AnimatedCodeBlock />
    </div>
  );
}
