
import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./components/layouts/RootLayout.jsx";
import Home from "./features/Home/Home.jsx";
import { Login } from "./features/auth/Login.jsx";
import { Register } from "./features/auth/Register.jsx";
import Logout from "./features/auth/Logout.jsx";
import UserProfile from "./features/user/UserProfile.jsx";
import CreatePost from "./features/post/CreatePost.jsx";

export default function App() {
  const router=createBrowserRouter([
    {
      path:'/',
      element:<RootLayout/>,
      children:[
        {
        index:true,
        element:<Home/>
        },
        {
          path:'login',
          element:<Login/>
        },
        {
          path:'register',
          element:<Register/>
        },
        {
          path:'logout',
          element:<Logout/>
        },
        {
          path:'profile',
          element:<UserProfile/>
        },{
          path:'create',
          element:<CreatePost/>
        }
      ]
    }
  ])
  return (
        <RouterProvider router={router}/>
  )
}