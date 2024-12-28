import { NavLink, Outlet } from "react-router-dom";
import useCurrUser from "../Hooks/useCurrUser/useCurrUser";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const Dashboard = () => {
  const [currUserInfo] = useCurrUser();

  return (
    <div>
      <Navbar></Navbar>
      <div className="pt-20 flex">
        <aside
          id="default-sidebar"
          className="w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-[#abada9e6] dark:bg-gray-800">
            <ul className="space-y-2 min-h-full font-medium">
              {currUserInfo?.role === "admin" && (
                <>
                  <li>
                    <NavLink to="/dashboard/manage-users">All Users</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/create-course">
                      Create Course
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/manage-courses">
                      All Courses
                    </NavLink>
                  </li>
                </>
              )}

              {currUserInfo?.role === "instructor" && (
                <>
                  <li>
                    <NavLink to="/dashboard/course-list">Course List</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard">Blog List</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard">Write Blog</NavLink>
                  </li>
                </>
              )}

              {currUserInfo?.role === "learner" && (
                <>
                  <li>
                    <NavLink to="/dashboard/course-cart">Course Cart</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/enrolled-courses">
                      Enrolled Courses
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </aside>

        <div className="flex-1">
          <button
            data-drawer-target="default-sidebar"
            data-drawer-toggle="default-sidebar"
            aria-controls="default-sidebar"
            type="button"
            className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <Outlet />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Dashboard;
