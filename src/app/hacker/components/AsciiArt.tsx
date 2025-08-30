const AsciiArt = () => {
  const skull = `
    <pre class="text-green-500 text-xs font-mono">
      {"        .--.                   .--."}
      {"       /..  '.               .'  ..\\"}
      {"      /.'    '.             .'    '.\\"}
      {"     /.'       '.         .'       '.\\"}
      {"    /.'          '.     .'          '.\\"}
      {"   /.'             '. .'             '.\\"}
      {"  /.'               ' '               '.\\"}
      {" /.'                                   '.\\"}
      {"/.'                                     '.\\"}
      {"==========================================="}
      {" '.                                     .'"}
      {"  '.                                   .'"}
      {"   '.                                 .'"}
      {"    '.                               .'"}
      {"     '.                             .'"}
      {"      '.                           .'"}
      {"       '.                         .'"}
      {"        '.                       .'"}
      {"         '.                     .'"}
      {"          '.                   .'"}
      {"           '.                 .'"}
      {"            '.               .'"}
      {"             '.             .'"}
      {"              '.           .'"}
      {"               '.         .'"}
      {"                '.       .'"}
      {"                 '.     .'"}
      {"                  '.   .'"}
      {"                   '. ."}
      {"                    '"}
    </pre>
  `;

  return (
    <div
      className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      dangerouslySetInnerHTML={{ __html: skull }}
    />
  );
};

export default AsciiArt;
