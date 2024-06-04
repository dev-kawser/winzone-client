
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import Swal from "sweetalert2";


const ContestUpdate = () => {

    const contest = useLoaderData();
    const { contestName, contestPrice, contestImage, contestTask, contestType, contestDescription, _id } = contest

    const [startDate, setStartDate] = useState(null);

    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
    } = useForm();


    const onSubmit = async (data) => {

        const contestName = data.contestName
        const contestPrice = data.contestPrice
        const contestImage = data.contestImage
        const contestTask = data.contestTask
        const contestType = data.contestType
        const contestDescription = data.contestDescription
        const contestDeadline = startDate.toISOString().split('T')[0];

        const UpdateContestInfo = {

            contestName: contestName,
            contestPrice: contestPrice,
            contestImage: contestImage,
            contestTask: contestTask,
            contestType: contestType,
            contestDescription: contestDescription,
            contestDeadline: contestDeadline,

        }


        const res = await axiosSecure.put(`/contests/update/${_id}`, UpdateContestInfo);
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Contest Update Successfully`,
                showConfirmButton: false,
                timer: 1500
            });
        }

    }



    return (
        <div>
            <div className="w-full bg-[#d32f2f] lg:py-8 py-4">
                <h1 className="text-center ubuntu text-white text-lg lg:text-2xl font-bold">Update Contest Here</h1>
            </div>
            <div>
                <div className="flex items-center justify-center p-12">
                    <div className="mx-auto w-full max-w-[550px]">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="-mx-3 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label
                                            htmlFor="fName"
                                            className="mb-3 block text-base font-medium text-[#07074D]"
                                        >
                                            Contest Name*
                                        </label>
                                        <input
                                            type="text"
                                            name="fName"
                                            id="fName"
                                            defaultValue={contestName}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            {...register("contestName")}
                                        />
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label
                                            htmlFor="lName"
                                            className="mb-3 block text-base font-medium text-[#07074D]"
                                        >
                                            Contest Price*
                                        </label>
                                        <input
                                            type="number"
                                            name="lName"
                                            defaultValue={contestPrice}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            {...register("contestPrice")}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5">
                                <label
                                    htmlFor="guest"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Contest Image*
                                </label>
                                <input
                                    type="url"
                                    name="guest"
                                    id="guest"
                                    defaultValue={contestImage}
                                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    {...register("contestImage")}
                                />
                            </div>
                            <div className="mb-5">
                                <label
                                    htmlFor="guest2"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Contest Description*
                                </label>
                                <input
                                    type="text"
                                    name="guest2"
                                    id="guest2"
                                    defaultValue={contestDescription}
                                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    {...register("contestDescription")}
                                />
                            </div>
                            <div className="mb-5">
                                <label
                                    htmlFor="guest23"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Contest Task*
                                </label>
                                <input
                                    type="text"
                                    name="guest23"
                                    id="guest23"
                                    defaultValue={contestTask}
                                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    {...register("contestTask")}
                                />
                            </div>

                            <div className="-mx-3 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label className="mb-3 block text-base font-medium text-[#07074D]">
                                            Contest Type*
                                        </label>
                                        <select
                                            defaultValue={contestType}
                                            {...register("contestType")}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        >
                                            <option disabled value={"null"}>
                                                Select By Tags
                                            </option>
                                            <option value="imageDesign">Image Design</option>
                                            <option value="digitalAdvertisement">
                                                Digital advertisement
                                            </option>
                                            <option value="marketingStrategy">
                                                Marketing Strategy
                                            </option>
                                            <option value="articleWriting">Article Writing</option>
                                            <option value="gamingReview">Gaming Review</option>
                                            <option value="bookReview">Book Review</option>
                                            <option value="businessIdea">Business Idea</option>
                                            <option value="movieReview">Movie Review</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label className="mb-3 block text-base font-medium text-[#07074D]">
                                            Contest Deadline*
                                        </label>
                                        <ReactDatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            placeholderText="Select Deadline"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="hover:shadow-form rounded-md bg-[#d32f2f] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContestUpdate;