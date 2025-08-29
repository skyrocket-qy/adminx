import { Button } from "@/components/ui/button";
import { Gamepad2 } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#282240] border-b-4 border-[#FFC700]">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Gamepad2 className="w-8 h-8 text-[#FFC700]" />
          <span className="text-2xl font-bold text-white font-mono">
            RetroSpace
          </span>
        </div>

        <nav className="flex items-center gap-4">
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
            High Scores
          </Button>
          <Button className="bg-[#FFC700] text-black hover:bg-yellow-400">
            Play Game
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
