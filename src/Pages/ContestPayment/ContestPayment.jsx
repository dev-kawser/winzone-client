import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useForm } from "react-hook-form";
import { useState } from "react";

const ContestPayment = () => {
    const contest = useLoaderData();

    const { register, handleSubmit } = useForm();
    const [task, setTask] = useState("")

    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

    const onSubmit = data => {
        const value = data.task
        setTask(value);
    }

    return (
        <div className="container mx-auto mt-10">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 ubuntu">Payment for <span className="text-3xl font-bold text-[#d32f2f]">{contest.contestName}</span></h2>
                <img src={contest.contestImage} alt={contest.contestName} className="w-full h-48 object-cover rounded-md mb-4" />
                <p className="mb-4 inter">{contest.contestDescription}</p>
                <p className="mb-4 font-bold">Price: ${contest.contestPrice}</p>
                <form onChange={handleSubmit(onSubmit)} className="flex flex-col mb-5">
                    <label htmlFor="area" className="inter text-lg font-medium">Submit Task*</label>
                    <input placeholder="You must be complete Task, Otherwise you cannot register" id="area" className="border-2 p-2 border-black" {...register("task")}></input>
                </form>
                <Elements stripe={stripePromise}>
                    <CheckoutForm task={task} contest={contest} />
                </Elements>
            </div>
        </div>
    );
};

export default ContestPayment;
