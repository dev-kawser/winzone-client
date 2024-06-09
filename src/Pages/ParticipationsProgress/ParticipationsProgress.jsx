import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import spinner from "../../assets/spinner.json";
import Lottie from 'lottie-react';
import { Helmet } from 'react-helmet';

const ParticipationsProgress = () => {
    const axiosPublic = useAxiosPublic();

    const { data: progressData = [], isLoading } = useQuery({
        queryKey: ['participations-progress'],
        queryFn: async () => {
            const res = await axiosPublic.get('/participations-progress');
            return res.data;
        }
    });

    if (isLoading) return <div className="flex lg:h-[500px] justify-center items-center lg:mt-20 mx-auto">
        <Lottie animationData={spinner} ></Lottie>
    </div>

    return (
        <div>
            
            <Helmet>
                <title>WinZone | Participation Progress</title>
            </Helmet>
            
            <div className="w-full bg-gradient-to-r from-[#d32f2f] to-[#FF5F6D] lg:py-8 py-4">
                <h1 className="text-center text-white text-lg lg:text-3xl font-extrabold drop-shadow-lg">
                    Participations Progress Tracking
                </h1>
            </div>
            <div className="mt-10 container mx-auto px-4">
                <table className="min-w-full bg-white">
                    <thead className="bg-gradient-to-r from-[#d32f2f] to-[#FF5F6D] text-white">
                        <tr>
                            <th className="w-1/12 py-3 px-4 uppercase font-semibold text-sm">User</th>
                            <th className="w-3/12 py-3 px-4 uppercase font-semibold text-sm">Total Contests</th>
                            <th className="w-4/12 py-3 px-4 uppercase font-semibold text-sm">Total Wins</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {progressData.map(user => (
                            <tr key={user._id} className="hover:bg-gray-100">
                                <td className="py-3 px-4">{user.displayName}</td>
                                <td className="py-3 px-4 text-center">{user.totalContests}</td>
                                <td className="py-3 px-4 text-center">{user.totalWins}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ParticipationsProgress;
