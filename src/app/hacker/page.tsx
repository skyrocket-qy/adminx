'use client'
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import LogDisplay from "./components/LogDisplay";
import Footer from "./components/Footer";
import SystemStats from "./components/SystemStats";

const HackerPage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <SystemStats />
      <LogDisplay />
      <Footer />
    </div>
  );
};

export default HackerPage;
