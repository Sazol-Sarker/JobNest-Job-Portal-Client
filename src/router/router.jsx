import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import { Profiler } from "react";
import Profile from './../components/Profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/profile',
        element:<Profile></Profile>
      }
    ],
  },
]);

export default router;
