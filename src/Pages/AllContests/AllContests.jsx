import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const AllContests = () => {
    const axiosPublic = useAxiosPublic();
    const [contests, setContests] = useState([]);
    const [activeTab, setActiveTab] = useState("all");
    const [searchParams] = useSearchParams();
    const [page, setPage] = useState(1);
    const [contestsPerPage] = useState(9);

    useEffect(() => {
        axiosPublic.get("/contests")
            .then(res => {
                setContests(res.data);
            })
            .catch(err => console.error(err));
    }, [axiosPublic]);

    
    useEffect(() => {
        const search = searchParams.get('search');
        if (search) {
            setActiveTab(search);
        }
    }, [searchParams]);

    const handleTabChange = (type) => {
        setActiveTab(type.toLowerCase().replace(/\s+/g, ''));
        setPage(1);
    };

    const filteredContests = activeTab === "all"
        ? contests.filter(contest => contest.status === "confirmed")
        : contests.filter(contest => contest.status === "confirmed" && contest.contestType.toLowerCase().replace(/\s+/g, '') === activeTab);

    
    const indexOfLastContest = page * contestsPerPage;
    const indexOfFirstContest = indexOfLastContest - contestsPerPage;
    const currentContests = filteredContests.slice(indexOfFirstContest, indexOfLastContest);

    const totalPages = Math.ceil(filteredContests.length / contestsPerPage);

    return (
        <div className="container mx-auto mt-5">
            <div className="hero min-h-[100px] bg-[#d32f2f]">
                <div className="hero-content flex items-center justify-center">
                    <div>
                        <h1 className="text-5xl font-bold ubuntu text-white">All Contests Here</h1>
                    </div>
                </div>
            </div>
            <div className="tabs mt-10 flex flex-wrap justify-center">
                <button onClick={() => handleTabChange("all")} className={`tab tab-lifted ${activeTab === "all" ? "tab-active border-2 font-semibold" : ""}`}>All</button>
                <button onClick={() => handleTabChange("imageDesign")} className={`tab tab-lifted ${activeTab === "imagedesign" ? "tab-active border-2 font-semibold" : ""}`}>Image Design</button>
                <button onClick={() => handleTabChange("digitalAdvertisement")} className={`tab tab-lifted ${activeTab === "digitaladvertisement" ? "tab-active border-2 font-semibold" : ""}`}>Digital Advertisement</button>
                <button onClick={() => handleTabChange("marketingStrategy")} className={`tab tab-lifted ${activeTab === "marketingstrategy" ? "tab-active border-2 font-semibold" : ""}`}>Marketing Strategy</button>
                <button onClick={() => handleTabChange("articleWriting")} className={`tab tab-lifted ${activeTab === "articlewriting" ? "tab-active border-2 font-semibold" : ""}`}>Article Writing</button>
                <button onClick={() => handleTabChange("gamingReview")} className={`tab tab-lifted ${activeTab === "gamingreview" ? "tab-active border-2 font-semibold" : ""}`}>Gaming Review</button>
                <button onClick={() => handleTabChange("bookReview")} className={`tab tab-lifted ${activeTab === "bookreview" ? "tab-active border-2 font-semibold" : ""}`}>Book Review</button>
                <button onClick={() => handleTabChange("businessIdea")} className={`tab tab-lifted ${activeTab === "businessidea" ? "tab-active border-2 font-semibold" : ""}`}>Business Idea</button>
                <button onClick={() => handleTabChange("movieReview")} className={`tab tab-lifted ${activeTab === "moviereview" ? "tab-active border-2 font-semibold" : ""}`}>Movie Review</button>
            </div>
            <div className="divider"></div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {currentContests.map(contest => (
                    <div key={contest._id} className="card shadow-lg p-5 bg-white rounded-md">
                        <img src={contest.contestImage} alt={contest.contestName} className="w-full h-48 object-cover rounded-md" />
                        <h2 className="text-2xl font-bold mt-3 ubuntu">{contest.contestName}</h2>
                        <p className="text-gray-700 mt-2 inter">
                            {contest.contestDescription.length > 50
                                ? contest.contestDescription.slice(0, 50) + "..."
                                : contest.contestDescription}
                        </p>
                        <p className="text-gray-500 mt-2">Participants: {contest.participantsCount}</p>
                        <Link to={`/contest-details/${contest._id}`}>
                            <button className="btn btn-ghost mt-3 bg-[#d32f2f] text-white">Details</button>
                        </Link>
                    </div>
                ))}
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
    );
};

export default AllContests;
