import useAuth from "../../../Hooks/useAuth";


const Welcome = () => {

    const { user } = useAuth();

    return (
        <div>
            <h1 className="text-3xl inter">
                Hello, Welcome back <br />
                <span className="text-[#d32f2f] ubuntu text-6xl font-medium">
                    {user?.displayName}
                </span>
            </h1>
        </div>
    );
};

export default Welcome;