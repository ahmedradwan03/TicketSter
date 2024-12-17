import React from 'react';
import Image from 'next/image';
import { FaRegCalendar, FaRegClock, FaTicketAlt, FaDollarSign } from 'react-icons/fa';
import { IoFootball } from 'react-icons/io5';
import { FaLocationDot } from 'react-icons/fa6';
import { TbLayoutNavbarInactive } from 'react-icons/tb';
import {  MatchDto, TicketCategoryDto } from '@/app/lib/dtos';

interface TicketCardProps {
    booking: {
        id: number;
        match: MatchDto;
        category: TicketCategoryDto;
    };
}

const TicketCard: React.FC<TicketCardProps> = ({ booking }) => {
    const { match, category } = booking;

    return (
        <div className="w-[90%] max-w-4xl mx-auto p-5 bg-white shadow-lg rounded-lg border border-gray-200">
            <div className="mb-3 flex items-center text-gray-600 text-lg">
                <FaTicketAlt className="mr-2 text-xl" />
                <span className="font-semibold">Booking ID :</span> {booking.id}
            </div>
            <div className="flex justify-around items-center mb-8">
                <div className="text-center">
                    <Image src={match.team1.image} alt={match.team1.name} width={100} height={100}
                    className="object-cover rounded-full mx-auto shadow-md" />
                    <h2 className="text-xl font-semibold mt-3">{match.team1.name}</h2>
                </div>
                <p className="text-3xl font-bold">VS</p>
                <div className="text-center">
                    <Image src={match.team2.image} alt={match.team2.name} width={100} height={100}
                    className="object-cover rounded-full mx-auto shadow-md" />
                    <h2 className="text-xl font-semibold mt-3">{match.team2.name}</h2>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="flex items-center gap-2 text-gray-700 text-lg">
                    <FaLocationDot className="text-xl text-primary" />
                    <span className="font-semibold">{match?.stadium?.name}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 text-lg">
                    <FaDollarSign className="text-xl text-primary" />
                    <span className="font-semibold">Price: </span>
                    <span className="text-gray-800">${category?.price}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 text-lg">
                    <IoFootball className="text-xl text-primary" />
                    <span className="font-semibold">Category: </span>
                    <span className="text-gray-800">{category?.category}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 text-lg">
                    <FaRegCalendar className="text-xl text-primary" />
                    <span className="font-semibold">Date: </span>
                    <span className="text-gray-800">{new Date(match?.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 text-lg">
                    <FaRegClock className="text-xl text-primary" />
                    <span className="font-semibold">Time: </span>
                    <span className="text-gray-800">{new Date(match?.date).toLocaleTimeString()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 text-lg">
                    <TbLayoutNavbarInactive className="text-xl text-primary" />
                    <span className="font-semibold">Status: </span>
                    <span
                        className={new Date(match.date) < new Date() ? 'font-semibold' : 'text-primary '}>{new Date(match.date) < new Date() ? 'Delivered' : 'Upcoming'}</span>
                </div>
            </div>
        </div>
    );
};

export default TicketCard;
