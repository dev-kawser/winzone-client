import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GiPodiumWinner } from "react-icons/gi";
import Swal from "sweetalert2";

const ContestSubmittedPage = () => {
    const contest = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const [selectedContest, setSelectedContest] = useState(null);

    const { data: registerContests = [], refetch } = useQuery({
        queryKey: ["register-contests", contest?._id],
        queryFn: async () => {
            const res = await axiosSecure.get("/register-contests");
            return res.data;
        }
    });

    const filteredContests = registerContests.filter(con => con.contestId === contest?._id);

    const handleContestClick = (contest) => {
        setSelectedContest(contest);
    };

    const handleDeclareWin = async (submission) => {
        try {
            const res = await axiosSecure.put(`/register-contests/update/${submission._id}`, {
                winner: true,
                contestId: submission.contestId
            });
            console.log(res.data);
            if (res.data.acknowledged) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Winner declared successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to declare the winner. Please try again.",
                });
            }
        } catch (error) {
            console.error("Error declaring winner:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    };

    const winnerDeclared = filteredContests?.some(submission => submission.winner);

    return (
        <div>
            <div className="w-full bg-[#d32f2f] lg:py-8 py-4">
                <h1 className="text-center ubuntu text-white text-lg lg:text-2xl font-bold">Contest Submissions</h1>
            </div>
            <div className="mt-5">
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>Contest Title</th>
                                <th>Prize</th>
                            </tr>
                        </thead>
                        <tbody className="inter">
                            <tr>
                                <td>
                                    <button
                                        onClick={() => handleContestClick(contest)}
                                        className="btn btn-link">
                                        {contest?.contestName}
                                    </button>
                                </td>
                                <td>{contest?.contestPrize}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedContest && (
                <div className="mt-10 mx-5">
                    <h2 className="text-2xl font-bold ubuntu">Submissions for {selectedContest.contestName}</h2>
                    <div className="overflow-x-auto mt-5">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>Participant Name</th>
                                    <th>Email</th>
                                    <th>Submitted Task</th>
                                    <th>Declare Win</th>
                                </tr>
                            </thead>
                            <tbody className="inter">
                                {filteredContests?.map((submission) => (
                                    <tr key={submission._id}>
                                        <td>{submission.name}</td>
                                        <td>{submission.email}</td>
                                        <td>
                                            {submission.submittedTask.length > 40
                                                ? submission.submittedTask.slice(0, 50) + "..."
                                                : submission.submittedTask}
                                        </td>
                                        <td>
                                            {!submission.winner && !winnerDeclared && (
                                                <button
                                                    onClick={() => handleDeclareWin(submission)}
                                                    className="btn btn-ghost text-lg bg-blue-500 text-white">
                                                    <GiPodiumWinner />
                                                </button>
                                            )}
                                            {submission.winner && (
                                                <span className="text-green-500 font-semibold">Winner</span>
                                            )}
                                            {!submission.winner && winnerDeclared && (
                                                <span className="text-red-500 font-semibold">Unsuccess</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContestSubmittedPage;
