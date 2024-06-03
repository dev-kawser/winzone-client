/* eslint-disable react/prop-types */

import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";
import Lottie from "lottie-react";
import spinner from "../assets/spinner.json"



const AdminRoutes = ({ children }) => {

    const { user, loading } = useAuth();
    const location = useLocation()
    const { isAdmin, isLoading } = useAdmin();

    if (loading || isLoading) {
        return <div className="flex lg:h-[500px] justify-center items-center lg:mt-20 mx-auto">
            <Lottie animationData={spinner} ></Lottie>
        </div>
    }

    if (user && isAdmin) {
        return children
    }
    return <Navigate to="/" state={location?.pathname || "/"}></Navigate>
};

export default AdminRoutes;