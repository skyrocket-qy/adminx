'use client';
import SideNav from './sidenav';
import { UserAvatarMenu } from './header';

export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full overflow-hidden bg-gradient-to-br from-violet-100 to-violet-200">
      {/* Sidebar */}
      <aside className="w-[14%] min-w-[210px] h-full bg-violet-50 shadow-md border-r border-violet-200 p-2">
        <SideNav />
      </aside>

      <main className="flex-1 flex flex-col h-full p-1">
        {children}
      </main>
    </div>
  );
}
