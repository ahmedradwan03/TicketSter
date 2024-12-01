import Image from 'next/image';

const MatchCard = ({ match }) => {
    return (
        <div
            className="max-w-4xl w-full mx-auto border rounded-lg shadow-lg bg-white p-4 flex flex-col md:flex-row items-center gap-6 h-full">
            <div className="flex items-center gap-4 flex-1 justify-center">
                <div className="flex flex-col items-center w-[50%]  ">
                    <Image
                        src={match.team1.image}
                        alt={match.team1.name}
                        width={56}
                        height={56}
                        className="rounded-full object-cover w-[70%]"
                    />
                    <span className="text-sm font-semibold mt-2 text-center">{match.team1.name}</span>
                </div>

                <span className="text-lg font-semibold text-gray-600">vs</span>

                <div className="flex flex-col items-center w-[50%] ">
                    <Image
                        src={match.team2.image}
                        alt={match.team2.name}
                        width={56}
                        height={56}
                        className="rounded-full object-cover  w-[70%]"
                    />
                    <span className="text-sm font-semibold mt-2 text-center">{match.team2.name}</span>
                </div>
            </div>

            <div className="flex flex-col gap-1 flex-1">
                <div className="text-sm text-gray-500">
                    <span className="font-medium">Match Name:</span> {match.name}
                </div>
                <div className="text-sm text-gray-500">
                    <span
                        className="font-medium">Stadium Location:</span> {match.stadium.location.city}, {match.stadium.location.street}
                </div>
            </div>

            <div className="flex flex-col gap-1 flex-1">
                <div className="text-sm text-gray-500">
                    <span className="font-medium">Stadium:</span> {match.stadium.name}
                </div>
                <div className="text-sm text-gray-500">
                    <span className="font-medium">Date:</span> {new Date(match.date).toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-500">
                    <span className="font-medium">Time:</span> {new Date(match.date).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                })}
                </div>
            </div>

            <div className="flex flex-col items-center">
                <button
                    className={`px-6 py-2 rounded-lg text-sm font-semibold ${
                        match.ticketCategories.length > 0 ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                    }`}
                    disabled={match.ticketCategories.length === 0}
                >
                    {match.ticketCategories.length > 0 ? 'Book Ticket' : 'Unavailable'}
                </button>
                <span
                    className={`mt-2 text-sm font-medium ${
                        match.ticketCategories.length > 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                >
                    {match.ticketCategories.length > 0 ? 'Available' : 'Sold Out'}
                </span>
            </div>
        </div>
    );
};

export default MatchCard;
