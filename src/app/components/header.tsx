'use client';
import Link from 'next/link';
// import head from '@/public/head.png';
// import { useState } from 'react';
// import { AddVisitCount, loadVisitCount } from '@/utils/visit';


const Header: React.FC = () => {

  return (
    <header className={`bg-black h-full w-full font-semibold 
      text-sm text-white flex flex-row items-center justify-center`} 
    >
    {[
      { href: "/", label: "Home" },
      { href: "/about/info", label: "About"},
      { href: "/blog", label: "Blog" },
      { href: "/admin", label: "Admin" },
      { href: "/cyberpunk", label: "Cyberpunk" },
      { href: "/Animated", label: "Animated" },
      { href: "/auth", label: "Auth" },
      { href: "/glass", label: "Glass" },
      { href: "/hacker", label: "Hacker" },
    ].map(({ href, label }) => (
      <Link
        key={href}
        href={href}
        className="w-24 font-sans text-center items-center justify-center hover:border-b-4 
        hover:border-black hover:text-gray-800"
      >
        {label}
      </Link>
    ))}
      <div className="flex items-center ml-auto mr-2">
        <span className="text-white font-sans">
          Jimmy Huang
        </span>
      </div>
    </header>
  );
};

export default Header;
