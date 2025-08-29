import { Button } from "@/components/ui/button";
import { Terminal } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-black border-b border-green-500">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Terminal className="w-8 h-8 text-green-500" />
          <span className="text-2xl font-bold text-green-500 font-mono">
            /hacker
          </span>
        </div>

        <nav className="flex items-center gap-4">
          <Button variant="outline" className="text-green-500 border-green-500 hover:bg-green-500 hover:text-black">
            [root@localhost ~]#
          </Button>
          <Button className="bg-green-500 text-black hover:bg-green-600">
            Run Exploit
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
