import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import spinner from "../assets/spinner.json"

const Root = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <div className="flex lg:h-[500px] justify-center items-center lg:mt-20 mx-auto">
        <Lottie animationData={spinner} ></Lottie>
    </div>

    }
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;