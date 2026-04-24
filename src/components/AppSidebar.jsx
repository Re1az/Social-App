import { NavLink } from "react-router";
import {
  Home,
  Search,
  PlusSquare,
  User,
  LogOut
} from "lucide-react";
import Logout from "../features/auth/Logout.jsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu.jsx";
  

export default function AppSidebar() {
  const linkClass =
    "flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition";

  return (
    <div className=" h-screen w-64 border-r bg-white dark:bg-black text-black dark:text-white flex flex-col justify-between p-4 ">
      
    <div>
        <h1 className="text-2xl font-bold mb-8">SocialApp</h1>
        <nav className="flex  flex-col gap-2">
        <NavLink to="/" className={linkClass}>
          <Home size={22} />
          <span>Home</span>
        </NavLink>

        <NavLink to="/search" className={linkClass}>
          <Search size={22} />
          <span>Search</span>
        </NavLink>

        {/* <NavLink to="/messages" className={linkClass}>
          <MessageCircle size={22} />
          <span>Messages</span>
        </NavLink>

        <NavLink to="/notifications" className={linkClass}>
          <Heart size={22} />
          <span>Notifications</span>
        </NavLink> */}

        <NavLink to="/create" className={linkClass}>
          <PlusSquare size={22} />
          <span>Create</span>
        </NavLink>

        <NavLink to="/profile" className={linkClass}>
          <User size={22} />
          <span>Profile</span>
        </NavLink>

        <Logout />
        
      </nav>
    </div>
      {/* Logo */}
      

      {/* Navigation */}
     
        <DropdownMenu >
          <DropdownMenuTrigger asChild>
            <button className="mb-10 flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition hover:cursor-pointer">
              <User size={22} />
              <span>Account</span>
            </button>
          </DropdownMenuTrigger>
           <DropdownMenuContent className="w-55">
        <DropdownMenuGroup className="text-center" >
          <DropdownMenuItem className="hover:cursor-pointer px-10 ">Update Profile</DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer px-10  ">Change Password</DropdownMenuItem>
          
        </DropdownMenuGroup>
        
      </DropdownMenuContent>
         </DropdownMenu>
     
         
      {/* Bottom section */}
     
    </div>
  );
}