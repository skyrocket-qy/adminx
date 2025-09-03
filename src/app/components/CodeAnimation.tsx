"use client";
import React, { useState, useEffect } from 'react';
import '@/app/cyberpunk/cyberpunk.css';

const codeText = `
const cyberpunk = () => {
  console.log("Hacking the Gibson...");
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      console.log(\`Packet \${i} sent...\`);
    }, i * 500);
  }
};

cyberpunk();
`;

const CodeAnimation: React.FC = () => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < codeText.length) {
        setText((prev) => prev + codeText.charAt(index));
        setIndex((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setText('');
          setIndex(0);
        }, 2000); // Pause before repeating
      }
    }, 50); // Typing speed

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="code-animation-block">
      <pre>
        <code>{text}</code>
      </pre>
    </div>
  );
};

export default CodeAnimation;
