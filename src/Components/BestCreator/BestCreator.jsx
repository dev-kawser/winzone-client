import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const BestCreator = () => {
    const [popularContests, setPopularContests] = useState([]);

    const axiosPublic = useAxiosPublic()

    const { data: contests = [] } = useQuery({
        queryKey: ["contests"],
        queryFn: async () => {
            const res = await axiosPublic.get("/contests");
            return res.data;
        }
    });

    useEffect(() => {
        if (contests.length > 0) {
            const sortedContests = contests.sort((a, b) => b.participantsCount - a.participantsCount);
            setPopularContests(sortedContests.slice(0, 5));
        }
    }, [contests]);

    return (
        <div className="mt-20 container rounded-lg mx-auto bg-gray-100 p-5">
            <div className="w-full bg-[#d32f2f] lg:py-8 py-4">
                <h1 className="text-center ubuntu text-white text-lg lg:text-4xl font-bold">Our Best Creators</h1>
            </div>
            <div className="mt-10">
                <Swiper
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    navigation={true}
                    modules={[Navigation, Autoplay]}
                    className="mySwiper"
                >
                    {popularContests?.map(contest => (
                        <SwiperSlide key={contest._id}>
                            <div className="inter px-20 text-center flex flex-col gap-3 justify-center items-center">
                                <img src={contest.image} alt="" className="rounded-xl" />
                                <p className="text-gray-600">
                                    Contest: {contest.contestName}
                                </p>
                                <p className="text-gray-600">
                                    {contest.contestDescription}
                                </p>
                                <h2 className="text-[#CD9003] text-2xl">
                                    {contest.name}
                                </h2>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default BestCreator;
