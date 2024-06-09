import { Link, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaArrowDownLong } from "react-icons/fa6";
import useCurrentUser from "../../Hooks/useCurrentUser";
import { Helmet } from "react-helmet";

const ContestDetails = () => {

    const { currentUser } = useCurrentUser();

    const contest = useLoaderData();

    const [timeRemaining, setTimeRemaining] = useState(0);

    useEffect(() => {
        const deadline = new Date(contest.contestDeadline).getTime();
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = deadline - now;
            if (distance < 0) {
                clearInterval(interval);
                setTimeRemaining(0);
            } else {
                setTimeRemaining(distance);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [contest.contestDeadline]);


    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <div className="container mx-auto mt-10">
            
            <Helmet>
                <title>WinZone | {contest.contestName}</title>
            </Helmet>
            
            <div className="hero min-h-[100px] bg-[#d32f2f]">
                <div className="hero-content flex items-center justify-center">
                    <div>
                        <h1 className="text-5xl font-bold ubuntu text-white">{contest.contestName}</h1>
                    </div>
                </div>
            </div>
            <div className="mt-5 p-5 bg-white rounded-lg shadow-lg">
                <img src={contest.contestImage} alt={contest.contestName} className="w-full h-64 object-cover rounded-md" />
                <p className="text-gray-700 mt-5"><span className="text-lg font-medium">Participants:</span> {contest.participantsCount}</p>
                <p className="text-gray-700 mt-5"><span className="text-lg font-medium">Your Task:</span> {contest.contestTask}</p>
                <p className="text-gray-700 mt-5"><span className="text-lg font-medium">Prize:</span> ${contest.contestPrice}</p>

                {contest.winner && (
                    <div className="mt-5">
                        <h3 className="text-2xl font-bold">Winner</h3>
                        <img src={contest.winner.image} alt={contest.winner.name} className="w-20 h-20 object-cover rounded-full mt-3" />
                        <p className="text-gray-700 mt-2">{contest.winner.name}</p>
                    </div>
                )}

                <div className="mt-5">
                    <h3 className="text-2xl font-bold flex gap-1 items-center">Deadline <FaArrowDownLong className="text-lg" /></h3>
                    <p className="text-gray-700 mt-2">{timeRemaining > 0 ? formatTime(timeRemaining) : "Not available"}</p>
                </div>

                {!currentUser?.isBlocked && (
                    <Link to={`/contest-payment/${contest._id}`}>
                        <button className="btn btn-ghost mt-5 bg-[#d32f2f] text-white">Register</button>
                    </Link>
                )}

                {currentUser?.isBlocked && (
                    <div className="mt-5 font-bold text-red-500">You are blocked By Admin and cannot register</div>
                )}

            </div>
        </div>
    );
};

export default ContestDetails;
