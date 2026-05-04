import { NavLink, useNavigate } from "react-router-dom";
import { Home, Search, PlusSquare, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./ui/dropdown-menu.jsx";
import Logout from "../features/auth/Logout.jsx";

export default function MobileNavbar() {
  const nav = useNavigate();

  const linkClass = ({ isActive }) =>
    `flex flex-col items-center text-xs ${
      isActive ? "text-blue-500" : ""
    }`;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-black border-t flex justify-around items-center py-2 md:hidden z-[999]">

      <NavLink to="/" className={linkClass}>
        <Home size={22} />
        Home
      </NavLink>

      <NavLink to="/search" className={linkClass}>
        <Search size={22} />
        Search
      </NavLink>

      <NavLink to="/create" className={linkClass}>
        <PlusSquare size={22} />
        Create
      </NavLink>

      <NavLink to="/profile" className={linkClass}>
        <User size={22} />
        Profile
      </NavLink>

      {/* ACCOUNT MENU */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex flex-col items-center text-xs">
            <User size={22} />
            More
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup className="text-center">

            <DropdownMenuItem onClick={() => nav("/updateprofile")}>
              Update Profile
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => nav("/changepassword")}>
              Change Password
            </DropdownMenuItem>

            
              <Logout />
            

          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

    </div>
  );
}