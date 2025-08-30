'use client';
import React, { useRef, useState } from 'react';
import { Sun, Droplet, Wind } from 'lucide-react';

const FeatureCards = () => {
  const features = [
    {
      icon: <Sun className="w-12 h-12 text-yellow-300" />,
      title: "Clarity",
      description: "See your content with crystal clear transparency. No distractions, just pure focus.",
    },
    {
      icon: <Droplet className="w-12 h-12 text-blue-300" />,
      title: "Fluidity",
      description: "Smooth, liquid-like animations and transitions that make your UI feel alive.",
    },
    {
      icon: <Wind className="w-12 h-12 text-gray-300" />,
      title: "Lightness",
      description: "A lightweight design that feels airy and unburdened. Your users will float through your app.",
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<{ style: React.CSSProperties; key: number; cardIndex: number }[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, cardIndex: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      style: {
        top: y,
        left: x,
        width: '100px',
        height: '100px',
      },
      key: Date.now(),
      cardIndex: cardIndex,
    };

    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.key !== newRipple.key));
    }, 1000);
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-cyan-400 to-blue-800 text-white z-20 relative">
      <div className="container mx-auto" ref={containerRef}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg text-center overflow-hidden relative"
              onMouseMove={handleMouseMove}
              onMouseDown={(e) => handleMouseDown(e, index)}
            >
              <div className="flex justify-center mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-200">
                {feature.description}
              </p>
              {ripples.filter(r => r.cardIndex === index).map((ripple) => (
                <span key={ripple.key} className="ripple" style={ripple.style} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
