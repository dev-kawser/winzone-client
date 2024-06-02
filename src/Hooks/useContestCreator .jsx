import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useContestCreator = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isCreator, isLoading } = useQuery({
        queryKey: [user?.email, 'isCreator'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/creator/${user.email}`);
            return res.data.creator;
        }
    });

    return { isCreator, isLoading };
};

export default useContestCreator;
