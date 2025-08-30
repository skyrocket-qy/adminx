import '../hacker.css';

interface GlitchTextProps {
  children: React.ReactNode;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ children, className }) => {
  return (
    <div className={`glitch ${className}`} data-text={children}>
      {children}
    </div>
  );
};

export default GlitchText;
