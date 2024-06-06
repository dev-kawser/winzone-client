import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useCurrentUser = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: currentUser, refetch } = useQuery({
        queryKey: ['currentUser', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/current/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    return { currentUser, refetch };
};

export default useCurrentUser;
