import { useState, useEffect } from "react";

const codeLines = [
  "// Objective: Change UserOnboarding to use a state machine for steps",
  "",
  "class UserOnboarding {",
  "  constructor(user) {",
  "    this.user = user;",
  "    this.currentStep = 0;",
  "  }",
  "",
  "  async nextStep() {",
  "    if (this.currentStep < this.steps.length - 1) {",
  "      this.currentStep++;",
  "      // TODO: Trigger analytics",
  "      return this.steps[this.currentStep];",
  "    }",
  "    return \"done\";",
  "  }",
  "",
  "  // Old method - to be removed",
  "  legacyNotification() {",
  "    alert(\"Welcome aboard, \" + this.user.name);",
  "  }",
  "}",
  "",
  "const newUser = { name: \"Alex\", id: \"usr_456\" };",
  "const onboardingProcess = new UserOnboarding(newUser);",
  "",
  "onboardingProcess.nextStep();"
];

const CodeDisplay = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [currentTypingLine, setCurrentTypingLine] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (visibleLines < codeLines.length) {
        setVisibleLines(prev => prev + 1);
        setCurrentTypingLine(prev => prev + 1);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [visibleLines]);

  const getSyntaxHighlight = (line: string) => {
    if (line.startsWith("//")) {
      return "text-muted-foreground italic";
    }
    if (line.includes("class") || line.includes("constructor") || line.includes("async")) {
      return "text-neon-purple";
    }
    if (line.includes("const") || line.includes("new") || line.includes("return")) {
      return "text-neon-yellow";
    }
    if (line.includes("this.") || line.includes("alert")) {
      return "text-neon-pink";
    }
    return "text-foreground";
  };

  return (
    <div className="terminal glow-cyan max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-terminal-border">
        <div className="w-3 h-3 rounded-full bg-destructive"></div>
        <div className="w-3 h-3 rounded-full bg-neon-yellow"></div>
        <div className="w-3 h-3 rounded-full bg-neon-cyan"></div>
        <span className="ml-4 text-muted-foreground text-sm">coding-agent.js</span>
      </div>
      
      <div className="space-y-0">
        {codeLines.slice(0, visibleLines).map((line, index) => (
          <div key={index} className="code-line">
            <span className="line-number">{index + 1}</span>
            <code className={`${getSyntaxHighlight(line)} ${
              index === currentTypingLine - 1 ? 'typing-cursor' : ''
            }`}>
              {line || '\u00A0'}
            </code>
          </div>
        ))}
      </div>
      
      {visibleLines < codeLines.length && (
        <div className="flex items-center gap-2 mt-4 text-neon-cyan">
          <div className="w-2 h-2 bg-neon-cyan rounded-full animate-glow-pulse"></div>
          <span className="text-sm">Agent is coding...</span>
        </div>
      )}
    </div>
  );
};

export default CodeDisplay;