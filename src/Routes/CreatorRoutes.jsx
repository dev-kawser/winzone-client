/* eslint-disable react/prop-types */

import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Lottie from "lottie-react";
import spinner from "../assets/spinner.json"
import useContestCreator from "../Hooks/useContestCreator ";



const CreatorRoutes = ({ children }) => {

    const { user, loading } = useAuth();
    const location = useLocation()
    const { isCreator, isLoading } = useContestCreator();

    if (loading || isLoading) {
        return <div className="flex lg:h-[500px] justify-center items-center lg:mt-20 mx-auto">
            <Lottie animationData={spinner} ></Lottie>
        </div>
    }

    if (user && isCreator) {
        return children
    }
    return <Navigate to="/" state={location?.pathname || "/"}></Navigate>
};

export default CreatorRoutes;