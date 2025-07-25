import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import MainLayoutpage from "./pages/MainLayoutpages";
import AuthLayout from "./pages/Auth pages/AuthLayout";
import Login from "./pages/Auth pages/Login";
import Signup from "./pages/Auth pages/Signup";
import VerifyCode from "./pages/Auth pages/VerifyCode";
import ForgotPassword from "./pages/Auth pages/ForgotPassword";
import ForgotPasswordCode from "./pages/Auth pages/ForgotPasswordCode";
import ResetPassword from "./pages/Auth pages/ResetPassword";
import Homepage from "./pages/CommonPages/Homepage/Homepage";
import Product_details_main from "./pages/CommonPages/Productdetails/Product_details_main";
import Catagorypage from "./pages/CommonPages/Catagoey/Catagorypage";
import Cartpage from "./pages/CommonPages/Cart/Cartpage";
import AccountPage from "./pages/CommonPages/Account/Accountpage";
import FilterLayout from "./pages/CommonPages/Filter/FilterLayout";
import Likepage from "./pages/CommonPages/Like/Likepage";
import AdminLayout from "./pages/Admin pages/AdminLayout";
import Admin_dashboard from "./pages/Admin pages/Admin_dashboard";
import Admin_product_list from "./pages/Admin pages/Admin_product_list";
import Admin_pending_list from "./pages/Admin pages/Admin_pending_list";
import Admin_process_list from "./pages/Admin pages/Admin_process_list";
import Admin_delivered from "./pages/Admin pages/Admin_delivered";
import Admin_complete_list from "./pages/Admin pages/Admin_complete_list";
import Admin_suggested_list from "./pages/Admin pages/Admin_suggested_list";
import Admin_popular_list from "./pages/Admin pages/Admin_popular_list";
import Admin_rejected_list from "./pages/Admin pages/Admin_rejected_list";
import Admin_selling_list from "./pages/Admin pages/Admin_selling_list";
import Admin_category from "./pages/Admin pages/Admin_category";
import Admin_users from "./pages/Admin pages/Admin_users";
import Admin_banner_ads from "./pages/Admin pages/Admin_banner_ads";
import Admin_product_details from "./pages/Admin pages/Admin_product_details";
import Admin_product_view from "./pages/Admin pages/Admin_product_view";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayoutpage/>,
    children: [
      { 
        path: "auth", element:<AuthLayout/> ,  
        children : [
            { path: "login", element: <Login /> }, 
            { path: "signup", element: <Signup /> },
            { path: "verify-code", element:<VerifyCode/>},
            { path: "forgot-password", element:<ForgotPassword/>},
            { path: "verify-forgot-verify-code", element:<ForgotPasswordCode/>},
            { path: "reset-password", element:<ResetPassword/>}
        ]
      },
      { path :"", element : <Homepage/> },
      { path : "/product_details/:productId", element:<Product_details_main/>},
      { path : "/product/:category", element: <Catagorypage /> } ,
      { path : "/cart", element: <Cartpage /> },
      { path : "/like", element: <Likepage/>},
      { path : "/account", element : <AccountPage/>},
      { path : "/filter", element : <FilterLayout/>,},



      { path : "/control", element :<AdminLayout/>,
        children : [
          { path : "" , element: <Admin_dashboard/>},
          { path : "product_list" , element: <Admin_product_list/>},
          { path : "product_list/:productId", element:<Admin_product_details/>},
          { path : "pending_list" , element: <Admin_pending_list/>},
          { path : "proceing_list" , element: <Admin_process_list/>},
          { path : "delivered_list" , element: <Admin_delivered/>},
          { path : "completed_list" , element: <Admin_complete_list/>},
          { path : "rejected_list" , element: <Admin_rejected_list/>},
          { path : "popular" , element: <Admin_popular_list/>}, //=================same
          { path : "popular/view/:productId", element : <Admin_product_view/>},
          { path : "suggested" , element: <Admin_suggested_list/>},
          { path : "best_selling" , element: <Admin_selling_list/>},
          { path : "catagory_band" , element: <Admin_category/>},
          { path : "users" , element: <Admin_users/>},
          { path : "banner_ads" , element: <Admin_banner_ads/>},
        ]
      }
    ]
  }
]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
