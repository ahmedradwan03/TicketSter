'use client';

import React, { useState } from 'react';
import { MatchDto, TicketCategoryDto } from '@/app/lib/dtos';
import { createBooking } from '@/services/booking';
import Image from 'next/image';

interface BookingFormProps {
    match: MatchDto;
    userId: number;
}

export default function BookingForm({ match, userId }: BookingFormProps) {
    const [selectedCategory, setSelectedCategory] = useState<TicketCategoryDto | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const onClick = async () => {
        setLoading(true);

        if (!selectedCategory) {
            setError('Please select a ticket category.');
            return;
        }
        const response = await createBooking({ userId, matchId: match.id, categoryId: selectedCategory.id });

        if (!response.success) {
            setLoading(false);
            setError(response.message);
            return;
        }
        window.location.assign(response.session.url);
        setLoading(false);
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">{match.name}</h1>

            <div className="flex flex-col items-center mb-4">
                <span className="text-lg font-semibold text-gray-700">Stadium: {match.stadium.name}</span>
                <p className="text-gray-800 text-center text-md mt-1">
                    {match.stadium.location.city}, {match.stadium.location.street}
                </p>
            </div>

            <div className="flex justify-center items-center gap-4 text-gray-600 text-lg">
                <div className="flex items-center">
                    <span className="font-semibold text-gray-700 mr-2">Date:</span>
                    <span>{new Date(match.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <span className="text-gray-400">|</span>
                <div className="flex items-center">
                    <span className="font-semibold text-gray-700 mr-2">Time:</span>
                    <span>
                        {new Date(match.date).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                        })}
                    </span>
                </div>
            </div>

            <div className="flex justify-around items-center mb-8">
                <div className="text-center">
                    <Image src={match.team1.image} alt={match.team1.name} width={128} height={128} className="object-cover rounded-full mx-auto shadow-md" />
                    <h2 className="text-xl font-semibold mt-3">{match.team1.name}</h2>
                    <p className="text-gray-500">{match.team1.country}</p>
                </div>
                <p className="text-3xl font-bold">VS</p>
                <div className="text-center">
                    <Image src={match.team2.image} alt={match.team2.name} width={128} height={128} className="object-cover rounded-full mx-auto shadow-md" />
                    <h2 className="text-xl font-semibold mt-3">{match.team2.name}</h2>
                    <p className="text-gray-500">{match.team2.country}</p>
                </div>
            </div>
            <div className="mb-8">
                <label className="block mb-3 text-lg font-semibold text-gray-800">Select Ticket Category:</label>
                <div className="space-x-4 overflow-x-auto flex justify-center items-center">
                    {match.ticketCategories.map((category) => (
                        <div
                            key={category.category}
                            className={`p-4 border rounded-lg shadow-md flex flex-col items-center cursor-pointer hover:bg-gray-100 transition-all ${
                                selectedCategory?.category === category.category ? 'bg-blue-100 border-blue-300' : 'bg-white'
                            }`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            <span className="font-semibold text-gray-800 text-center">{category.category}</span>
                            <span className="text-sm text-gray-500 text-center mt-2">Price: ${category.price}</span>
                            {selectedCategory?.category === category.category && <span className="text-green-500 font-semibold mt-2">Selected</span>}
                        </div>
                    ))}
                </div>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="text-center">
                <button
                    type="submit"
                    onClick={onClick}
                    disabled={loading}
                    className={`inline-block bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition-all ${
                        loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-green-500 hover:to-blue-500'
                    }`}
                >
                    {loading ? 'Booking...' : 'Book Now'}
                </button>
            </div>
        </div>
    );
}
