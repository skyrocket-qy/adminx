import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AgentCharacter from "@/components/AgentCharacter";
import ASCIIArt from "@/components/ASCIIArt";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <ASCIIArt />
      <Header />
      <HeroSection />
      <AgentCharacter />
    </div>
  );
};

export default Index;
