import CodeDisplay from "./CodeDisplay";

const HeroSection = () => {
  return (
    <main className="relative min-h-screen pt-20 pb-16 px-6 flex flex-col items-center justify-center">
      {/* Hero title */}
      <div className="text-center mb-12 z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="text-neon-cyan neon-text">An Asynchronous</span>
          <br />
          <span className="text-neon-purple neon-text">Coding Agent</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Advanced AI that handles your tedious coding tasks while you focus on what matters.
        </p>
      </div>
      
      {/* Code display */}
      <div className="w-full max-w-6xl z-10">
        <CodeDisplay />
      </div>
      
      {/* Dotted border effect */}
      <div className="absolute inset-8 border-2 border-dashed border-terminal-border opacity-30 rounded-lg pointer-events-none"></div>
    </main>
  );
};

export default HeroSection;