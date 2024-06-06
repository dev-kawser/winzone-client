import { useForm } from 'react-hook-form';
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useCurrentUser from "../../../Hooks/useCurrentUser";

const MyProfile = () => {
    const { currentUser, refetch } = useCurrentUser();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, } = useForm();

    const onSubmit = async (data) => {

        const name = data.displayName
        const photo = data.profilePicture
        const additionalInfo = data.additionalInfo

        const updatedData = {
            name: name,
            photo: photo,
            additionalInfo: additionalInfo
        }

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
        <div className='flex flex-col lg:flex-row mx-5'>
            <div className="bg-white shadow-md rounded-lg p-8 w-1/3">
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
                hihih
            </div>
        </div>
    );
};

export default MyProfile;
