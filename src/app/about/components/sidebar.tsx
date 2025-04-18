import Link from 'next/link'
import {
  User,
  BookOpen,
  Briefcase,
  Settings,
  FolderKanban,
  Languages,
  FileText,
} from 'lucide-react'

export const SideBar: React.FC = () => {
  const prefix = '/about'
  const links = [
    { href: `${prefix}/info`, label: 'Info', icon: User },
    { href: `${prefix}/education`, label: 'Education', icon: BookOpen },
    { href: `${prefix}/experience`, label: 'Experience', icon: Briefcase },
    { href: `${prefix}/skill`, label: 'Skill', icon: Settings },
    { href: `${prefix}/project`, label: 'Project', icon: FolderKanban },
    { href: `${prefix}/language`, label: 'Language', icon: Languages },
    { href: `${prefix}/biography`, label: 'Biography', icon: FileText },
  ]

  return (
    <aside className="h-full w-full text-white flex flex-col items-center py-4 space-y-6">
      {links.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className="flex flex-col items-center justify-center w-24 text-xs font-sans text-center m-2 
            h-18 transition-transform hover:scale-130 hover:text-cyan-300"
        >
          <Icon size={20} className="mb-1 " />
          {label}
        </Link>
      ))}
    </aside>
  )
}
