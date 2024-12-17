'use client';
import React, { useState } from 'react';
import { MatchDto, StadiumDto, TeamDto } from '@/app/lib/dtos';
import Image from 'next/image';
import { deleteMatch, updateMatch } from '@/services/matches';
import { useRouter } from 'next/navigation';

interface UpdateMatchFormProps {
    match: MatchDto;
    teams: TeamDto[];
    stadiums: StadiumDto[];
}

const UpdateMatchForm: React.FC<UpdateMatchFormProps> = ({ match, teams, stadiums }) => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: match.name || '',
        date: match.date,
        team1Id: match.team1Id,
        team2Id: match.team2Id,
        stadiumId: match.stadiumId,
        mainEvent: match.mainEvent,
        ticketCategories: [
            {
                category: 'CAT1',
                price: match.ticketCategories[0]?.price || 0,
                ticketsAvailable: match.ticketCategories[0]?.ticketsAvailable || 0,
                gate: match.ticketCategories[0]?.gate || '',
            },
            {
                category: 'CAT2',
                price: match.ticketCategories[1]?.price || 0,
                ticketsAvailable: match.ticketCategories[1]?.ticketsAvailable || 0,
                gate: match.ticketCategories[1]?.gate || '',
            },
            {
                category: 'CAT3',
                price: match.ticketCategories[2]?.price || 0,
                ticketsAvailable: match.ticketCategories[2]?.ticketsAvailable || 0,
                gate: match.ticketCategories[2]?.gate || '',
            },
        ],
    });

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const newValue = isNaN(Number(value)) ? value : Number(value);

        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'date' ? new Date(value).toISOString() : newValue,
        }));
    };

    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

    const handleTicketChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedTicketCategories = [...formData.ticketCategories];
        updatedTicketCategories[index] = {
            ...updatedTicketCategories[index],
            [name]: name === 'price' || name === 'ticketsAvailable' ? Number(value) : value,
        };

        setFormData({ ...formData, ticketCategories: updatedTicketCategories });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);

        const response = await updateMatch(match.id, formData);
        if (!response.success) {
            console.log(response.message);
            setError(response.message || 'Failed to update match.');
            return;
        }
        setIsFormOpen(false);
        router.refresh();
    };

    const handleDeleteMatch = async () => {
        const response = await deleteMatch(Number(match.id));
        if (!response.success) {
            setError(response.message || 'Failed to delete match.');
            return;
        }
        setIsFormOpen(false);
        router.refresh();
    };

    return (
        <div className="bg-white p-4 rounded shadow ">
            <div className="flex items-center mb-4">
                <span className="mr-2">
                    <Image src={match.team1.image} alt={match.team1.name} width={50} height={50} />
                </span>
                <h3 className="text-xl font-bold ml-2">{match.team1.name}</h3>
                <span className="mx-4">vs</span>
                <span className="mr-2">
                    <Image src={match.team2.image} alt={match.team2.name} width={50} height={50} />
                </span>
                <h3 className="text-xl font-bold ml-2">{match.team2.name}</h3>
            </div>
            <div className="mb-5">
                {' '}
                <h2>{match.name}</h2>
            </div>
            <div>
                <button onClick={() => setIsFormOpen((prev) => !prev)} className="p-2 bg-primary text-white rounded">
                    {isFormOpen ? 'Close' : 'Update Match'}
                </button>
                {isFormOpen && (
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-gray-700">Match Name:</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border rounded p-2" />
                            </div>
                            <div>
                                <label className="block text-gray-700">Match Date:</label>
                                <input
                                    type="datetime-local"
                                    name="date"
                                    value={formData.date ? new Date(formData.date).toISOString().slice(0, 16) : ''}
                                    onChange={handleChange}
                                    className="w-full border rounded p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Team 1:</label>
                                <select name="team1Id" value={formData.team1Id} onChange={handleChange} className="w-full border rounded p-2">
                                    <option value="">Select a team</option>
                                    {teams.map((team) => (
                                        <option key={team.id} value={team.id}>
                                            {team.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700">Team 2:</label>
                                <select name="team2Id" value={formData.team2Id} onChange={handleChange} className="w-full border rounded p-2">
                                    <option value="">Select a team</option>
                                    {teams.map((team) => (
                                        <option key={team.id} value={team.id}>
                                            {team.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700">Stadium:</label>
                                <select name="stadiumId" value={formData.stadiumId} onChange={handleChange} className="w-full border rounded p-2">
                                    <option value="">Select a stadium</option>
                                    {stadiums.map((stadium) => (
                                        <option key={stadium.id} value={stadium.id}>
                                            {stadium.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-start items-center px-2">
                                <label className="flex gap-2">
                                    <input
                                        type="checkbox"
                                        name="mainEvent"
                                        checked={formData.mainEvent}
                                        onChange={(e) => setFormData({ ...formData, mainEvent: e.target.checked })}
                                        className="w-5 h-5"
                                    />
                                    <span className="font-semibold text-gray-700">Main Event</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ticket Categories</h2>
                            {formData.ticketCategories.map((category, index) => (
                                <div key={index} className="flex items-center space-x-4 mb-4">
                                    <div className="w-1/4">
                                        <input
                                            type="text"
                                            name="category"
                                            value={category.category}
                                            disabled
                                            className="w-full border border-gray-300 rounded-md p-3 focus:ring focus:ring-primary focus:outline-none"
                                        />
                                    </div>
                                    <div className="w-1/4">
                                        <input
                                            type="text"
                                            name="price"
                                            value={category.price}
                                            onChange={(e) => handleTicketChange(index, e)}
                                            placeholder="Price"
                                            className="w-full border border-gray-300 rounded-md p-3 focus:ring focus:ring-primary focus:outline-none"
                                        />
                                    </div>
                                    <div className="w-1/4">
                                        <input
                                            type="text"
                                            name="ticketsAvailable"
                                            value={category.ticketsAvailable}
                                            onChange={(e) => handleTicketChange(index, e)}
                                            placeholder="Tickets Available"
                                            className="w-full border border-gray-300 rounded-md p-3 focus:ring focus:ring-primary focus:outline-none"
                                        />
                                    </div>
                                    <div className="w-1/4">
                                        <input
                                            type="text"
                                            name="gate"
                                            value={category.gate}
                                            onChange={(e) => handleTicketChange(index, e)}
                                            placeholder="Gate"
                                            className="w-full border border-gray-300 rounded-md p-3 focus:ring focus:ring-primary focus:outline-none"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        {error && <div className="text-red-500 text-center text-sm mb-4">{error}</div>}
                        <div className="flex justify-around">
                            <button type="submit" className="p-3 bg-primary w-[20%] text-white font-semibold rounded-lg transition duration-300">
                                Update Match
                            </button>
                            <button type="button" onClick={handleDeleteMatch} className="p-3 bg-red-950 w-[20%] text-white font-semibold rounded-lg transition duration-300">
                                Delete Match
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UpdateMatchForm;
