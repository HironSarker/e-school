import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import FAQPage from "../../Pages/FAQ/FAQPage";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";
import Navbar from "../../Pages/Shared/Navbar/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <></>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/faq",
        element: <FAQPage></FAQPage>,
      },
      {
        path: "/nav",
        element: <Navbar></Navbar>,
      },
    ],
  },
]);

export default router;
