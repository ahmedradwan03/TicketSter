'use client';
import { useEffect, useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { TicketCategoryDto } from '@/app/lib/dtos';
import { createBooking } from '@/services/booking';

interface CheckoutPageProps {
    ticketCategory: TicketCategoryDto;
    userId: number;
    matchId: number;
}

const CheckoutForm: React.FC<CheckoutPageProps> = ({ ticketCategory, userId, matchId }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(false);


    const amount = ticketCategory.price;

    useEffect(() => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: Math.round(amount * 100) }),
            signal: controller.signal,
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret))
            .catch((error) => {
                if (error.name === 'AbortError') {
                    console.log('Fetch request timed out');
                } else {
                    console.error('Fetch error:', error);
                }
            });

        return () => clearTimeout(timeoutId);
    }, [amount]);


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            setLoading(false);
            return;
        }

        const { error: submitError } = await elements.submit();

        if (submitError) {
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }

        const response = await createBooking({ userId, matchId, categoryId: ticketCategory.id });

        if (!response.success) {
            console.log(response.message);
            setErrorMessage(response.message);
            setLoading(false);
            return;
        }


        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `http://localhost:3000/matches`,
            },
        });

        if (error) {
            setErrorMessage(error.message);
            setLoading(false);
            return;
        }

        console.log('Booking created successfully');

        setLoading(false);
    };

    if (!clientSecret || !stripe || !elements) {
        return (
            <div className="flex items-center justify-center">
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status"
                >
                    <span
                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                    </span>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
            {clientSecret && <PaymentElement />}

            {errorMessage && <div>{errorMessage}</div>}

            <button
                disabled={!stripe || loading}
                className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
            >
                {!loading ? `Pay $${amount}` : 'Processing...'}
            </button>
        </form>
    );
};

export default CheckoutForm;
