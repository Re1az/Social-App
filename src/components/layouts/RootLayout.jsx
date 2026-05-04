import { Outlet } from "react-router-dom";
import Header from "../Header.jsx";
import AppSidebar from "../AppSidebar.jsx";
import { useSelector } from "react-redux";
import MobileNavbar from "../MobileNavbar.jsx";

export default function RootLayout() {
  const{user}=useSelector((state)=>state.userSlice);
  return (
    <div className="h-screen flex flex-col ">

      {/* Header */}
      <Header />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden ">

        {/* Sidebar (fixed, no scroll) */}
        {user && (
          <div className="hidden md:block w-64 border-r">

          <AppSidebar />
        </div>
        )}
        
        

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto ">
          <Outlet />
        </main>

      </div>
      {user && (
        <div className="">
          <MobileNavbar />
        </div>
      )}
    </div>
  );
}