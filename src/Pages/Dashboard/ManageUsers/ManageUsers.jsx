import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaArrowLeft, FaArrowRight, FaUserShield } from "react-icons/fa";
import { MdBlock, MdDelete } from "react-icons/md";
import { useState } from "react";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(1);
    const usersPerPage = 7;

    const { refetch, data: users = [] } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        }
    });

    const handleUpdateRole = (id, role, name) => {
        axiosSecure.patch(`/users/role/${id}`, { role })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${name} is now a ${role}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            });
    };

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
                axiosSecure.delete(`/users/${id}`)
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

    const handleBlockUnblock = (id, name, isBlocked) => {
        const action = isBlocked ? "unblock" : "block";
        axiosSecure.patch(`/users/block/${id}`, { blocked: !isBlocked }).then((res) => {
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${name} has been ${action}ed`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                refetch();
            }
        });
    };


    const indexOfLastUser = page * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(users.length / usersPerPage);

    return (
        <div>
            <div className="w-full bg-[#d32f2f] lg:py-8 py-4">
                <h1 className="text-center ubuntu text-white text-lg lg:text-2xl font-bold">Manage All Users</h1>
            </div>
            <div className="mt-5">
                <div>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role Management</th>
                                    <th>Actions</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="inter">
                                {
                                    currentUsers.map((user, idx) => (
                                        <tr key={user._id}>
                                            <th>{indexOfFirstUser + idx + 1}</th>
                                            <td className="ubuntu">{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <select
                                                    value={user.role}
                                                    onChange={(e) => handleUpdateRole(user._id, e.target.value, user.name)}
                                                    className="select select-bordered w-full max-w-xs"
                                                >
                                                    <option value="normal">Normal User</option>
                                                    <option value="creator">Contest Creator</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </td>
                                            <td>
                                                <div>
                                                    <button
                                                        onClick={() => handleDelete(user._id)}
                                                        className="btn btn-ghost text-lg bg-red-600 text-white">
                                                        <MdDelete />
                                                    </button>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <button
                                                        onClick={() => handleBlockUnblock(user._id, user.name, user.isBlocked)}
                                                        className={`btn btn-ghost text-lg ${user.isBlocked ? "bg-yellow-600" : "bg-gray-600"} text-white`}
                                                    >
                                                        {user.isBlocked ? <FaUserShield /> : <MdBlock />}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center mt-10">
                <button
                    className="btn btn-outline btn-sm mx-2"
                    onClick={() => setPage(page => Math.max(page - 1, 1))}
                    disabled={page === 1}
                >
                    <FaArrowLeft />
                </button>
                <span className="mx-2">Page {page} of {totalPages}</span>
                <button
                    className="btn btn-outline btn-sm mx-2"
                    onClick={() => setPage(page => Math.min(page + 1, totalPages))}
                    disabled={page === totalPages}
                >
                    <FaArrowRight />
                </button>
            </div>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
