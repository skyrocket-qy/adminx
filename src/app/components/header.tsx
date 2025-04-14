'use client';
import Link from 'next/link';
// import head from '@/public/head.png';
import { useState } from 'react';
// import { AddVisitCount, loadVisitCount } from '@/utils/visit';


const Header: React.FC = () => {
  const [visitCount] = useState(234);

  // useEffect(() => {
  //   const fetchVisitCount = async () => {
  //     try {
  //       await AddVisitCount();
  //       const count = await loadVisitCount();
  //       setVisitCount(count);
  //     } catch (error) {
  //       console.error('Error loading visit count:', error);
  //     }
  //   }
  //   fetchVisitCount();
  // }, []);

  return (
    <header className="bg-violet-50 w-full font-semibold 
      text-lg border text-gray-600 pr-2 h-full flex flex-row items-center justify-center" 
    >
      <Link href="/" className="w-32 font-mono items-center text-center hover:border-b-4 justify-center 
        hover:border-black hover:text-gray-800"
      >
        Home
      </Link>
      <Link href="/blog" className="w-32 font-mono text-center items-center justify-center hover:border-b-4 
        hover:border-black hover:text-gray-800"
      > 
        Blog
      </Link>
      <Link href="/admin" className="w-32 text-center font-mono items-center hover:border-b-4 justify-center
       hover:border-black hover:text-gray-800"
      >
        Admin
      </Link>
      <div className="flex items-center ml-auto">
        <span className="text-gray-700 text-base">
          visit count: {visitCount}
        </span>
        {/* <div className="w-8 h-8 relative mr-2">
          <Image src='/head.png' alt="Head" fill sizes="24px 24px,24px" className="object-contain" />
        </div> */}
      </div>
    </header>
  );
};

export default Header;
