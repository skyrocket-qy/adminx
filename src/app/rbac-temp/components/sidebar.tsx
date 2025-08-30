// app/components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const items = [
  { label: "Dashboard", href: "/rbac" },
  { label: "Search Job", href: "/rbac/searchjob" },
  /* … */
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true) }, []);

  return (
    <aside className="w-64 bg-purple-700 text-white h-screen p-6 space-y-6">
      <div className="text-2xl font-bold">Jobie</div>
      <nav className="space-y-3">
        {items.map((it) => {
          const isActive = mounted && pathname === it.href;
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`block px-4 py-2 rounded-lg hover:bg-purple-600 transition ${
                isActive ? "bg-white text-purple-700" : ""
              }`}
            >
              {it.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
