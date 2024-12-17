import Link from 'next/link';

export default function PaymentSuccess({ searchParams: { price, team1, team2 } }: { searchParams: { price: string; team1: string; team2: string } }) {
    return (
        <div className="h-screen flex items-center justify-center w-[80%] m-auto text-white">
            <div className="max-w-xl mx-auto p-10 text-center bg-opacity-80 bg-gray-900 rounded-lg shadow-2xl">
                <h1 className="text-4xl font-extrabold text-green-400 mb-6">Payment Successful! 🎉</h1>
                <p className="text-2xl text-gray-300 mb-6">
                    You paid <span className="text-green-400">${price}</span> for the match.
                </p>
                <div className="mt-6 text-2xl text-gray-300">
                    <p className="font-semibold">
                        {team1} VS {team2}
                    </p>
                </div>
                <div className="mt-8">
                    <Link href="/my-tickets">
                        <span className="text-xl font-semibold text-green-400 hover:text-green-600 transition duration-300">Go to My Bookings</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
