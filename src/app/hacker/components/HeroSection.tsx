'use client'
import { useEffect, useState } from "react";
import MatrixBackground from "./MatrixBackground";
import GlitchText from "./GlitchText";
import AsciiArt from "./AsciiArt";

const HeroSection = () => {
  const [text, setText] = useState("");
  const messages = ["Accessing Mainframe...", "Bypassing Security...", "Connection Established."];

  useEffect(() => {
    let messageIndex = 0;
    let charIndex = 0;
    const typing = setInterval(() => {
      if (messageIndex < messages.length) {
        setText(messages[messageIndex].substring(0, charIndex + 1));
        charIndex++;
        if (charIndex === messages[messageIndex].length) {
          messageIndex++;
          charIndex = 0;
          setTimeout(() => {}, 1000); // Pause between messages
        }
      } else {
        clearInterval(typing);
      }
    }, 100);
    return () => clearInterval(typing);
  }, []);

  return (
    <main className="relative min-h-screen pt-20 pb-16 px-6 flex flex-col items-center justify-center bg-black text-green-500 font-mono">
      <MatrixBackground />
      <AsciiArt />
      <div className="absolute inset-0 z-10 bg-black/50" />

      {/* Hero title */}
      <div className="text-center mb-12 z-20">
        <GlitchText className="text-4xl md:text-6xl font-bold mb-6">
          <span className="text-green-400">&gt; </span>
          {text}
          <span className="animate-ping">_</span>
        </GlitchText>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Welcome to the digital underground.
        </p>
      </div>
    </main>
  );
};

export default HeroSection;
