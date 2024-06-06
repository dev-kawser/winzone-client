import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaTrophy } from "react-icons/fa";

const MyWinningContests = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: contests = [], } = useQuery({
        queryKey: ["winningContests", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/register-contests/email/winner/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    return (
        <div className="p-6">
            <div className="w-full bg-[#4caf50] lg:py-8 py-4">
                <h1 className="text-center ubuntu text-white text-lg lg:text-2xl font-bold">
                    Congratulations {user?.name}! 🎉
                </h1>
                <p className="text-center text-white">Here are the contests you have won:</p>
            </div>

            <div className="mt-10 mx-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
                {contests.length === 0 ? (
                    <p className="text-center col-span-3 text-lg text-gray-600">You have not won any contests yet. Keep participating!</p>
                ) : (
                    contests.map((contest) => (
                        <div key={contest._id} className="card bg-white shadow-lg rounded-lg p-4">
                            <h2 className="text-lg font-bold mb-2 flex items-center">
                                <FaTrophy className="text-yellow-500 mr-2" /> {contest.contest.contestName}
                            </h2>
                            <p className="text-gray-600 mb-2">
                                <span className="text-lg font-medium">Task:</span> {contest.contest.contestTask.slice(0, 100)}...
                            </p>
                            <p className="text-gray-800 mb-2">
                                <span className="text-lg font-medium">Deadline:</span>{" "}
                                {new Date(contest.contest.contestDeadline).toLocaleDateString()}
                            </p>
                            <p className="text-gray-800 mb-2">
                                <span className="text-lg font-medium">Payment Status:</span>{" "}
                                <span className="text-green-600 font-semibold">{contest.status}</span>
                            </p>
                            <p className="text-gray-800 mb-2">
                                <span className="text-lg font-medium">Winner Status:</span>{" "}
                                <span className="text-green-600 font-semibold">Winner</span>
                            </p>
                            <Link to={`/contest-details/${contest.contestId}`}>
                                <button className="btn btn-primary mt-2 w-full">
                                    View Details
                                </button>
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyWinningContests;
