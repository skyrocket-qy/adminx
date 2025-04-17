import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { Home, BarChart2, Settings } from 'lucide-react';

export const SideBar: React.FC = () => {
    const prefix = "/about"
    const links = [
      { href: prefix+"/info", label: "Info"},
      { href: prefix+"/school", label: "School" },
      { href: prefix+"/work", label: "Work" },
      { href: prefix+"/skill", label: "Skill" },
      { href: prefix+"/contact", label: "Contact" },
      { href: prefix+"/project", label: "Project" },
      { href: prefix+"/certificate", label: "Certificate" },
      { href: prefix+"/language", label: "Language" },
      { href: prefix+"/biography", label: "Biography" },
    ]
  return (
    <aside className="h-full w-full text-white flex flex-col items-center py-4 space-y-6">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="flex w-24 font-sans text-center items-center justify-center hover:border-b-4 
          hover:border-black hover:text-gray-800 text-sm m-2 h-16"
        >
          {link.label}
        </Link>
      ))}
    </aside>
  );
}