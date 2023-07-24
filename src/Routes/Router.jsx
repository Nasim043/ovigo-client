import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import Dashboard from "../pages/Dahsboard/Dashboard";
import Home from "../pages/Home/Home";
import AddCommunity from "../pages/Community/AddCommunity";
import AddPost from "../pages/Dahsboard/AddPost";
import EditPost from "../pages/Dahsboard/Editpost";
import MyGroup from "../pages/Dahsboard/MyGroup";
import Details from "../pages/Dahsboard/Details";
import ManageMembers from "../pages/Dahsboard/ManageMembers";
import PrivateRoute from "./PrivateRoute";

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
                    element: <PrivateRoute><AddCommunity></AddCommunity></PrivateRoute>
                }
            ]
        },
        {
            path: "dashboard",
            element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
            children: [
                {
                    path: "/dashboard",
                    element: <PrivateRoute><MyGroup></MyGroup></PrivateRoute>,
                },
                {
                    path: "addPost/:id",
                    element: <PrivateRoute><AddPost></AddPost></PrivateRoute>
                },
                {
                    path: "editPost/:id",
                    element: <PrivateRoute><EditPost></EditPost></PrivateRoute>,
                    // loader: ({ params }) => fetch(`http://localhost:5000/posts/${params.id}`)
                },
                {
                    path: "manageMembers/:id",
                    element: <PrivateRoute><ManageMembers></ManageMembers></PrivateRoute>,
                },
                {
                    path: "details/:id",
                    element: <PrivateRoute><Details></Details></PrivateRoute>,
                    loader: ({ params }) => fetch(`http://localhost:5000/community/details/${params.id}`)
                }
            ]
        }
    ]
)
export default router;