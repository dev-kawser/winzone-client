import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PopularContests = () => {
    const axiosSecure = useAxiosSecure();
    const [popularContests, setPopularContests] = useState([]);

    const { data: contests = [] } = useQuery({
        queryKey: ["contests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/contests");
            return res.data;
        }
    });

    useEffect(() => {
        if (contests.length > 0) {
            const sortedContests = contests.sort((a, b) => b.participantsCount - a.participantsCount);
            setPopularContests(sortedContests.slice(0, 6));
        }
    }, [contests]);

    return (
        <div className=" mt-20">
            <div className="w-full bg-[#d32f2f] lg:py-8 py-4">
                <h1 className="text-center ubuntu text-white text-lg lg:text-4xl font-bold">Popular Contests</h1>
            </div>
            <div className="mt-10 container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {popularContests?.map(contest => (
                    <div key={contest._id} className="card bg-white shadow-lg rounded-lg p-4">
                        <img
                            src={contest.contestImage || 'default-image-url.jpg'}
                            alt={contest.contestName}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h2 className="text-lg text-gray-600 font-bold mb-2">{contest.contestName}</h2>
                        <p className="text-gray-600 mb-4">
                            {contest.contestDescription.slice(0, 100)}...
                        </p>
                        <p className="text-gray-800 mb-4">
                            Participants: {contest.participantsCount}
                        </p>
                        <Link to={`/contest-details/${contest._id}`}>
                            <button className="btn btn-ghost text-white bg-[#d32f2f]">
                                Details
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
            <div>
                <Link to="/all-contests" className="flex items-center justify-center mt-5">
                    <button className="btn btn-ghost mt-3 bg-[#d32f2f] text-white">All Contests</button>
                </Link>
            </div>
        </div>
    );
};

export default PopularContests;
