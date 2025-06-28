import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/login/LoginPage";
import Dashboard from "./layouts/Dashboard";
import NonAuth from "./layouts/NonAuth";
import Root from "./layouts/Root";

import Userspage from "./pages/users/Userspage";
import RestaurantPage from "./pages/restaurants/RestaurantPage";

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
                        element: <RestaurantPage />
                    },
                    {
                        path: "products",
                        element: <Userspage />
                    },
                    {
                        path: "promos",
                        element: <Userspage />
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