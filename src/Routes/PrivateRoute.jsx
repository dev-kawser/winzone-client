/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Lottie from "lottie-react";
import spinner from "../assets/spinner.json"


const PrivateRoute = ({ children }) => {
    const location = useLocation()
    const { user, loading } = useAuth()

    if (loading) {
        return <div className="flex lg:h-[500px] justify-center items-center lg:mt-20 mx-auto">
            <Lottie animationData={spinner} ></Lottie>
        </div>
    }

    if (user) {
        return children
    }
    return <Navigate to="/login" state={location?.pathname || "/"}></Navigate>
};


export default PrivateRoute;