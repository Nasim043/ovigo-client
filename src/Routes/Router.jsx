import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import Dashboard from "../pages/Dahsboard/Dashboard";
import Home from "../pages/Home/Home";
import AddCommunity from "../pages/Community/AddCommunity";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Main></Main>,
            children: [
                {
                    path: "/",
                    element: <Home></Home>
                },
                {
                    path: "login",
                    element: <Login></Login>
                },
                {
                    path: "signup",
                    element: <SignUp></SignUp>
                },
                {
                    path: "addCommunity",
                    element: <AddCommunity></AddCommunity>
                }
            ]
        },
        {
            path: "dashboard",
            element: <Dashboard></Dashboard>,
            children: [
                
            ]
        }
    ]
)
export default router;