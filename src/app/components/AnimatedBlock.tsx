import React from 'react';

const AnimatedBlock: React.FC = () => {
  return (
    <div className="animated-block">
      <h3 className="animated-block-h3">Data Stream</h3>
      <p className="animated-block-p">Initializing secure connection...</p>
      <div className="scanner-bar"></div>
    </div>
  );
};

export default AnimatedBlock;
