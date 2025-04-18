'use client';
import {SideBar} from './components/sidebar';
import {Header} from './components/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full bg-cyan-900 p-10 ps-20 pr-20">
        <div className="h-full w-full bg-[#4C7283] rounded-3xl flex flex-col pb-4 pr-4">
            <div className='h-24 w-full'><Header /></div>
            <div className='flex flex-1 overflow-hidden'>
                <div className='w-28 h-full'>
                    <SideBar />
                </div>
                <main className='bg-neutral-50 w-full flex-1 rounded-2xl'>
                    {children}
                </main>
            </div>
        </div>
    </div>
  );
}
