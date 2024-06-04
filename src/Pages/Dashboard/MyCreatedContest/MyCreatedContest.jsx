import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { FaCommentAlt, FaEdit } from "react-icons/fa";
import { useState } from "react";

const MyCreatedContest = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const [comment, setComment] = useState([]);

    const { refetch, data: contests = [] } = useQuery({
        queryKey: ["contests", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/email/${user?.email}`);
            return res.data;
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/contests/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Contest deleted successfully",
                                icon: "success"
                            });
                            refetch();
                        }
                    });
            }
        });
    };
    const handleViewComments = (comment) => {
        setComment(comment || []);
        document.getElementById('comment_modal').showModal();
    };



    return (
        <div>
            <div className="w-full bg-[#d32f2f] lg:py-8 py-4">
                <h1 className="text-center ubuntu text-white text-lg lg:text-2xl font-bold">My Created Contests</h1>
            </div>
            <div className="mt-5">
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>Contest Name</th>
                                <th>Contest Type</th>
                                <th>Contest Deadline</th>
                                <th>Status</th>
                                <th>Edit</th>
                                <th>Delete</th>
                                <th>See Submissions</th>
                                <th>Comments</th>
                            </tr>
                        </thead>
                        <tbody className="inter">
                            {contests?.map((contest) => (
                                <tr key={contest._id}>
                                    <td className="ubuntu">{contest.contestName}</td>
                                    <td>{contest.contestType}</td>
                                    <td>{contest.contestDeadline}</td>
                                    <td className={`${contest.status === "confirmed" ? "text-green-500 font-semibold" : ""}`}>
                                        {contest.status}
                                    </td>
                                    <td>{
                                        contest.status === "confirmed" ?
                                            <button
                                                className="btn btn-ghost text-lg bg-green-600 text-white"
                                                disabled>
                                                <FaEdit />
                                            </button>
                                            :
                                            <Link to={`/dashboard/contest-update/${contest._id}`}>
                                                <button
                                                    className="btn btn-ghost text-lg bg-green-600 text-white"
                                                    disabled={contest.status === "confirmed"}>
                                                    <FaEdit />
                                                </button>
                                            </Link>
                                    }

                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(contest._id)}
                                            className="btn btn-ghost text-lg bg-red-600 text-white"
                                            disabled={contest.status === "confirmed"}>
                                            <MdDelete />
                                        </button>
                                    </td>
                                    <td>
                                        <Link to="/dashboard/contest-submitted-page">
                                            <button
                                                className="btn btn-ghost lg:text-base bg-green-600 text-white">
                                                See Submissions
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleViewComments(contest.comment)}
                                            className="btn btn-ghost lg:text-base bg-blue-600  text-white">See Comments
                                            <FaCommentAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Modal for viewing comments */}
            <dialog id="comment_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Comments</h3>
                    <div className="overflow-y-auto max-h-64">

                        <p>{comment}</p>

                    </div>
                    <div className="modal-action">
                        <button onClick={() => document.getElementById('comment_modal').close()} className="btn">Close</button>
                    </div>
                </div>
            </dialog>


        </div>
    );
};

export default MyCreatedContest;
