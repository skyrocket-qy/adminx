'use client';

import './retro-futuristic.css';

export default function Home() {
  return (
    <div className="retro-body w-screen h-screen flex items-center justify-center text-4xl">
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
    </div>
  );
}
