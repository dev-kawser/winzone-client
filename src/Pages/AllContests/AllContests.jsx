
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const AllContests = () => {
    const axiosPublic = useAxiosPublic();
    const [contests, setContests] = useState([]);
    const [activeTab, setActiveTab] = useState("all");

    useEffect(() => {
        axiosPublic.get("/contests")
            .then(res => {
                setContests(res.data);
            })
            .catch(err => console.error(err));
    }, [axiosPublic]);

    const handleTabChange = (type) => {
        setActiveTab(type);
    };

    const filteredContests = activeTab === "all"
        ? contests.filter(contest => contest.status === "confirmed")
        : contests.filter(contest => contest.status === "confirmed" && contest.contestType === activeTab);

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

                <button onClick={() => handleTabChange("imageDesign")} className={`tab tab-lifted ${activeTab === "imageDesign" ? "tab-active border-2 font-semibold" : ""}`}>Image Design</button>

                <button onClick={() => handleTabChange("digitalAdvertisement")} className={`tab tab-lifted ${activeTab === "digitalAdvertisement" ? "tab-active border-2 font-semibold" : ""}`}>Digital Advertisement</button>

                <button onClick={() => handleTabChange("marketingStrategy")} className={`tab tab-lifted ${activeTab === "marketingStrategy" ? "tab-active border-2 font-semibold" : ""}`}>Marketing Strategy</button>

                <button onClick={() => handleTabChange("articleWriting")} className={`tab tab-lifted ${activeTab === "articleWriting" ? "tab-active border-2 font-semibold" : ""}`}>Article Writing</button>

                <button onClick={() => handleTabChange("gamingReview")} className={`tab tab-lifted ${activeTab === "gamingReview" ? "tab-active border-2 font-semibold" : ""}`}>Gaming Review</button>

                <button onClick={() => handleTabChange("bookReview")} className={`tab tab-lifted ${activeTab === "bookReview" ? "tab-active border-2 font-semibold" : ""}`}>Book Review</button>

                <button onClick={() => handleTabChange("businessIdea")} className={`tab tab-lifted ${activeTab === "businessIdea" ? "tab-active border-2 font-semibold" : ""}`}>Business Idea</button>

                <button onClick={() => handleTabChange("movieReview")} className={`tab tab-lifted ${activeTab === "movieReview" ? "tab-active border-2 font-semibold" : ""}`}>Movie Review</button>

            </div>


            <div className="divider"></div>


            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredContests.map(contest => (
                    <div key={contest._id} className="card shadow-lg p-5 bg-white rounded-md">
                        <img src={contest.contestImage} alt={contest.contestName} className="w-full h-48 object-cover rounded-md" />
                        <h2 className="text-2xl font-bold mt-3 ubuntu">{contest.contestName}</h2>
                        <p className="text-gray-700 mt-2 inter">
                            {contest.contestDescription.length > 50
                                ? contest.contestDescription.slice(0, 50) + "..."
                                : contest.contestDescription}
                        </p>
                        <p className="text-gray-500 mt-2">Participants: {contest.participantsCount}</p>
                        <Link to={`/dashboard/contest-details/${contest._id}`}>
                            <button className="btn btn-ghost mt-3 bg-[#d32f2f] text-white">Details</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllContests;
