import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import spinner from "../../assets/spinner.json";
import Lottie from 'lottie-react';

const LeaderBoard = () => {
    const axiosPublic = useAxiosPublic();

    const { data: leaderBoard = [], isLoading, } = useQuery({
        queryKey: ['leaderBoard'],
        queryFn: async () => {
            const res = await axiosPublic.get('/leaderBoard');
            return res.data;
        }
    });

    if (isLoading) return <div className="flex lg:h-[500px] justify-center items-center lg:mt-20 mx-auto">
        <Lottie animationData={spinner} ></Lottie>
    </div>

    return (
        <div>
            <div className="w-full bg-gradient-to-r from-[#d32f2f] to-[#FF5F6D] lg:py-8 py-4">
                <h1 className="text-center text-white text-lg lg:text-3xl font-extrabold drop-shadow-lg">
                    Leaderboard
                </h1>
            </div>
            <div className="mt-10 container mx-auto px-4">
                <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gradient-to-r from-[#d32f2f] to-[#FF5F6D] text-white">
                            <tr>
                                <th className="w-1/12 py-3 px-4 uppercase font-semibold text-sm">Rank</th>
                                <th className="w-3/12 py-3 px-4 uppercase font-semibold text-sm">User</th>
                                <th className="w-4/12 py-3 px-4 uppercase font-semibold text-sm">Email</th>
                                <th className="w-4/12 py-3 px-4 uppercase font-semibold text-sm">Contests Won</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {leaderBoard.map((user, idx) => (
                                <tr key={user._id} className={`hover:bg-gray-100 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                    <td className="py-3 w-4/12 px-4 text-center">{idx + 1}</td>
                                    <td className="py-3 w-4/12 px-4 text-center">{user.displayName}</td>
                                    <td className="py-3 w-4/12 px-4 text-center">{user.email}</td>
                                    <td className="py-3 w-4/12 px-4 text-center">{user.contestsWon}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LeaderBoard;
