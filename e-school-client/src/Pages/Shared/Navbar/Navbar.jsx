import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth/useAuth";
import useCurrUser from "../../../Hooks/useCurrUser/useCurrUser";
import Avatar from "./Avatar";

const Navbar = () => {
  const { user, logOut } = useAuth();
  // console.log(user);
  const [{ profilePicture }] = useCurrUser();
  const navigate = useNavigate();

  // console.log(currUserInfo);
  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const menuItems = (
    <>
      <li>
        <Link to="/" className=" text-base font-medium">
          Home
        </Link>
      </li>
      <li>
        <Link to="/all-courses" className=" text-base font-medium">
          Courses
        </Link>
      </li>
      <li>
        <Link to="/blog" className=" text-base font-medium">
          Blog
        </Link>
      </li>
      <li>
        <Link to="/faq" className=" text-base font-medium">
          FAQ
        </Link>
      </li>
      <li>
        <Link to="/about" className=" text-base font-medium">
          About
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 drop-shadow-lg px-5 z-10 fixed">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          E-School
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menuItems}</ul>
      </div>
      <div className="navbar-end">
        {user?.uid ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-8 h-8 rounded-full">
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt=""
                    className="w-full object-cover"
                  />
                ) : (
                  <Avatar></Avatar>
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {/* <li><Link to={`/user-profile/${currentUser?._id}`}>Profile</Link></li> */}
              <li>
                <Link to="/user-profile">Profile</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="" onClick={handleLogOut}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <Link to="/login" className="btn">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
