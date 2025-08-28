import { Button } from "@/components/ui/button";
import { Code2 } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-stone-50/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Code2 className="w-8 h-8" />
          <span className="text-xl font-bold">Cool Page</span>
        </div>

        <nav className="flex items-center gap-4">
          <Button variant="outline">
            Plans
          </Button>
          <Button>
            Try Agent
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
