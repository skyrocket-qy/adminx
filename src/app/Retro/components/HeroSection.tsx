const HeroSection = () => {
  return (
    <main className="relative min-h-screen pt-20 pb-16 px-6 flex flex-col items-center justify-center bg-[#0D0C1D]">
      {/* Background with retro grid */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage:
              "linear-gradient(to right, #FFC700 1px, transparent 1px), linear-gradient(to bottom, #FFC700 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Hero title */}
      <div className="text-center mb-12 z-10">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white font-mono uppercase">
          <span className="text-[#FFC700]">Pixel</span>
          <span className="text-white">Perfect</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto font-mono">
          A blast from the past, built with modern technology.
        </p>
      </div>
    </main>
  );
};

export default HeroSection;
