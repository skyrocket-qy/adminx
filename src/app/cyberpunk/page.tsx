import React from 'react';
import Image from 'next/image';
import './cyberpunk.css';

const CyberpunkPage: React.FC = () => {
  return (
    <div className="cyber-body">
      <header className="cyber-header">
        <h1 className="cyber-h1 glitch" data-text="Cyberpunk">Cyberpunk</h1>
        <p className="cyber-p">
          Welcome to the neon-drenched streets of the future. A world of high-tech and low-life.
        </p>
      </header>

      <section className="cyber-section">
        <h2 className="cyber-h2">About The World</h2>
        <p className="cyber-p">
          In the year 2077, the world is a different place. Corporations rule, and the streets are a battlefield.
          Cybernetically enhanced individuals walk among us, and technology has blurred the line between human and machine.
          This is a world of chrome and neon, where danger lurks around every corner.
        </p>
      </section>

      <section className="cyber-section">
        <h2 className="cyber-h2">Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3 className="feature-h3">Cybernetics</h3>
            <p className="feature-p">Enhance your body with cutting-edge technology.</p>
          </div>
          <div className="feature-card">
            <h3 className="feature-h3">Mega-Corporations</h3>
            <p className="feature-p">Navigate the treacherous world of corporate espionage.</p>
          </div>
          <div className="feature-card">
            <h3 className="feature-h3">Neon-Drenched Cities</h3>
            <p className="feature-p">Explore vast, futuristic metropolises.</p>
          </div>
        </div>
      </section>

      <section className="cyber-section">
        <h2 className="cyber-h2">Gallery</h2>
        <div className="gallery-grid">
          <div className="gallery-item">
            <Image src="https://via.placeholder.com/300x200.png?text=Cyberpunk+City" alt="Cyberpunk City" width={300} height={200} />
          </div>
          <div className="gallery-item">
            <Image src="https://via.placeholder.com/300x200.png?text=Cyborg" alt="Cyborg" width={300} height={200} />
          </div>
          <div className="gallery-item">
            <Image src="https://via.placeholder.com/300x200.png?text=Futuristic+Car" alt="Futuristic Car" width={300} height={200} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CyberpunkPage;
