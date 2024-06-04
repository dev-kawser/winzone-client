

import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
// import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { GiPodiumWinner } from "react-icons/gi";

const ContestSubmittedPage = () => {
    const contest = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const [selectedContest, setSelectedContest] = useState(null);

    const { data: registerContests = [] } = useQuery({
        queryKey: ["contests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/register-contests");
            return res.data;
        }
    });

    const filterContest = registerContests.filter(con => con.contestId == contest._id)

    const handleContestClick = async (contest) => {
        setSelectedContest(contest);



    };

    const handleDeclareWin = async (contest) => {

        const winnerName = contest.name;
        const winnerEmail = contest.email;
        const ContestName = contest.contest.contestName;
        const contestImage = contest.contest.contestImage;

        const winnerInfo = {
            winnerName: winnerName,
            winnerEmail: winnerEmail,
            ContestName: ContestName,
            contestImage: contestImage,
        }

        console.log(winnerInfo);

    };

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

                            <tr >
                                <td>
                                    <button
                                        onClick={() => handleContestClick(contest)}
                                        className="btn btn-link">
                                        {contest.contestName}
                                    </button>
                                </td>
                                <td>${contest.contestPrice}</td>
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
                                {filterContest?.map((contest) => (
                                    <tr key={contest._id}>
                                        <td>{contest.name}</td>
                                        <td>{contest.email}</td>
                                        <td>
                                            <a href="" target="_blank" className="text-blue-600 underline">
                                                View Task
                                            </a>
                                        </td>
                                        <td>
                                            {contest.isWinner ? (
                                                <span className="text-green-500 font-semibold">Winner</span>
                                            ) : (
                                                <button
                                                    onClick={() => handleDeclareWin(contest)}
                                                    className="btn btn-ghost text-lg bg-blue-500 text-white">
                                                    <GiPodiumWinner />
                                                </button>
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



