import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const ContestPayment = () => {
    const contest = useLoaderData();

    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

    return (
        <div className="container mx-auto mt-10">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Payment for {contest.contestName}</h2>
                <img src={contest.contestImage} alt={contest.contestName} className="w-full h-48 object-cover rounded-md mb-4" />
                <p className="mb-4">{contest.description}</p>
                <p className="mb-4 font-bold">Price: ${contest.contestPrice}</p>
                <Elements stripe={stripePromise}>
                    <CheckoutForm contest={contest} />
                </Elements>
            </div>
        </div>
    );
};

export default ContestPayment;
