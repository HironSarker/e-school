import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../../Layout/Dashboard";
import Main from "../../Layout/Main";
import AllCourses from "../../Pages/AllCourses/AllCourses/AllCourses";
import Classroom from "../../Pages/Classroom/Classroom/Classroom";
import CourseDetails from "../../Pages/CourseDetails/CourseDetails/CourseDetails";
import CourseCart from "../../Pages/Dashboard/CourseCart/CourseCart";
import Courses from "../../Pages/Dashboard/Courses/Courses";
import CreateCourse from "../../Pages/Dashboard/Courses/CreateCourse";
import EnrolledCourses from "../../Pages/Dashboard/EnrolledCourses/EnrolledCourses";
import Payment from "../../Pages/Dashboard/Payment/Payment/Payment";
import UserDetails from "../../Pages/Dashboard/Users/UserDetails";
import Users from "../../Pages/Dashboard/Users/Users";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import FAQPage from "../../Pages/FAQ/FAQPage";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";
import UpdateUserProfile from "../../Pages/UserProfile/UpdateUserProfile";
import UserProfile from "../../Pages/UserProfile/UserProfile";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/user-profile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "/update-profile/:id",
        element: <UpdateUserProfile></UpdateUserProfile>,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/users/${params.id}`),
      },
      {
        path: "/faq",
        element: <FAQPage></FAQPage>,
      },
      {
        path: "/all-courses",
        element: <AllCourses></AllCourses>,
      },
      {
        path: "/all-courses/:id",
        element: <CourseDetails></CourseDetails>,
      },

      {
        path: "/classroom",
        element: <Classroom></Classroom>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "manage-users",
        element: <Users></Users>,
      },

      {
        path: "user-details/:id",
        element: <UserDetails></UserDetails>,
      },

      {
        path: "create-course",
        element: <CreateCourse></CreateCourse>,
      },

      {
        path: "manage-courses",
        element: <Courses></Courses>,
      },

      {
        path: "course-cart",
        element: <CourseCart></CourseCart>,
      },

      {
        path: "enrolled-courses",
        element: <EnrolledCourses></EnrolledCourses>,
      },

      {
        path: "payment/:id",
        element: <Payment></Payment>,
      },
    ],
  },
]);

export default router;
