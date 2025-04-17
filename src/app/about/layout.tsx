'use client';
import {SideBar} from './components/sidebar';
import {Header} from './components/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full bg-cyan-900 p-10 ps-20 pr-20">
    <div className="h-full w-full bg-cyan-700 rounded-3xl flex flex-col pt-0">
        <div className='h-24 w-full'><Header /></div>
        <div className='flex flex-row h-full w-full'>
            <div className='w-28 h-full'>
                <SideBar />
            </div>
            <div className='bg-white w-full h-auto rounded-2xl mb-4 mr-4 overflow-y-auto'>
                {children}
            </div>
        </div>
    </div>
    </div>
  );
}
