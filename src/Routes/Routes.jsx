import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Dashboard from "../Layouts/Dashboard";
import AddContest from "../Pages/Dashboard/AddContest/AddContest";
import Welcome from "../Pages/Dashboard/Welcome/Welcome";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import ManageContests from "../Pages/Dashboard/ManageContests/ManageContests";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
        ]
    },
    {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
        children: [

            // For all
            {
                path: "welcome",
                element: <Welcome></Welcome>
            },

            // For Admin
            {
                path: "manage-users",
                element: <ManageUsers></ManageUsers>
            },
            {
                path: "manage-contests",
                element: <ManageContests></ManageContests>
            },


            // -----------------------------------------------
            // for Creator
            {
                path: "add-contest",
                element: <AddContest></AddContest>
            },
        ]
    }
]);

export default router;