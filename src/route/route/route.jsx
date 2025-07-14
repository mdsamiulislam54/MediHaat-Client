import { createBrowserRouter } from "react-router";
import mainLayout from "../mainLayout/mainLayout";
import Home from "../../page/Home/Home";
import Userlayout from "../UserLayout/Userlayout";
import Login from "../../page/userAuthentication/Login/Login";
import SignUp from "../../page/userAuthentication/SignUp/SignUp";
import DashboardLayout from "../Dashboard/DashboardLayout/DashboardLayout";
import DashboardHome from "../../page/DashboardPage/DashbordHome/DashboardHome";

import Addmedicine from "../../page/DashboardPage/SellerPage/Addmedicine/Addmedicine";
import Mymedicine from "../../page/DashboardPage/SellerPage/Mymedicine/Mymedicine";
import AdvertiseRequest from "../../page/DashboardPage/SellerPage/AdvertiseRequest/AdvertiseRequest";
import Shop from "../../page/Shop/Shop";
import MedicineDetails from "../../page/Shop/MedicineDetails";
import Cart from "../../page/CartItem/Cart";
import Checkout from "../../page/Checkout/Checkout";
import PaymentSuccess from "../../page/PaymentSuccess/PaymentSuccess";
import PaymentHistory from "../../page/DashboardPage/UserDashboard/PaymentHistory/PaymentHistory";
import SellerPaymentHistory from "../../page/DashboardPage/SellerPage/SellerPaymentHistory/SellerPaymentHistory";
import ManageUsers from "../../page/AdminDashboardPage/ManageUsers/ManageUsers";


const router = createBrowserRouter([
  {
    path: "/",
    Component: mainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path:'/shop',
        Component:Shop
      },
      {
        path:'/medicine-details/:id',
        element:<MedicineDetails/>
      },
      {
        path:'/cart-page',
        element:<Cart/>
      },
      {
        path:'/checkout',
        element:<Checkout/>
      },
      {
        path:'/order-success',
        element:<PaymentSuccess/>
      }

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
        // user route
        {
          path:'user/payment-history',
          element:<PaymentHistory/>
        },
        // seller route
        {
          path:'seller/add-medicine',
          element:<Addmedicine/>
        },
        {
          path:'seller/my-medicine',
          element:<Mymedicine/>
        },
        {
          path:'seller/advertise-request',
          element:<AdvertiseRequest/>
        },
        {
          path:'seller/payment-history',
          element:<SellerPaymentHistory/>
        },

        // admin route
        {
          path:'/dashboard/manage-users',
          element:<ManageUsers/>
        }

    ]
  }
]);

export default router;
