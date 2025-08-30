import { Button } from "@/components/ui/button";
import { Wrench } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-gray-800 border-b-4 border-yellow-500">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Wrench className="w-8 h-8 text-yellow-500" />
          <span className="text-2xl font-bold text-white font-mono uppercase">
            Mechanic&apos;s Bay
          </span>
        </div>

        <nav className="flex items-center gap-4">
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
            Services
          </Button>
          <Button className="bg-yellow-500 text-black hover:bg-yellow-600">
            Book a Repair
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
