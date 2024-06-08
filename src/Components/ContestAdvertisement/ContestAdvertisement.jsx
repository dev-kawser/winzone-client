import { useQuery } from "@tanstack/react-query";
import { FaTrophy } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ContestAdvertisement = () => {


    const axiosSecure = useAxiosSecure();

    const [popularContests, setPopularContests] = useState([]);

    const { data: registerContests = [], } = useQuery({
        queryKey: ["register-contests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/register-contests");
            return res.data;
        }
    });

    const contestWinner = registerContests.filter(con => con.winner == true)

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
            setPopularContests(sortedContests.slice(0, 1));
        }
    }, [contests]);

    return (
        <section className="bg-gray-100 container mx-auto py-10 mt-20">
            <div className="px-10">
                <div className="bg-white shadow-md rounded-lg p-8">
                    <div className="flex flex-col lg:flex-row items-center">
                        <div className="lg:w-1/2">
                            <h2 className="text-4xl font-bold text-center lg:text-left mb-4">Join the Contest and Win Amazing Prizes!</h2>
                            <p className="text-gray-700 text-center lg:text-left mb-4">
                                Participate in our exciting contests and stand a chance to win amazing prizes. Show your skills and compete with others to become the ultimate winner.
                            </p>
                            <div className="flex justify-center lg:justify-start mb-4">
                                <FaTrophy className="text-yellow-500 text-6xl" />
                            </div>
                            <div className="text-center lg:text-left mt-4">
                                <h3 className="text-xl font-semibold mb-2">Total Participants</h3>
                                <p className="text-gray-700">{registerContests.length || "Loading..."}</p>
                            </div>
                            <div className="text-center lg:text-left mt-4">
                                <h3 className="text-xl font-semibold mb-2">Total Winners</h3>
                                <p className="text-gray-700">{contestWinner.length || "Loading..."}</p>
                            </div>
                            <div>
                                <Link to="/all-contests" className="flex items-center justify-start mt-5">
                                    <button className="btn btn-ghost mt-3 bg-[#d32f2f] text-white">Join Contests</button>
                                </Link>
                            </div>
                        </div>
                        <div className="lg:w-1/2 mt-8 lg:mt-0 lg:pl-8 relative hero rounded-lg">
                            <img src={popularContests.map(c => c.contestImage)} alt="Contest Banner" className="rounded-lg shadow-md" />
                            <div className="hero-overlay"></div>
                            <div className="absolute top-1/3 left-1.5">
                                <h1 className=" text-xl lg:text-4xl text-white ubuntu font-bold">
                                    Our Most Popular Contest <span className="text-yellow-300 lg:text-5xl ubuntu text-2xl" >{popularContests.map(c => c.contestName)}</span>
                                </h1>
                                <h1 className=" text-xl lg:text-4xl text-white ubuntu">Total Participate: <span className="text-yellow-300 lg:text-5xl ubuntu text-2xl">{popularContests.map(c => c.participantsCount)}</span></h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContestAdvertisement;
