import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { GiPodiumWinner } from "react-icons/gi";
import Swal from "sweetalert2";

const Participate = () => {
    const contest = useLoaderData();
    const axiosSecure = useAxiosSecure();

    const { data: registerContests = [], refetch, } = useQuery({
        queryKey: ["register-contests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/register-contests");
            return res.data;
        }
    });

    const filteredContests = registerContests.filter(con => con.contestId === contest?._id && con.participate === true);

    
    const handleDeclareWin = async (submission) => {

        const res = await axiosSecure.put(`/register-contests/update/${submission._id}`, {
            winner: true,
            contestId: submission.contestId
        });
        if (res.data.acknowledged) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Winner declared successfully",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        }

    };

    const winnerDeclared = filteredContests?.some(submission => submission.winner);


    return (
        <div>
            <div className="mt-10 mx-5">
                <h2 className="text-2xl font-bold ubuntu">Submissions for {contest.contestName}</h2>
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
                                        {submission.submittedTask?.length > 40
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
        </div>
    );
};

export default Participate;
