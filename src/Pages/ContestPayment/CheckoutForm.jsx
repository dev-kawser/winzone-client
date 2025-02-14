/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const CheckoutForm = ({ contest }) => {

    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();



    const price = parseFloat(contest.contestPrice);

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price: price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [axiosSecure, price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
            billing_details: {
                email: user?.email || "anonymous",
                name: user?.displayName || "anonymous",
            },
        });

        if (error) {
            setError(error.message);
        } else {
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
        });

        if (confirmError) {
            setError(confirmError.message);
        } else {
            if (paymentIntent.status === 'succeeded') {


                const registrationDetails = {
                    email: user.email,
                    image: user.photoURL,
                    name: user.displayName,
                    contestId: contest._id,
                    transactionId: paymentIntent.id,
                    status: "Success",
                    contest: contest
                };

                const res = await axiosSecure.post("/register-contest", registrationDetails);
                console.log(res.data);
                if (res.data.success) {

                    Swal.fire({
                        title: "Payment Complete",
                        text: "Now can confirm your participation form my participate page ",
                        icon: "success"
                    });
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button
                className="btn btn-primary btn-circle p-1 mt-4"
                type="submit"
                disabled={!stripe || !clientSecret}
            >
                Pay
            </button>
            <p className="text-sm text-red-700 my-2">
                {error}
            </p>
        </form>
    );
};

export default CheckoutForm;
