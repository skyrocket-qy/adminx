const HeroSection = () => {
  return (
    <main className="relative min-h-screen pt-32 pb-16 px-6 flex flex-col items-center justify-center bg-gradient-to-br from-cyan-400 to-blue-800 text-white">
      {/* Background shapes */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute top-40 right-40 w-40 h-40 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute bottom-20 left-40 w-40 h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

      {/* Hero content */}
      <div className="text-center mb-12 z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span>See Through</span>
          <br />
          <span>The Web</span>
        </h1>
        <p className="text-xl text-gray-200 max-w-2xl mx-auto">
          A modern UI trend that's here to stay.
        </p>
      </div>

      {/* Glassmorphic card */}
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Frosted Glass</h2>
        <p className="text-gray-300">
          This is an example of a glassmorphic card. It has a blurred background, a subtle border, and a sense of depth.
        </p>
      </div>
    </main>
  );
};

export default HeroSection;
