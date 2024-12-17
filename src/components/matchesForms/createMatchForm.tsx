'use client';
import React, { useState } from 'react';
import { createMatch } from '@/services/matches';
import { StadiumDto, TeamDto, TicketCategoryDto, TicketCategoryEnum } from '@/app/lib/dtos';
import { useRouter } from 'next/navigation';

interface CreateMatchFormProps {
    teams: TeamDto[];
    stadiums: StadiumDto[];
}

const CreateMatchForm = ({ teams, stadiums }: CreateMatchFormProps) => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        date: '',
        stadiumId: 0,
        team1Id: 0,
        team2Id: 0,
        mainEvent: false,
        ticketCategories: [] as TicketCategoryDto[],
    });

    const [error, setError] = useState<string | null>(null);
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const newValue = isNaN(Number(value)) ? value : Number(value);

        setFormData((prevData) => ({
            ...prevData,
            [name]: newValue,
        }));
    };

    const handleTicketChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const parsedValue = ['price', 'ticketsAvailable'].includes(name) ? Number(value) : value;
        const updatedTicketCategories = [...formData.ticketCategories];
        updatedTicketCategories[index] = {
            ...updatedTicketCategories[index],
            category: ['CAT1', 'CAT2', 'CAT3'][index] as TicketCategoryEnum,
            [name]: parsedValue,
        };

        setFormData((prev) => ({
            ...prev,
            ticketCategories: updatedTicketCategories,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await createMatch(formData);
        if (!response.success) {
            console.log(response.message);
            setError(response.message || 'Failed to create match.');
            return;
        }

        setIsFormOpen(false);
        router.refresh();
    };

    return (
        <div>
            <button onClick={() => setIsFormOpen((prev) => !prev)} className="p-2 bg-primary text-white rounded">
                {isFormOpen ? 'Close' : 'Create Match'}
            </button>
            <div
                className={`transition-all duration-1000 transform ${isFormOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionProperty: 'opacity, transform' }}
            >
                {isFormOpen && (
                    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg space-y-6">
                        <h1 className="text-3xl font-semibold text-gray-800 text-center">Create Match</h1>
                        {error && <div className="text-red-500 text-center text-sm mb-4">{error}</div>}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div>
                                <label className="font-semibold text-gray-700 mb-1">Match Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter match name"
                                    className="w-full border border-gray-300 rounded-md p-3 focus:ring focus:ring-primary focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="font-semibold text-gray-700 mb-1">Date</label>
                                <input
                                    type="datetime-local"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-md p-3 focus:ring focus:ring-primary focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="font-semibold text-gray-700 mb-1">Stadium</label>
                                <select
                                    name="stadiumId"
                                    value={formData.stadiumId}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-md p-3 focus:ring focus:ring-primary focus:outline-none"
                                >
                                    <option value="">Select Stadium</option>
                                    {stadiums?.map((stadium) => (
                                        <option key={stadium.id} value={stadium.id}>
                                            {stadium.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="font-semibold text-gray-700 mb-1">Team 1</label>
                                <select
                                    name="team1Id"
                                    value={formData.team1Id}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-md p-3 focus:ring focus:ring-primary focus:outline-none"
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
                                <label className="font-semibold text-gray-700 mb-1">Team 2</label>
                                <select
                                    name="team2Id"
                                    value={formData.team2Id}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-md p-3 focus:ring focus:ring-primary focus:outline-none"
                                >
                                    <option value="">Select Team 2</option>
                                    {teams?.map((team) => (
                                        <option key={team.id} value={team.id}>
                                            {team.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-start items-center px-2">
                            <label className="flex gap-2">
                                <input type="checkbox" name="mainEvent" checked={formData.mainEvent} onChange={(e) => setFormData({ ...formData, mainEvent: e.target.checked })} className="w-5 h-5" />
                                <span className="font-semibold text-gray-700">Main Event</span>
                            </label>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800">Ticket Categories</h2>
                            {['CAT1', 'CAT2', 'CAT3'].map((category, index) => (
                                <div key={index} className="flex items-center space-x-4 mb-4">
                                    <div className="w-1/4">
                                        <input
                                            type="text"
                                            name="category"
                                            value={category}
                                            disabled
                                            className="w-full border border-gray-300 rounded-md p-3 focus:ring focus:ring-primary focus:outline-none"
                                        />
                                    </div>
                                    <div className="w-1/4">
                                        <input
                                            type="text"
                                            name="price"
                                            value={formData.ticketCategories[index]?.price || ''}
                                            onChange={(e) => handleTicketChange(index, e)}
                                            placeholder="Price"
                                            className="w-full border border-gray-300 rounded-md p-3 focus:ring focus:ring-primary focus:outline-none"
                                        />
                                    </div>
                                    <div className="w-1/4">
                                        <input
                                            type="text"
                                            name="ticketsAvailable"
                                            value={formData.ticketCategories[index]?.ticketsAvailable || ''}
                                            onChange={(e) => handleTicketChange(index, e)}
                                            placeholder="Tickets Available"
                                            className="w-full border border-gray-300 rounded-md p-3 focus:ring focus:ring-primary focus:outline-none"
                                        />
                                    </div>
                                    <div className="w-1/4">
                                        <input
                                            type="text"
                                            name="gate"
                                            value={formData.ticketCategories[index]?.gate || ''}
                                            onChange={(e) => handleTicketChange(index, e)}
                                            placeholder="Gate"
                                            className="w-full border border-gray-300 rounded-md p-3 focus:ring focus:ring-primary focus:outline-none"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button type="submit" className="w-full bg-primary text-white py-3 rounded-md text-lg font-medium hover:bg-primary-dark">
                            Create Match
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default CreateMatchForm;
