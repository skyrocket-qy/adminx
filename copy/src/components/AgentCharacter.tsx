import { useState } from "react";
import agentImage from "@/assets/coding-agent.png";
import { Badge } from "@/components/ui/badge";

const taskCategories = [
  { name: "Bug Fixing", color: "bg-destructive text-destructive-foreground" },
  { name: "Version Bump", color: "bg-neon-cyan text-background" },
  { name: "Tests", color: "bg-neon-yellow text-background" },
  { name: "Code Review", color: "bg-neon-purple text-background" }
];

const AgentCharacter = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <div 
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Agent avatar */}
        <div className="w-20 h-20 rounded-full bg-card border-2 border-neon-cyan glow-cyan overflow-hidden animate-float hover-glow cursor-pointer">
          <img 
            src={agentImage} 
            alt="Coding Agent" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Task panel */}
        <div className={`absolute bottom-24 right-0 bg-card border border-terminal-border rounded-lg p-4 min-w-[280px] transition-all duration-300 ${
          isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}>
          <div className="terminal">
            <h3 className="text-neon-cyan neon-text font-semibold mb-3">
              Agent does coding tasks you don't want to do.
            </h3>
            
            <div className="grid grid-cols-2 gap-2">
              {taskCategories.map((category, index) => (
                <Badge 
                  key={index}
                  className={`${category.color} hover-glow cursor-pointer text-xs py-1 px-2`}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        {/* Notification dot */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-neon-cyan rounded-full animate-glow-pulse border-2 border-background"></div>
      </div>
    </div>
  );
};

export default AgentCharacter;