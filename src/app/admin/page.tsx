'use client';
import { lusitana } from '@/global/fonts';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('session')) {
      router.push('/auth');
    } else {
      setIsAuthenticated(true); 
    }
  }, [router]);

  if (isAuthenticated === null) {
    return null; 
  }

  return (
    <main className='h-full w-full'>
      <div className='w-full h-full'>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        </h1>
      </div>
    </main>
  );
}
