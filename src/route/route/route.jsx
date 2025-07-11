import { createBrowserRouter } from "react-router";
import mainLayout from "../mainLayout/mainLayout";
import Home from "../../page/Home/Home";
import Userlayout from "../UserLayout/Userlayout";
import Login from "../../page/userAuthentication/Login/Login";
import SignUp from "../../page/userAuthentication/SignUp/SignUp";
import DashboardLayout from "../Dashboard/DashboardLayout/DashboardLayout";
import DashboardHome from "../../page/DashboardPage/DashbordHome/DashboardHome";
import MyOrders from "../../page/DashboardPage/MyOrders/MyOrders";

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
// userlayout
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
  },

  // dashboard layout
  {
    path:'/dashboard',
    Component:DashboardLayout,
    children:[
      {
        index:true,
        element:<DashboardHome/>
      },
      {
        path:'my-orders',
        element:<MyOrders/>
      }
    ]
  }
]);

export default router;
