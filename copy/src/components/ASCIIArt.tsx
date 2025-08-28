const ASCIIArt = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20 z-0">
      {/* Top ASCII decorations */}
      <div className="absolute top-20 left-10 ascii-art text-neon-purple text-xs animate-glow-pulse">
        {`    H
   .XX.
   XHHX
  OHHX.HHH
  OHHO.HHH
  OHHX.HHH
  KHHG..etc.`}
      </div>
      
      <div className="absolute top-16 right-20 ascii-art text-neon-yellow text-xs animate-float">
        {`K
I
.
     :MHH
:MHH
:MHH
.LXHHHKKKHMH:LXHMM.KOO.
.MHH..etc.    :XOHHMH.
         :etc:`}
      </div>
      
      {/* Side decorations */}
      <div className="absolute left-4 top-1/2 ascii-art text-neon-cyan text-xs rotate-90 origin-center">
        {`KKKHHX.`}
      </div>
      
      <div className="absolute right-4 top-1/3 ascii-art text-neon-pink text-xs">
        {`H
M
M
K`}
      </div>
      
      {/* Bottom corner */}
      <div className="absolute bottom-20 left-16 ascii-art text-neon-purple text-xs animate-glow-pulse">
        {`:etc:`}
      </div>
      
      {/* Matrix rain effect */}
      <div className="absolute top-0 left-1/4 text-neon-cyan text-xs animate-matrix-rain opacity-30">
        {`1010101\n0101010\n1010101\n0101010`}
      </div>
      
      <div className="absolute top-0 right-1/3 text-neon-purple text-xs animate-matrix-rain opacity-30" style={{animationDelay: '1s'}}>
        {`X.H.M.K\n.M.K.X.\nH.X.M.H\n.K.H.X.`}
      </div>
    </div>
  );
};

export default ASCIIArt;