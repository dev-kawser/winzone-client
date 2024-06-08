import BestCreator from "../../Components/BestCreator/BestCreator";
import ContestAdvertisement from "../../Components/ContestAdvertisement/ContestAdvertisement";
import Banner from "../../Components/ForHome/Banner/Banner";
import PopularContests from "../../Components/PopularContests/PopularContests";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularContests></PopularContests>
            <ContestAdvertisement></ContestAdvertisement>
            <BestCreator></BestCreator>
        </div>
    );
};

export default Home;