import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";
import AuthProvider from "./context/AuthContext/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";
import JobsProvider from "./context/JobsContext/JobsProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <JobsProvider>
          <ToastContainer />

          <RouterProvider router={router} />
        </JobsProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
