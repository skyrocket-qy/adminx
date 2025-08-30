'use client';
const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-gradient-to-br from-cyan-400 to-blue-800 text-white z-20 relative">
      <div className="container mx-auto">
        <div className="p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-gray-200">
              © 2024 Glassmorphism Inc.
            </p>
            <p className="text-xs text-gray-300">
              Designed with clarity in mind.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-200 hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-200 hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-200 hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
