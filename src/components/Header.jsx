import { useSelector } from "react-redux";
import { NavLink } from "react-router";
import { Button } from "./ui/button.jsx";
import { userSlice } from "../features/user/userSlice.js";

export default function Header() {
  const{user}=useSelector((state)=>state.userSlice)

  return (
    <div className="bg-black text-white">
      {user &&( 
        <div className=" p-2 flex justify-center">
        <h1>Social App</h1>
      </div>
    )}

        {!user && (
          <div className="p-2 flex items-center justify-between">
            <h1>Social App</h1>
          <nav className="flex gap-5">
            <NavLink to="/login">
              <Button className="p-5 bg-white text-black hover:text-white hover:bg-black">
                Login
              </Button>
            </NavLink>

            <NavLink to="/register">
              <Button className="p-5 text-white bg-blue-500 hover:bg-white hover:text-black">
                Register
              </Button>
            </NavLink>
          </nav>
        </div>
        )}
      </div>
  );
}