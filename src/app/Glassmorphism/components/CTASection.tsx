'use client';

const CTASection = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="p-12 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Dive In?</h2>
          <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
            Experience the future of UI design. Join us and create stunning, fluid, and intuitive interfaces that your users will love.
          </p>
          <button className="px-8 py-4 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition-colors">
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
