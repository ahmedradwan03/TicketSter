'use client';
import { MatchDto } from '@/app/lib/dtos';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getAllMatches } from '@/services/matches';

const Homematches = () => {
    const [matches, setMatches] = useState<MatchDto[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchMatches() {
            const { matches, message } = await getAllMatches();

            if (matches.length === 0) {
                setError(message);
                return;
            }

            setMatches(matches);
        }

        fetchMatches();
    }, []);

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Upcoming Main-events Matches</h1>

            {error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {matches
                        .filter((match) => match.mainEvent)
                        .map((match) => (
                            <div key={match.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow transform hover:scale-105">
                                <div className="flex items-center justify-between mb-4">
                                    <Image src={match.team1.image} alt={match.team1.name} width={60} height={60} className="object-contain rounded-full border border-gray-300" />
                                    <div className="text-center mx-6">
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            {match.team1.name} vs {match.team2.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-2">{new Date(match.date).toLocaleString()}</p>
                                    </div>
                                    <Image src={match.team2.image} alt={match.team2.name} width={60} height={60} className="object-contain rounded-full border border-gray-300" />
                                </div>

                                <div className="text-center mb-4">
                                    <p className="text-lg font-medium text-green-600">{match.stadium.name}</p>
                                    <p className="text-sm text-gray-500 mt-2">Price: From 185$</p>
                                </div>

                                <div className="mt-6 text-center">
                                    <a
                                        href="#"
                                        className="inline-block bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-all transform hover:scale-105"
                                    >
                                        Buy Ticket
                                    </a>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default Homematches;
