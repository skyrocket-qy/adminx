import { Button } from "@/components/ui/button";
import { Code2 } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-terminal-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Code2 className="w-8 h-8 text-neon-cyan neon-text animate-glow-pulse" />
          <span className="text-xl font-bold text-neon-cyan neon-text">CyberAgent</span>
        </div>
        
        <nav className="flex items-center gap-4">
          <Button variant="outline" className="border-neon-purple text-neon-purple hover-glow">
            Plans
          </Button>
          <Button className="bg-neon-cyan text-background hover:bg-neon-cyan/90 glow-cyan">
            Try Agent
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;