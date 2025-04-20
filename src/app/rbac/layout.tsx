import {
    LayoutDashboard,
    Share2,
    Share,
    Users,
    FileText,
    Settings,
  } from "lucide-react";
  
  const menuItems = [
    { href: "/rbac/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/rbac/relation", label: "Relation", icon: Share2 },
    { href: "/rbac/graph", label: "Graph", icon: Share },
    { href: "/rbac/user", label: "User", icon: Users },
    { href: "/rbac/log", label: "Log", icon: FileText },
    { href: "/rbac/setting", label: "Setting", icon: Settings },
  ];
  
  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="flex h-screen bg-neutral-50 text-gray-900 p-4">
        {/* Sidebar */}
        <aside className="w-64 bg-[#4DCBFE] p-6 space-y-4 shadow-md rounded-3xl">
          <h2 className="mt-6 mb-16 text-3xl text-center font-bold text-white">AuthZ</h2>
          <nav className="space-y-2">
            {menuItems.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                className="m-3 p-3 flex items-center gap-3 text-violet-50 hover:text-purple-600 hover:bg-violet-100 
                  rounded transition-colors duration-200 text-lg hover:rounded-3xl"
              >
                <Icon className="w-5 h-5" />
                <span className="flex-1 text-center">{label}</span>
              </a>
            ))}
          </nav>
        </aside>
  
        {/* Main Content */}
        <main className="flex-1 p-8 bg-amber-200">
            {children}
        </main>
      </div>
    );
  }
  