import { getUser } from '@/app/lib/dal';
import TicketCard from '@/components/TicketCard/TicketCard';

const MyTickets = async () => {
    const user = await getUser();

    return (
        <div className="bg-gray-100  text-center flex flex-col gap-3 p-4">
            <h1 className="text-2xl font-bold text-gray-600">My Tickets</h1>
            {user?.bookings && user.bookings.length > 0 ? (
                user.bookings.map((booking: any) => <TicketCard key={booking.id} booking={booking} />)
            ) : (
                <p className="text-gray-600 text-center mt-4">You have no tickets yet.</p>
            )}
        </div>
    );
};

export default MyTickets;
