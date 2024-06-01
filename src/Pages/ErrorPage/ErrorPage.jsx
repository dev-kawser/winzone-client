
import { Link } from "react-router-dom";
import errorAnimation from "../../assets/errorAnimation.json"
import Lottie from "lottie-react";

const ErrorPage = () => {
    return (
        <div className="lg:h-[500px] lg:w-[500px] lg:mt-20 container mx-auto">
            <Lottie animationData={errorAnimation}></Lottie>
            <div>
                <section className="flex items-center -mt-10 h-full sm:p-16">
                    <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
                        <p className="text-4xl font-bold ">Sorry, we unable to find this page</p>
                        <Link to="/" rel="noopener noreferrer" href="#" className="px-8 py-3 font-semibold rounded bg-[#d32f2f] text-white">Back to homepage</Link>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ErrorPage;