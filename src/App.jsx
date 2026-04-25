
import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./components/layouts/RootLayout.jsx";
import Home from "./features/Home/Home.jsx";
import { Login } from "./features/auth/Login.jsx";
import { Register } from "./features/auth/Register.jsx";
import Logout from "./features/auth/Logout.jsx";
import UserProfile from "./features/user/UserProfile.jsx";
import CreatePost from "./features/post/CreatePost.jsx";
import UpdateProfile from "./features/user/UpdateProfile.jsx";
import Comment from "./features/comment/Comment.jsx";
import SinglePost from "./features/post/SinglePost.jsx";
import AnyuserProfile from "./features/user/AnyuserProfile.jsx";

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
        },
        {
          path:"updateprofile",
          element:<UpdateProfile/>
        },
        {
          path:"comment/:id",
          element:<Comment/>
        },
        {
          path:"/post/:id",
          element:<SinglePost/>

        },
        {
          path:"profile/:id",
          element:<AnyuserProfile/>
        }
      ]
    }
  ])
  return (
        <RouterProvider router={router}/>
  )
}