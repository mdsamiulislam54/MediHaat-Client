import { createBrowserRouter } from "react-router";
import mainLayout from "../mainLayout/mainLayout";
import Home from "../../page/Home/Home";
import Userlayout from "../UserLayout/Userlayout";
import Login from "../../page/userAuthentication/Login/Login";
import SignUp from "../../page/userAuthentication/SignUp/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    Component: mainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },

  {
    path:'/',
    Component:Userlayout,
    children:[
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/signup',
        element:<SignUp/>
      }
    ]
  }
]);

export default router;
