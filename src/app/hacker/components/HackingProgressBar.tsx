'use client';
import React, { useState, useEffect } from 'react';

interface HackingProgressBarProps {
  label: string;
  duration?: number;
}

const HackingProgressBar: React.FC<HackingProgressBarProps> = ({ label, duration = 3000 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let startTime: number;
    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsedTime = time - startTime;
      const newProgress = Math.min((elapsedTime / duration) * 100, 100);
      setProgress(newProgress);
      if (newProgress < 100) {
        requestAnimationFrame(animate);
      }
    };
    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [duration]);

  return (
    <div className="hacking-progress-bar-container">
      <div className="hacking-progress-bar-label">{label}</div>
      <div className="hacking-progress-bar">
        <div
          className="hacking-progress-bar-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="hacking-progress-bar-percentage">{Math.round(progress)}%</div>
    </div>
  );
};

export default HackingProgressBar;
