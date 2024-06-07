import { useForm } from 'react-hook-form';
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useCurrentUser from "../../../Hooks/useCurrentUser";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const MyProfile = () => {
    const { currentUser, refetch } = useCurrentUser();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit } = useForm();
    const { user } = useAuth();

    const { data: winningContests = [] } = useQuery({
        queryKey: ["winningContests", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/register-contests/email/winner/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const { data: myContests = [] } = useQuery({
        queryKey: ["participatedContests", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/register-contests/email/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const totalContests = myContests?.length;
    const wonContests = winningContests?.length;
    const winPercentage = totalContests > 0 ? (wonContests / totalContests) * 100 : 0;

    const data = [
        { name: 'Won', value: wonContests },
        { name: 'Lost', value: totalContests - wonContests }
    ];

    const COLORS = ['#0088FE', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const onSubmit = async (data) => {
        const updatedData = {
            name: data.displayName,
            photo: data.profilePicture,
            additionalInfo: data.additionalInfo
        };

        const res = await axiosSecure.patch(`/users/profile/${currentUser.email}`, updatedData);
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                title: "Success",
                text: "Profile updated successfully",
                icon: "success"
            });
            refetch();
        }
    };

    return (
        <div className='flex gap-10 flex-col lg:flex-row mx-5'>
            <div className="bg-white shadow-md rounded-lg p-8 lg:w-1/3">
                <h2 className="text-2xl font-bold mb-6">My Profile</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">Display Name</label>
                        <input
                            defaultValue={currentUser?.name}
                            type="text"
                            id="displayName"
                            {...register('displayName')}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
                        <input
                            defaultValue={currentUser?.photo}
                            type="url"
                            id="profilePicture"
                            {...register('profilePicture')}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">Additional Information</label>
                        <input
                            defaultValue={currentUser?.additionalInfo}
                            type="text"
                            id="additionalInfo"
                            {...register('additionalInfo')}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Update Profile
                    </button>
                </form>
            </div>


            <div className='flex-1'>
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data?.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend></Legend>
                    </PieChart>
                </ResponsiveContainer>
                <div className="text-center mt-2">
                    <p>Total Contests: {totalContests}</p>
                    <p>Won Contests: {wonContests}</p>
                    <p>Win Percentage: {winPercentage.toFixed(2)}%</p>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
