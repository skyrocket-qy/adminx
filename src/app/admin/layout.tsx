'use client';
import SideNav from './sidenav';

export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-violet-100 to-violet-200">
      {/* Sidebar */}
      <aside className="w-[16%] h-full bg-violet-50 shadow-md border-r border-violet-200 pb-0 p-4">
        <SideNav />
      </aside>

      {/* Main content area */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="flex items-center justify-end h-11 px-4 pt-5">
          <img
            className="w-10 h-10 rounded-full border-2 border-violet-300 shadow-sm hover:shadow-md transition"
            src="/user.png"
            alt="User"
          />
        </header>

        {/* Main Content */}
        <section className="flex-1 overflow-auto p-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 h-full">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
}
