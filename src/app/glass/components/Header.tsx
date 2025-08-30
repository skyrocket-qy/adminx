import { Button } from "@/components/ui/button";
import { Layers } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-lg">
          <div className="flex items-center gap-3">
            <Layers className="w-8 h-8 text-white" />
            <span className="text-xl font-bold text-white">
              Glassmorphism
            </span>
          </div>

          <nav className="flex items-center gap-4">
            <Button variant="ghost" className="text-white hover:bg-white/20">
              Features
            </Button>
            <Button className="bg-white/20 text-white hover:bg-white/30 rounded-full">
              Get Started
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
