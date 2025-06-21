import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Categories from "./pages/Categories";
import LoginPage from "./pages/login/LoginPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element:<Homepage/>
    },
    {
        path: "/categories",
        element:<Categories/>
    },
    {
        path: "/auth-login",
        element:<LoginPage/>
    },
])