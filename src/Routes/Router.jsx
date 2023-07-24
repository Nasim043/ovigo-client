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
                {
                    path: "/dashboard",
                    element: <MyGroup></MyGroup>,
                },
                {
                    path: "addPost/:id",
                    element: <AddPost></AddPost>
                },
                {
                    path: "editPost/:id",
                    element: <EditPost></EditPost>,
                    // loader: ({ params }) => fetch(`http://localhost:5000/posts/${params.id}`)
                },
                {
                    path: "manageMembers/:id",
                    element: <ManageMembers></ManageMembers>,
                },
                {
                    path: "details/:id",
                    element: <Details></Details>,
                    loader: ({ params }) => fetch(`http://localhost:5000/community/details/${params.id}`)
                }
            ]
        }
    ]
)
export default router;