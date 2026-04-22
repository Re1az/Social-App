import { NavLink } from "react-router";
import { Button } from "./ui/button.jsx";

export default function Header() { 
  return (
    <div className="bg-black text-white">
      <div className=" p-2 flex items-center justify-between " >
        <h1>Social App</h1>
        <nav className=" flex gap-5">
         <NavLink to="/login">
         <Button variant="outline" className="p-5 overflow-hidden text-white bg-transparent hover:bg-white hover:text-black">Login</Button></NavLink>
          
        <NavLink to="/register">
          <Button className="p-5 text-white bg-blue-500 hover:bg-white hover:text-black">Signup</Button></NavLink>
        
        </nav>
      </div>
    </div>
  )
}