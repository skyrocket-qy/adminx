const HeroSection = () => {
  return (
    <main className="relative min-h-screen pt-20 pb-16 px-6 flex flex-col items-center justify-center bg-stone-50">
      {/* Hero title */}
      <div className="text-center mb-12 z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span>An Asynchronous</span>
          <br />
          <span>Coding Agent</span>
        </h1>
        <p className="text-xl text-amber-900 max-w-2xl mx-auto">
          Advanced AI that handles your tedious coding tasks while you focus on what matters.
        </p>
      </div>
    </main>
  );
};

export default HeroSection;
