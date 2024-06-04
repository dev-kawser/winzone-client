import { useState, useEffect } from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useCurrentUser = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [currentUser, setCurrentUser] = useState(null);


    useEffect(() => {
        const fetchCurrentUser = async () => {

            const res = await axiosSecure.get(`/users/current/${user.email}`);
            setCurrentUser(res.data);

        };

        if (user?.email) {
            fetchCurrentUser();
        }

    }, [user, axiosSecure]);

    return { currentUser };
};

export default useCurrentUser;
