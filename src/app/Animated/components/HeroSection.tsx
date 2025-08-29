const HeroSection = () => {
  return (
    <main className="relative min-h-screen pt-20 pb-16 px-6 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
      {/* Hero title */}
      <div className="text-center mb-12 z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-down">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600">
            Welcome to the
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600">
            Animated World
          </span>
        </h1>
        <p className="text-xl text-gray-200 max-w-2xl mx-auto animate-fade-in-up">
          Experience the magic of CSS animations and transitions.
        </p>
      </div>
    </main>
  );
};

export default HeroSection;
