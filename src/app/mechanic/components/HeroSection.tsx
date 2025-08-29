import { Wrench, Cog, Battery } from "lucide-react";

const HeroSection = () => {
  return (
    <main className="relative min-h-screen pt-20 pb-16 px-6 flex flex-col items-center justify-center bg-gray-900 text-white">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: "url('https://www.transparenttextures.com/patterns/metal-plate.png')",
        }}
      />

      {/* Hero title */}
      <div className="text-center mb-12 z-10">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 uppercase">
          <span className="text-yellow-500">Built</span>
          <span> to Last</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Quality repairs and maintenance for your vehicle.
        </p>
      </div>

      {/* Tools section */}
      <div className="flex gap-8 text-yellow-500">
        <Wrench className="w-12 h-12" />
        <Cog className="w-12 h-12" />
        <Battery className="w-12 h-12" />
      </div>
    </main>
  );
};

export default HeroSection;
