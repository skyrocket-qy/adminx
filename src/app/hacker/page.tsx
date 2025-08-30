'use client'
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import LogDisplay from "./components/LogDisplay";
import Footer from "./components/Footer";
import SystemStats from "./components/SystemStats";
import AnimatedBlock from "../cyberpunk/components/AnimatedBlock";
import CodeAnimation from "../cyberpunk/components/CodeAnimation";
import ParticleAnimation from "../cyberpunk/components/ParticleAnimation";
import './hacker.css';
import '../cyberpunk/cyberpunk.css';

const HackerPage = () => {
  return (
    <div className="bg-black">
      <ParticleAnimation />
      <Header />
      <HeroSection />
      <SystemStats />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <AnimatedBlock />
          <AnimatedBlock />
        </div>
        <CodeAnimation />
      </div>
      <LogDisplay />
      <Footer />
    </div>
  );
};

export default HackerPage;
