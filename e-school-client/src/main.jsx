import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./Contexts/AuthProvider";
import "./index.css";
import router from "./Routes/Routes/Routes";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <Toaster></Toaster>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  </AuthProvider>
);
