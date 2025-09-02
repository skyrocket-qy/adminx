'use client';
import "./globals.css";
import Header from '@/app/components/header';
import LinkBar from '@/app/components/LinkBar';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showHeader, setShowHeader] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname == '/'){
      setShowHeader(true);
      return;
    }else{
      setShowHeader(false);
    }
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 20 || e.clientY > window.innerHeight - 20 || 
        e.clientX < 20 || e.clientX > window.innerWidth - 20) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    };

    // Optional: force hide once navigated if mouse not near top
    const handleLeaveTop = () => {
      if (window.scrollY > 0) {
        setShowHeader(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleLeaveTop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleLeaveTop);
    };
  }, [pathname]);

  return (
    <html lang="en" className="h-full bg-hover-200">
      <body className={`h-full ${pathname === '/cyberpunk' ? '' : 'overflow-hidden'}`}>
        <div className={`h-6 ${showHeader ? 'translate-y-0' : '-translate-y-full'}
          fixed top-0 left-0 w-full bg-white shadow z-50 transition-transform duration-500`}
        >
          <Header />
        </div>
        <div className={`flex h-full ${pathname === '/' ? '' : 'bg-pink-100'}`}>
          <main className={`w-full h-full ${pathname === '/' ? 
            'overflow-auto' : 
            (pathname === '/cyberpunk' ? 'overflow-auto' : 'overflow-hidden')}`}
          >
            {children}
          </main>
          <div className={`w-10 h-[95%] rounded-lg justify-center fixed right-0 top-10 shadow
            transition-transform duration-500 z-40 ${pathname === '/' ? 'bg-emerald-400' : ''}
            ${showHeader ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <LinkBar />
          </div>
        </div>
      </body>
    </html>
  );
}
