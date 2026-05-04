import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Search,
  PlusSquare,
  User
} from "lucide-react";
import Logout from "../features/auth/Logout.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./ui/dropdown-menu.jsx";

export default function AppSidebar() {
  const nav = useNavigate();

  const linkClass =
    "flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition";

  const mobileLinkClass = ({ isActive }) =>
    `p-2 ${isActive ? "text-blue-500" : ""}`;

  return (
    <>
      {/* ✅ DESKTOP SIDEBAR */}
      <div className="hidden md:flex h-full w-64 bg-white dark:bg-black text-black dark:text-white flex-col justify-between p-4 border-r">
        
        <div>
          <h1 className="text-2xl font-bold mb-8">SocialApp</h1>

          <nav className="flex flex-col gap-2">
            <NavLink to="/" className={linkClass}>
              <Home size={22} />
              <span>Home</span>
            </NavLink>

            <NavLink to="/search" className={linkClass}>
              <Search size={22} />
              <span>Search</span>
            </NavLink>

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

        {/* Account dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="mb-10 flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <User size={22} />
              <span>Account</span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-55">
            <DropdownMenuGroup className="text-center">
              <DropdownMenuItem onClick={() => nav("/updateprofile")}>
                Update Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => nav("/changepassword")}>
                Change Password
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* ✅ MOBILE BOTTOM NAVBAR */}
      {/* <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-black border-t flex justify-around items-center p-2 md:hidden z-[999]">

        <NavLink to="/" className={mobileLinkClass}>
          <Home size={24} />
        </NavLink>

        <NavLink to="/search" className={mobileLinkClass}>
          <Search size={24} />
        </NavLink>

        <NavLink to="/create" className={mobileLinkClass}>
          <PlusSquare size={24} />
        </NavLink>

        <NavLink to="/profile" className={mobileLinkClass}>
          <User size={24} />
        </NavLink>

      </div> */}
    </>
  );
}