import Image from 'next/image';
import { MatchDto } from '@/app/lib/dtos';
import Link from 'next/link';
import { FaClock } from 'react-icons/fa';
import { IoFootball } from 'react-icons/io5';
import { SlCalender } from 'react-icons/sl';

const MatchCard = ({ match }: { match: MatchDto }) => {
    return (
        <div className="max-w-4xl w-full mx-auto border rounded-lg shadow-lg bg-white p-4 flex flex-col md:flex-row items-center gap-6 h-full">
            <div className="flex items-center gap-4 flex-1 justify-center">
                <div className="flex flex-col items-center w-[50%]">
                    <Image src={match.team1.image} alt={match.team1.name} width={56} height={56} className="rounded-full object-cover w-[70%]" />
                    <span className="text-sm font-semibold mt-2 text-center">{match.team1.name}</span>
                </div>
                <span className="text-lg font-semibold text-gray-600">vs</span>
                <div className="flex flex-col items-center w-[50%]">
                    <Image src={match.team2.image} alt={match.team2.name} width={56} height={56} className="rounded-full object-cover w-[70%]" />
                    <span className="text-sm font-semibold mt-2 text-center">{match.team2.name}</span>
                </div>
            </div>
            <div className="flex flex-col gap-1 flex-1">
                <div className="font-bold text-[15px] text-gray-800 overflow-ellipsis overflow-hidden whitespace-nowrap">{match.name.length > 25 ? `${match.name.slice(0, 25)}...` : match.name}</div>
                <div className="text-sm text-gray-600 flex items-center gap-1">
                    <IoFootball className="text-gray-500" />
                    <span className="font-medium">Stadium:</span>
                    <span className="text-gray-700">{match.stadium.name.length > 15 ? `${match.stadium.name.slice(0, 15)}...` : match.stadium.name}</span>
                </div>
            </div>
            <div className="flex flex-col gap-1 flex-1">
                <div className="text-sm text-gray-500 flex items-center gap-1">
                    <SlCalender />
                    <span className="font-medium">Date:</span> {new Date(match.date).toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                    <FaClock />
                    <span className="font-medium">Time:</span> {new Date(match.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
            <div className="flex flex-col items-center">
                <Link
                    href={`/booking/${match.id}`}
                    className="inline-block bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 hover:from-green-500 hover:to-blue-500 transition-all"
                >
                    Buy Ticket
                </Link>
            </div>
        </div>
    );
};

export default MatchCard;
