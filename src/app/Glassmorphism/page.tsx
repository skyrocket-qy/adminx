'use client'
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeatureCards from "./components/FeatureCards";
import Footer from "./components/Footer";

const GlassmorphismPage = () => {
  return (
    <div className="min-h-screen bg-gray-800 bg-cover bg-center" style={{backgroundImage: "url('/auth_bg.png')"}}>
      <Header />
      <HeroSection />
      <FeatureCards />
      <Footer />
    </div>
  );
};

export default GlassmorphismPage;
