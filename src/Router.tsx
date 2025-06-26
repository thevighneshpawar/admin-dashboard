import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/login/LoginPage";
import Dashboard from "./layouts/Dashboard";
import NonAuth from "./layouts/NonAuth";
import Root from "./layouts/Root";
import Categories from "./pages/Categories";
import Userspage from "./pages/users/Userspage";

export const router = createBrowserRouter([

    {

        path: "/",
        element: <Root />,
        children: [

            {
                path: "/",
                element: <Dashboard />,
                children: [

                    {
                        path: "",
                        element: <Homepage />
                    },

                    {
                        path: "users",
                        element: <Userspage />
                    },
                    {
                        path: "restaurants",
                        element: <Categories />
                    },
                    {
                        path: "products",
                        element: <Categories />
                    },
                    {
                        path: "promos",
                        element: <Categories />
                    }


                ]
            },
            {

                path: "/auth",
                element: <NonAuth />,
                children: [
                    {
                        path: "login",
                        element: <LoginPage />
                    },

                ]


            },

        ]

    },


])