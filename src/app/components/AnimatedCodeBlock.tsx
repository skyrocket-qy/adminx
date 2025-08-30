'use client';

import React, { useState, useEffect } from 'react';
import './AnimatedCodeBlock.css';
import { vt323 } from '@/global/fonts';

const codeToType = `// Objective: Change UserOnboarding to use a state machine for steps

class UserOnboarding {
  constructor(user) {
    this.user = user;
    this.steps = [
      'Welcome',
      'Profile Setup',
      'Connect Socials',
      'Done'
    ];
    this.currentStep = 0;
  }

  async nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      // TODO: Trigger analytics
      return this.steps[this.currentStep];
    }
    return "done";
  }

  // old method - to be removed
  legacyNotification() {
    alert("Welcome aboard, " + this.user.name);
  }
}

const newUser = { name: "David", id: "usr_123" };
const onboardingProcess = new UserOnboarding(newUser);

onboardingProcess.nextStep();
// onboardingProcess.legacyNotification(); // Commented out`;

const AnimatedCodeBlock = () => {
  const [displayedCode, setDisplayedCode] = useState('');
  const [codeIndex, setCodeIndex] = useState(0);

  useEffect(() => {
    if (codeIndex < codeToType.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedCode((prev) => prev + codeToType.charAt(codeIndex));
        setCodeIndex((prev) => prev + 1);
      }, 50); // Typing speed
      return () => clearTimeout(timeoutId);
    } else {
      const timeoutId = setTimeout(() => {
        setDisplayedCode('');
        setCodeIndex(0);
      }, 2000); // Wait 2 seconds before repeating
      return () => clearTimeout(timeoutId);
    }
  }, [codeIndex, codeToType.length]);

  const lineCount = displayedCode.split('\n').length;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1).join('\n');

  return (
    <div className={`code-block-container ${vt323.className}`}>
      <div className="code-block-header">
        <div className="code-block-header-dot red"></div>
        <div className="code-block-header-dot yellow"></div>
        <div className="code-block-header-dot green"></div>
      </div>
      <div className="code-block-content">
        <pre className="line-numbers">{lineNumbers}</pre>
        <pre className="code">
          <code>
            {displayedCode}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default AnimatedCodeBlock;
