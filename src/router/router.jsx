import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import { Profiler } from "react";
import Profile from "./../components/Profile";
import Home from "../pages/Home/Home";
import HotJobCategoryCard from "../components/HotJobCategoryCard";
import HotJobsLayout from "../layout/HotJobsLayout";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "",
        element: <Home></Home>,
        children: [
          {
            path: "",
            // loader:()=>fetch("http://localhost:5000/hotJob/Engineering"),
            element: <Navigate to={`/hotJob/Engineering`}></Navigate>,
          },
        ],
      },

      {
        path: "/hotJob/:category",
        loader: ({ params }) =>fetch(`http://localhost:5000/hotJob/${params.category}`),
        element: <HotJobsLayout></HotJobsLayout>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/profile",
        element: <PrivateRoutes><Profile></Profile></PrivateRoutes>,
      },
    ],
  },
]);

export default router;
