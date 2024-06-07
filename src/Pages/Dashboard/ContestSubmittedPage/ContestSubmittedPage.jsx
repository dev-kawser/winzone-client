import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ContestSubmittedPage = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [page, setPage] = useState(1);
    const contestsPerPage = 10;

    const { data: registerContests = [] } = useQuery({
        queryKey: ["contests", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/email/${user?.email}`);
            return res.data;
        }
    });

    const indexOfLastContest = page * contestsPerPage;
    const indexOfFirstContest = indexOfLastContest - contestsPerPage;
    const currentContests = registerContests.slice(indexOfFirstContest, indexOfLastContest);

    const totalPages = Math.ceil(registerContests.length / contestsPerPage);

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
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
                                <th></th>
                                <th>Contest Title</th>
                                <th>Prize</th>
                            </tr>
                        </thead>
                        <tbody className="inter">
                            {currentContests.map((contest, idx) => (
                                <tr key={contest._id}>
                                    <td>{indexOfFirstContest + idx + 1}</td>
                                    <td>
                                        <Link to={`/dashboard/participate/${contest._id}`} className="btn-link">
                                            {contest?.contestName}
                                        </Link>
                                    </td>
                                    <td>{contest?.contestPrize}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        onClick={handlePreviousPage}
                        disabled={page === 1}
                        className="btn btn-outline btn-sm mx-2"
                    >
                        <FaArrowLeft />
                    </button>
                    <span className="text-center">{`Page ${page} of ${totalPages}`}</span>
                    <button
                        onClick={handleNextPage}
                        disabled={page === totalPages}
                        className="btn btn-outline btn-sm mx-2"
                    >
                        <FaArrowRight/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContestSubmittedPage;
