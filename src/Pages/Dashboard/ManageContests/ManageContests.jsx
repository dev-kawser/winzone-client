import { useQuery } from "@tanstack/react-query";
import { MdDelete, MdPendingActions } from "react-icons/md";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaCommentAlt } from "react-icons/fa";
import Swal from "sweetalert2";


const ManageContests = () => {

    const axiosSecure = useAxiosSecure();

    const { refetch, data: contests = [] } = useQuery({
        queryKey: ["contests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/contests");
            return res.data;
        }
    });

    // contest delete
    const handleDelete = id => {
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
                                text: "User has been deleted.",
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
                <h1 className="text-center ubuntu text-white text-lg lg:text-2xl font-bold">Manage All Contests</h1>
            </div>
            <div className="mt-5">
                <div>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>Contest Name</th>
                                    <th>Contest type</th>
                                    <th>Contest task</th>
                                    <th>Status</th>
                                    <th>Delete</th>
                                    <th>Comments</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    contests.map((contest) => (
                                        <tr key={contest._id}>
                                            <th>{contest.contestName}</th>
                                            <td>{contest.contestType}</td>
                                            <td>{contest.contestTask.slice(0, 20)}</td>
                                            <td>
                                                <div>
                                                    <button
                                                        onClick={() => handleConfirm(contest._id)}
                                                        className="btn btn-ghost text-lg bg-orange-600 text-white">
                                                        <MdPendingActions />
                                                    </button>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <button
                                                        onClick={() => handleDelete(contest._id)}
                                                        className="btn btn-ghost text-lg bg-red-600 text-white">
                                                        <MdDelete />
                                                    </button>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <button
                                                        onClick={() => handleComment(contest._id)}
                                                        className="btn btn-ghost text-lg bg-blue-600 text-white">
                                                        <FaCommentAlt />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageContests;