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
import MyCreatedContest from "../Pages/Dashboard/MyCreatedContest/MyCreatedContest";
import ContestSubmittedPage from "../Pages/Dashboard/ContestSubmittedPage/ContestSubmittedPage";
import ContestUpdate from "../Pages/Dashboard/ContestUpdate/ContestUpdate";
import AllContests from "../Pages/AllContests/AllContests";
import ContestDetails from "../Pages/ContestDetails/ContestDetails";
import ContestPayment from "../Pages/ContestPayment/ContestPayment";


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
            {
                path: '/all-contests',
                element: <AllContests></AllContests>
            },
            {
                path: "/contest-details/:id",
                element: <ContestDetails></ContestDetails>,
                loader: ({ params }) => fetch(`http://localhost:5000/contests/${params.id}`)
            },
            {
                path: "/contest-payment/:id",
                element: <ContestPayment></ContestPayment>,
                loader: ({ params }) => fetch(`http://localhost:5000/contests/${params.id}`)
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
            {
                path: "my-created-contest",
                element: <MyCreatedContest></MyCreatedContest>
            },
            {
                path: "contest-update/:id",
                element: <ContestUpdate></ContestUpdate>,
                loader: ({ params }) => fetch(`http://localhost:5000/contests/${params.id}`)
            },
            {
                path: "contest-submitted-page",
                element: <ContestSubmittedPage></ContestSubmittedPage>
            },
        ]
    }
]);

export default router;