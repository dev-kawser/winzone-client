import useAuth from "../../../Hooks/useAuth";


const Welcome = () => {

    const { user } = useAuth();

    return (
        <div className="ml-2">
            <h1 className="text-2xl inter">
                Hello, Welcome back <br />
                <span className="text-[#d32f2f] ubuntu text-6xl lg:text-7xl font-medium">
                    {user?.displayName}
                </span>
            </h1>
        </div>
    );
};

export default Welcome;