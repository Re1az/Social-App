import { NavLink } from "react-router";
import { Button } from "./ui/button.jsx";

export default function Header() { 
  return (
    <div className="bg-black text-white">
      <div className=" p-2 flex items-center justify-between " >
        <h1>Social App</h1>
        <nav className=" flex gap-5">
         <NavLink to="/login">
         <Button  className="p-5 border-none bg-white overflow-hidden  text-black hover:text-white  hover:bg-black">Login</Button></NavLink>
          
        <NavLink to="/register">
          <Button className="p-5 text-white bg-blue-500 hover:bg-white hover:text-black">Register</Button></NavLink>
        
        </nav>
      </div>
    </div>
  )
}