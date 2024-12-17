'use client';

import { MatchDto } from '@/app/lib/dtos';
import Image from 'next/image';
import Link from 'next/link';

interface HomeMatchesProps {
    matches: MatchDto[];
    message?: string;
}

const HomeMatches = ({ matches, message }: HomeMatchesProps) => {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="container mx-auto p-5">
                <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-10 tracking-tight leading-tight">
                    Upcoming Main-event Matches
                </h1>
                {message ? (
                    <p className="text-center text-red-500 font-semibold text-lg">{message}</p>
                ) : (
                    <div className="flex justify-center items-center">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8 w-[70%]">
                            {matches
                                .filter((match) => match.mainEvent)
                                .map((match) => (
                                    <div key={match.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow transform hover:scale-105 border-l-4 border-indigo-500">
                                        <div className="flex items-center justify-between mb-6">
                                            <Image src={match.team1.image} alt={match.team1.name} width={60} height={60} className="object-contain rounded-full border-4 border-gray-300 shadow-md" />
                                            <div className="text-center mx-8 flex-1">
                                                <h3 className="text-2xl font-semibold text-gray-800 truncate">
                                                    {match.team1.name} vs {match.team2.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 mt-2">{new Date(match.date).toLocaleString()}</p>
                                            </div>
                                            <Image src={match.team2.image} alt={match.team2.name} width={60} height={60} className="object-contain rounded-full border-4 border-gray-300 shadow-md" />
                                        </div>

                                        <div className="text-center mb-6">
                                            <p className="text-lg font-medium text-indigo-600">{match.stadium.name}</p>
                                            <p className="text-sm text-gray-600 mt-2">Price: From ${match.ticketCategories.find((category) => category.category === 'CAT3')?.price || '-'}</p>
                                        </div>

                                        <div className="mt-6 text-center">
                                            <Link
                                                href={`/booking/${match.id}`}
                                                className=" inline-block bg-gradient-to-r from-green-600 to-blue-600    text-white font-semibold    py-3 px-6    rounded-lg shadow-md     transform hover:scale-105     hover:from-green-500 hover:to-blue-500     transition-all"
                                            >
                                                Buy Ticket
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomeMatches;
