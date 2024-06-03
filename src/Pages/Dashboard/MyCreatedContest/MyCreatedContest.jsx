import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const MyCreatedContest = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { refetch, data: contests = [] } = useQuery({
        queryKey: ["contests", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/${user?.email}`);
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
                                    <td>
                                        <button
                                            className="btn btn-ghost text-lg bg-green-600 text-white"
                                            disabled={contest.status === "confirmed"}>
                                            <FaEdit />
                                        </button>
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
                                                className="btn btn-ghost lg:text-base bg-blue-600 text-white">
                                                See Submissions
                                            </button>
                                        </Link>
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

export default MyCreatedContest;
