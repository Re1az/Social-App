import { useNavigate } from "react-router";

import { useDispatch } from "react-redux";
import { removeUser } from "../user/userSlice.js";
import { useLogoutUserMutation } from "./authApi.js";
import { LogOutIcon } from "lucide-react";


export default function Logout() {
  const[data,{isLoading}]=useLogoutUserMutation(); 
   const nav=useNavigate();
   const diaptch=useDispatch();
   const handleLogout=async()=>{
    try{
      await data().unwrap();
      diaptch(removeUser());
      nav('/login');
    }catch(err){
      console.log(err);
     
   }
  }

  return (
  
    <div onClick={handleLogout} className= "flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer text-red-500" >
      <LogOutIcon   />
      <span>Logout</span>
    </div>
  )
}