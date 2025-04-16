'use client'
import NavLinks from './nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
// import { lusitana } from '@/global/fonts';
import { useRouter } from 'next/navigation';

export default function SideNav() {
  const router = useRouter();
  return (
    <div className="flex h-full flex-col px-2 py-2 bg-violet-50">
      {/* <div className="w-full">
        <p className="text-[24px] text-center">Admin</p>
      </div> */}
      <div className="overflow-y-auto bg-violet-50">
        <NavLinks />
      </div>
      <div className="mt-auto h-20 bg-violet-50">
        <form
          action={async () => {
            localStorage.removeItem('session');
            router.push('/auth');
          }}
        >
          <button className="flex h-[48px] w-full items-center justify-center rounded-md 
            bg-violet-50 p-3 hover:bg-sky-100 hover:text-blue-600"
          >
            <PowerIcon className="w-6" />
            <div className="hidden md:block text-sm font-medium">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
