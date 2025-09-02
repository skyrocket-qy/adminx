'use client';

import React, { useState, useEffect, useMemo } from 'react';
import "./AnimatedCodeBlock.css"

// The Go-like code snippet to be animated.
const codeToType = 
`const (
  name = "HUANG, QING YUN (黃青雲)"
  nickName = "Jimmy"
  email = "skyrocketqy81@gmail.com"
  militaryService = "Completed (2020/01)"
  education = "Master"
)

var (
  currentJob = Job{
    title: "Backend engineer",
    company: "美商時豪",
    period: "2025/6 ~ Now",
  }
  jobExperience: "4 years",
  role = "Backend Engineer",
  interests = "Full-stack Development",
  Languages = []string{"Go", "Python", "JavaScript/TypeScript", "React"},
)`;

// Maps token types to their specific CSS class names.
type TokenType = keyof typeof tokenClassNames;

const tokenClassNames = {
  keyword: 'keyword',
  string: 'string',
  function: 'function',
  comment: 'comment',
  number: 'number',
  operator: 'operator',
  punctuation: 'punctuation',
  className: 'class-name',
};

/**
 * A tokenizer-based syntax highlighter for Go-like syntax.
 * It processes the code string chunk by chunk, matching against an ordered set of rules.
 * @param {string} code The code to highlight.
 * @returns {Array<{char: string, className: string | undefined}>} An array of characters with their corresponding CSS classes.
 */
const highlightSyntax = (code: string): Array<{ char: string; className: string | undefined }> => {
  const tokens = [];
  let cursor = 0;

  const tokenPatterns = [
    { type: 'comment' as TokenType, pattern: /^\/\/.*/ },
    { type: 'string' as TokenType, pattern: /^"[^"]*"/ },
    { type: 'keyword' as TokenType, pattern: /^\b(const|var|string)\b/ },
    { type: 'className' as TokenType, pattern: /^\b[A-Z]\w*(?=\s*{)/ },
    { type: 'number' as TokenType, pattern: /^\b\d+(\.\d+)?\b/ },
    { type: 'operator' as TokenType, pattern: /^(:=|[:={}\[\]])/ },
    { type: 'punctuation' as TokenType, pattern: /^[(),]/ },
    { type: 'default' as TokenType, pattern: /^\s+|^./ },
  ];

  while (cursor < code.length) {
    let matchFound = false;
    for (const { type, pattern } of tokenPatterns) {
      const match = code.substring(cursor).match(pattern);
      if (match) {
        const value = match[0];
        const className = tokenClassNames[type]; // Get specific class like 'keyword'
        
        for (const char of value) {
          tokens.push({ char, className });
        }
        
        cursor += value.length;
        matchFound = true;
        break;
      }
    }

    if (!matchFound) {
      tokens.push({ char: code[cursor], className: undefined });
      cursor++;
    }
  }
  return tokens;
};

const AnimatedCodeBlock = () => {
  const [displayedChars, setDisplayedChars] = useState<{ char: string; className: string | undefined }[]>([]);
  const [charIndex, setCharIndex] = useState(0);

  const styledCode = useMemo(() => highlightSyntax(codeToType), []);

  useEffect(() => {
    if (charIndex < styledCode.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedChars((prev) => [...prev, styledCode[charIndex]]);
        setCharIndex((prev) => prev + 1);
      }, 25);
      return () => clearTimeout(timeoutId);
    } else {
      const timeoutId = setTimeout(() => {
        setDisplayedChars([]);
        setCharIndex(0);
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [charIndex, styledCode]);

  const lineNumbers = useMemo(() => {
    const lines = codeToType.split('\n').length;
    return Array.from({ length: lines }, (_, i) => i + 1).join('\n');
  }, []);

  return (
    <>
      <div className="h-full code-block-container">
        <div className="code-block-header">
          <div className="code-block-header-dot red"></div>
          <div className="code-block-header-dot yellow"></div>
          <div className="code-block-header-dot green"></div>
        </div>
        <div className="code-block-content h-full">
          <pre className="line-numbers">{lineNumbers}</pre>
          <pre className="code">
            <code>
              {displayedChars.map((token, index) => (
                <span key={index} className={`token ${token.className || ''}`}>
                  {token.char}
                </span>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </>
  );
};

export default AnimatedCodeBlock;

