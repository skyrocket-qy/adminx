'use client';
import SideNav from './sidenav';

export const experimental_ppr = true;
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <div className={`w-[20%] h-full`}>
        <SideNav />
      </div>
      <div className='w-full bg-violet-200'>
        <div className='w-full h-7'>
          <div className='my-2 w-7 h-full ml-auto mr-2'>
            <img className='' src='/user.png'></img>
          </div>
        </div>
        <section className='ml-8 mr-8 my-3 h-[88%] rounded-xl bg-violet-50'>{children}</section>
      </div>
    </div>
  );
}