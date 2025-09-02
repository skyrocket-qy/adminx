'use client';

import React, { useState, useEffect, useMemo } from 'react';
import './AnimatedCodeBlock.css';
import { vt323 } from '@/global/fonts';

const codeToType = `// Introduction: About Me

const personalInfo = {
  name: "HUANG, QING YUN (黃青雲)",
  email: "rivendinner@gmail.com",
  gender: "Male",
  age: 32,
  militaryService: "Completed (2020/01)",
  role: "Backend Engineer",
  interests: "Full-stack Development",
  primaryLanguage: "Go",
  otherLanguages: ["Python", "JavaScript/TypeScript", "C++"],
  frontendFamiliarity: "React",
  experienceAreas: ["AWS", "microservices", "DevOps practices"],
  attitude: "Proactive learning, adaptable, collaborative",
};

console.log(introduction);
`;

const tokenColors = {
  keyword: 'token keyword',
  string: 'token string',
  function: 'token function',
  comment: 'token comment',
  number: 'token number',
  operator: 'token operator',
  punctuation: 'token punctuation',
  className: 'token class-name',
  default: '',
};

const highlightSyntax = (code: string) => {
  const tokens = [];
  const keywordRegex = /\b(class|constructor|const|let|var|async|if|return)\b/g;
  const stringRegex = /'[^']*'/g;
  const functionRegex = /\b[a-zA-Z_]\w*(?=\()/g;
  const commentRegex = /\/\/.*/g;
  const numberRegex = /\b\d+\b/g;
  const operatorRegex = /[=<>+\-*{}]/g;
  const punctuationRegex = /[.,;()\[\]]/g;
  const classNameRegex = /\b[A-Z]\w*\b/g;

  const getClassName = (char: string, index: number) => {
    // This is a simplified approach. A real syntax highlighter is much more complex.
    if (code.substring(index).match(commentRegex)?.index === 0) return tokenColors.comment;
    if (code.substring(index).match(keywordRegex)?.index === 0) return tokenColors.keyword;
    if (code.substring(index).match(stringRegex)?.index === 0) return tokenColors.string;
    if (code.substring(index).match(functionRegex)?.index === 0) return tokenColors.function;
    if (code.substring(index).match(numberRegex)?.index === 0) return tokenColors.number;
    if (code.substring(index).match(classNameRegex)?.index === 0) return tokenColors.className;
    if (char.match(operatorRegex)) return tokenColors.operator;
    if (char.match(punctuationRegex)) return tokenColors.punctuation;
    return tokenColors.default;
  };

  for (let i = 0; i < code.length; i++) {
    const char = code[i];
    const className = getClassName(char, i);
    tokens.push({ char, className });
  }
  return tokens;
};


const AnimatedCodeBlock = () => {
  const [displayedChars, setDisplayedChars] = useState<{ char: string; className: string; }[]>([]);
  const [charIndex, setCharIndex] = useState(0);

  const styledCode = useMemo(() => highlightSyntax(codeToType), []);

  useEffect(() => {
    if (charIndex < styledCode.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedChars((prev) => [...prev, styledCode[charIndex]]);
        setCharIndex((prev) => prev + 1);
      }, 25); // Faster typing speed
      return () => clearTimeout(timeoutId);
    } else {
      const timeoutId = setTimeout(() => {
        setDisplayedChars([]);
        setCharIndex(0);
      }, 2000); // Wait 2 seconds before repeating
      return () => clearTimeout(timeoutId);
    }
  }, [charIndex, styledCode]);

  const lineNumbers = useMemo(() => {
    const lines = codeToType.split('\n');
    return Array.from({ length: lines.length }, (_, i) => i + 1).join('\n');
  }, []);

  return (
    <div className={`h-full code-block-container ${vt323.className}`}>
      <div className="code-block-header">
        <div className="code-block-header-dot red"></div>
        <div className="code-block-header-dot yellow"></div>
        <div className="code-block-header-dot green"></div>
      </div>
      <div className="code-block-content h-full">
        <pre className="line-numbers">{lineNumbers}</pre>
        <pre className="code">
          <code>
            {displayedChars.map((char, index) => (
              <span key={index} className={char.className}>
                {char.char}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default AnimatedCodeBlock;
