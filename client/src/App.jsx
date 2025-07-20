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
      { path: "/cart", element: <Cartpage /> }
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
