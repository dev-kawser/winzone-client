import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const MyParticipatedContest = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [sortBy, setSortBy] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const { data: contests = [], refetch } = useQuery({
        queryKey: ["participatedContests", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/register-contests/email/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const sortContests = () => {
        switch (sortBy) {
            case "upcoming":
                return contests.sort((a, b) => new Date(a.contest.contestDeadline) - new Date(b.contest.contestDeadline));
            default:
                return contests;
        }
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleSubmit = async (event, id) => {
        event.preventDefault();
        const task = event.target.task.value;
        if (task) {
            const res = await axiosSecure.patch(`/register-contests/${id}`, {
                submittedTask: task,
                participate: true,
            });
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    title: "Success",
                    text: "You are a participant now",
                    icon: "success",
                });
            }
            refetch();
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Pagination logic
    const sortedContests = sortContests();
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedContests.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedContests.length / itemsPerPage);

    return (
        <div>
            <div className="w-full bg-[#d32f2f] lg:py-8 py-4">
                <h1 className="text-center ubuntu text-white text-lg lg:text-2xl font-bold">
                    My Participated Contests
                </h1>
            </div>
            <div className="mt-10 flex justify-start ml-5">
                <select value={sortBy} onChange={handleSortChange} className="px-3 py-2 border border-gray-300 rounded-md">
                    <option value="">Sort by</option>
                    <option value="upcoming">Upcoming</option>
                </select>
            </div>
            <div className="mt-5 mx-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
                {currentItems.map((contest) => (
                    <div key={contest._id} className="card bg-white shadow-lg rounded-lg p-4">
                        <h2 className="text-lg font-bold mb-2">{contest.contest.contestName}</h2>
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
                        <form onSubmit={(e) => handleSubmit(e, contest._id)} className="flex flex-col mb-5">
                            <label htmlFor="submittedTask" className="text-lg font-medium">Submit Task*</label>
                            <input
                                type="text"
                                name="task"
                                placeholder="You must complete the task"
                                className="border-2 p-2 border-gray-400"
                            />
                            <button type="submit" className="btn btn-ghost mt-2 bg-[#d32f2f] text-white">
                                Participate
                            </button>
                        </form>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-5">
                <button
                    className="px-4 py-2 mx-1 bg-gray-300 rounded"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    <FaArrowLeft />
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-[#d32f2f] text-white' : 'bg-gray-300'}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className="px-4 py-2 mx-1 bg-gray-300 rounded"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
};

export default MyParticipatedContest;
