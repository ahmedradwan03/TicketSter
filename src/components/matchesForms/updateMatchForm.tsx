'use client';

import React, { useState, useEffect } from 'react';
import { updateMatch, getAllMatches, deleteMatch } from '@/services/matches';
import { MatchDto, StadiumDto, TeamDto } from '@/app/lib/dtos';
import { useRouter } from 'next/navigation';
import { getAllTeams } from '@/services/teams';
import { getAllStadiums } from '@/services/stadiums';
import Image from 'next/image';

const UpdateMatch = () => {
    const router = useRouter();

    const [matches, setMatches] = useState<MatchDto[]>([]);
    const [teams, setTeams] = useState<TeamDto[]>([]);
    const [stadiums, setStadiums] = useState<StadiumDto[]>([]);
    const [error, setError] = useState<{ [key: number]: string | null }>({});
    const [formData, setFormData] = useState<{ [key: number]: MatchDto }>({});
    const [openFormId, setOpenFormId] = useState<number | null>(null);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [matchesResponse, teamsResponse, stadiumsResponse] = await Promise.all([
                    getAllMatches(),
                    getAllTeams(),
                    getAllStadiums(),
                ]);

                if (matchesResponse.success) setMatches(matchesResponse.matches);
                if (teamsResponse.success) setTeams(teamsResponse.teams);
                if (stadiumsResponse.success) setStadiums(stadiumsResponse.stadiums);

                const initialFormData: { [key: number]: MatchDto } = {};
                matchesResponse.matches.forEach((match: MatchDto) => {
                    initialFormData[match.id] = { ...match };
                });
                setFormData(initialFormData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchInitialData();
    }, []);

    const handleChange = (id: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target;

        let newValue;
        if (type === 'checkbox') {
            newValue = checked;
        } else if (name === 'date') {
            newValue = new Date(value).toISOString();
        } else {
            newValue = isNaN(Number(value)) ? value : Number(value);
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: { ...prevFormData[id], [name]: newValue },
        }));
    };


    const handleTicketChange = (
        matchId: number,
        categoryIndex: number,
        field: string,
        value: string,
    ) => {
        // Parse price and ticketsAvailable as numbers, but keep other fields as strings
        const newValue = field === 'price' || field === 'ticketsAvailable' ? Number(value) : value;

        setFormData((prevFormData) => {
            const match = prevFormData[matchId] || {};
            const ticketCategories = match.ticketCategories || [];

            const updatedTicketCategories = ticketCategories.map((category, index) =>
                index === categoryIndex
                    ? { ...category, [field]: newValue }
                    : category
            );

            return {
                ...prevFormData,
                [matchId]: {
                    ...match,
                    ticketCategories: updatedTicketCategories,
                },
            };
        });
    };




    const handleSubmit = async (id: number, e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        const matchData = formData[id];

        if (matchData.team1Id === matchData.team2Id) {
            setError((prevError) => ({ ...prevError, [id]: 'Team 1 and Team 2 cannot be the same.' }));
            return;
        }

        const response = await updateMatch(id, matchData);

        if (!response.success) {
            setError((prevError) => ({ ...prevError, [id]: response.message || 'Failed to update match.' }));
            return;
        }

        setError((prevError) => ({ ...prevError, [id]: null }));
        router.replace('/matches');
    };

    const handleDelete = async (id: number) => {
        const response = await deleteMatch(id);
        if (!response.success) {
            setError((prevError) => ({ ...prevError, [id]: 'Failed to delete match.' }));
            return;
        }
        setMatches((prevMatches) => prevMatches.filter((match) => Number(match.id) !== id));
    };

    const toggleForm = (id: number) => {
        setOpenFormId((prev) => (prev === id ? null : id));
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Manage Matches</h1>

            {matches.map((match) => (
                <div key={match.id} className="p-6 mb-8 border border-gray-300 rounded-lg shadow-md">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold text-gray-700">
                            <div className="flex gap-3">
                                    {match.team1.name}
                                    <Image src={match.team1.image} alt={match.team1.name} width={40} height={40} />
                                <span> vs </span>
                                    {match.team2.name}
                                    <Image src={match.team2.image} alt={match.team2.name} width={40} height={40} />
                            </div>
                        </h2>
                        <button
                            onClick={() => toggleForm(match.id)}
                            className="px-4 py-2 bg-primary text-white rounded-md "
                        >
                            {openFormId === match.id ? 'Close' : 'Update Match'}
                        </button>
                    </div>

                    {openFormId === match.id && (
                        <form onSubmit={(e) => handleSubmit(Number(match.id), e)} className="space-y-4 mt-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div>
                                    <label className="font-semibold">Match Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData[match.id]?.name || ''}
                                        onChange={(e) => handleChange(Number(match.id), e)}
                                        className="w-full border rounded-md p-2"
                                    />
                                </div>

                                <div>
                                    <label className="font-semibold">Date</label>
                                    <input
                                        type="datetime-local"
                                        name="date"
                                        value={new Date(formData[match.id].date).toISOString().slice(0, 16)}
                                        onChange={(e) => handleChange(Number(match.id), e)}
                                        className="w-full border rounded-md p-2"
                                    />
                                </div>

                                <div>
                                    <label className="font-semibold">Stadium</label>
                                    <select
                                        name="stadiumId"
                                        value={formData[match.id]?.stadiumId || ''}
                                        onChange={(e) => handleChange(match.id, e)}
                                        className="w-full border rounded-md p-2"
                                    >
                                        <option value="">Select Stadium</option>
                                        {stadiums.map((stadium) => (
                                            <option key={stadium.id} value={stadium.id}>
                                                {stadium.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="font-semibold">Team 1</label>
                                    <select
                                        name="team1Id"
                                        value={formData[match.id]?.team1Id || ''}
                                        onChange={(e) => handleChange(match.id, e)}
                                        className="w-full border rounded-md p-2"
                                    >
                                        <option value="">Select Team 1</option>
                                        {teams?.map((team) => (
                                            <option key={team.id} value={team.id}>
                                                {team.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="font-semibold">Team 2</label>
                                    <select
                                        name="team2Id"
                                        value={formData[match.id]?.team2Id || ''}
                                        onChange={(e) => handleChange(match.id, e)}
                                        className="w-full border rounded-md p-2"
                                    >
                                        <option value="">Select Team 2</option>
                                        {teams?.map((team) => (
                                            <option key={team.id} value={team.id}>
                                                {team.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex justify-start items-center px-2">
                                    <label className="flex gap-2">
                                        <input type="checkbox" name="mainEvent" checked={formData[match.id].mainEvent}
                                               onChange={(e) => handleChange(match.id, e)}
                                               className="w-5 h-5" />
                                        <span className="font-semibold text-gray-700">Main Event</span>
                                    </label>
                                </div>
                            </div>

                                <h2 className="text-xl font-semibold text-gray-800 mb-2">Ticket Categories</h2>
                                {['CAT1', 'CAT2', 'CAT3'].map((category, index) => (
                                    <div key={index} className="flex items-center space-x-4 mb-4">
                                        <div className="w-1/4">
                                            <input
                                                type="text"
                                                value={category}
                                                disabled
                                                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                                            />
                                        </div>
                                        <div className="w-1/4">
                                            <input
                                                type="text"
                                                name="price"
                                                placeholder="Price"
                                                value={formData[match.id]?.ticketCategories?.[index]?.price }
                                                onChange={(e) =>
                                                    handleTicketChange(match.id, index, 'price', e.target.value)
                                                }
                                                className="w-full border rounded-md p-2"
                                            />
                                        </div>
                                        <div className="w-1/4">
                                            <input
                                                type="text"
                                                name="ticketsAvailable"
                                                placeholder="Tickets Available"
                                                value={formData[match.id]?.ticketCategories?.[index]?.ticketsAvailable }
                                                onChange={(e) =>
                                                    handleTicketChange(match.id, index, 'ticketsAvailable', e.target.value)
                                                }
                                                className="w-full border rounded-md p-2"
                                            />
                                        </div>
                                        <div className="w-1/4">
                                            <input
                                                type="text"
                                                name="gate"
                                                placeholder="Gate"
                                                value={formData[match.id]?.ticketCategories?.[index]?.gate }
                                                onChange={(e) =>
                                                    handleTicketChange(match.id, index, 'gate', e.target.value)
                                                }
                                                className="w-full border rounded-md p-2"
                                            />
                                        </div>
                                    </div>
                                ))}

                            {error[match.id] && <div className="text-red-500">{error[match.id]}</div>}

                            <button
                                type="submit"
                                className="px-6 py-3 bg-primary text-white rounded-md mt-4"
                            >
                                Update Match
                            </button>
                        </form>
                    )}

                    <button
                        onClick={() => handleDelete(match.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mt-4"
                    >
                        Delete Match
                    </button>
                </div>
            ))}
        </div>
    );
};

export default UpdateMatch;
