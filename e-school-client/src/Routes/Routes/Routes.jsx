import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import Login from "../../Pages/Login/Login";
import FAQPage from "../../Pages/FAQ/FAQPage";

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
        path: "/faq",
        element: <FAQPage></FAQPage>,
      },
    ],
  },
]);

export default router;
