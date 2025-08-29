'use client';
const Footer = () => {
  return (
    <footer className="py-8 px-6 bg-black border-t border-green-500/50 text-green-500 font-mono z-20 relative">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          <span className="text-gray-500">Last login: {new Date().toString()} on ttys001</span>
        </p>
        <p className="mt-2">
          <span className="text-red-500">[root@localhost ~]</span># <span className="animate-ping">_</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
