import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Banner = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = data => {
        const value = data.search.toLowerCase().replace(/\s+/g, '');
        navigate(`/all-contests?search=${value}`);
    };

    return (
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/yPmt6WQ/markus-winkler-5ofa31-FPKYY-unsplash.jpg)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-left text-neutral-content">
                    <div className="max-w-4xl">
                        <h1 className="mb-5 text-4xl lg:text-5xl font-bold ubuntu">Join the Ultimate Challenge at <span>WinZone!</span></h1>
                        <p className="mb-5 text-sm lg:text-base inter">Unleash your competitive spirit and win amazing prizes! ContestCraze offers thrilling challenges across various categories. Whether you’re a trivia master, a creative genius, or a gaming enthusiast, there’s something for everyone. Sign up now and take your shot at glory!</p>
                        <div>
                            <div className="max-w-4xl mx-auto">
                                <form onSubmit={handleSubmit(onSubmit)} className="flex items-center">
                                    <label className="sr-only">Search</label>
                                    <div className="relative w-full">
                                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" ></path></svg>
                                        </div>
                                        <input type="text" name="search" className="border text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 bg-white border-gray-600" placeholder="Search photos by tags (e.g., Image Design Contests, Article Writing, Marketing Strategy)" required {...register("search")} />
                                        <button type="button" className="flex absolute inset-y-0 right-0 items-center pr-3">
                                        </button>
                                    </div>
                                    <button type="submit" className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white rounded-lg border hover:scale-105 transition-all focus:ring-4 focus:outline-none bg-[#d32f2f]">
                                        <svg className="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                        Search
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
