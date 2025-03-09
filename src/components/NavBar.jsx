import React, { useContext } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import AuthContext from "../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import JobNestLogo from "../assets/JobNestLogo.png";
const NavBar = () => {
  const { id } = useParams();
  // context data

  const { user, logOutUser } = useContext(AuthContext);
  // console.log("NAVBAR=>++", user?.photoURL, user?.displayName);
  // console.log("user NAVBAR =>",user);
  // console.log("user.emailVerified NAVBAR =>",user.emailVerified);
  const navigate = useNavigate();
  const location = useLocation();
  const isJobDetails = location.pathname === `/jobs/${id}`;

  // console.log("isJobDetails==>",isJobDetails);

  const handleGoBackToCategory = () => {
    navigate(-1);
  };
  // handleLogout
  const handleLogout = () => {
    logOutUser()
      .then(() => {
        // console.log("Signout successfull");
        // toast
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "warning",
          title: "Logged out successfully!",
        });
        navigate("/login");
      })
      .catch((error) => {
        // console.log("ERROR=>", error.code, error.message);
      });
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={"border-2 border-teal-300 m-4 text-[#05264E] font-medium"}
        >
          Home
        </NavLink>
      </li>
      {/* <li>
        <NavLink to="/register">Signup</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li> */}
      {user && (
        <li>
          {/* need t edit */}
          <NavLink
            to={`/userProfile`}
            className={
              "border-2 border-teal-300 m-4 text-[#05264E] font-medium"
            }
          >
            Profile
          </NavLink>
        </li>
      )}
      {isJobDetails && (
        <li onClick={handleGoBackToCategory}>
          <button
            className={
              "border-2 border-teal-300 m-4 text-[#05264E] font-medium"
            }
          >
            Go back to job category
          </button>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to="" className="btn btn-ghost text-xl">
          <img src={JobNestLogo} className="max-w-16" alt="" />
          {/* #A55A5A */}

          <h3 className="text-2xl text-teal-500">JobNest</h3>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <Link to="/userProfile" className="flex flex-col items-center mr-4">
              <img src={user.photoURL} alt="user" className="w-10 rounded-full border-2" />
              <p className="text-[#05264E] font-bold">{user.displayName}</p>
            </Link>
            <Link onClick={handleLogout} to="/login" className="btn">
              Log-out
            </Link>
          </>
        ) : (
          <ul className="flex gap-x-5">
            <button
              className={
                "border-2 border-teal-300 rounded-md m-4 py-1 px-3 text-[#05264E] font-medium"
              }
            >
              <NavLink to="/register">Signup</NavLink>
            </button>
            <button
              className={
                "border-2 border-teal-300 rounded-md m-4 py-1 px-3 text-[#05264E] font-medium"
              }
            >
              <NavLink to="/login">Login</NavLink>
            </button>
          </ul>
        )}
      </div>
    </div>
  );
};

export default NavBar;
