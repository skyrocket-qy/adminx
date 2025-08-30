import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { LogOut, User, Settings } from "lucide-react"

export function UserAvatarMenu() {
  return (
    <header className="flex items-center justify-end h-8 px-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="rounded-full border-1 border-violet-300 shadow-sm 
            hover:shadow-md transition focus:outline-none">
            <img
              src="/user.png"
              alt="User avatar"
              // className="w-8 h-8 rounded-full object-cover"
              className="
                w-8 h-8 rounded-full object-cover border border-violet-300 shadow-sm
                transition
                hover:bg-violet-500
                group-hover:scale-120
                group-hover:shadow-md 
                group-hover:ring-2 
                group-hover:ring-violet-400
              "
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
