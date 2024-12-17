'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TeamDto } from '@/app/lib/dtos';
import { updateTeam, deleteTeam } from '@/services/teams';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

interface UpdateTeamFormProps {
    team: TeamDto;
    stadiums: { id: number; name: string }[];
}

const UpdateTeamForm: React.FC<UpdateTeamFormProps> = ({ team, stadiums }) => {
    const router = useRouter();

    const [formData, setFormData] = useState<TeamDto>({
        name: team.name || '',
        image: team.image || '',
        stadiumId: team.stadiumId || 0,
        country: team.country || '',
    });

    const [error, setError] = useState<string | null>(null);
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: 'name' | 'stadiumId' | 'country') => {
        const { value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [field]: field === 'stadiumId' ? Number(value) : value,
        }));
    };

    const handleImageUpload = (result: any) => {
        const imageUrl = result?.info?.secure_url;
        if (imageUrl) {
            setFormData((prevState) => ({
                ...prevState,
                image: imageUrl,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.image || !formData.stadiumId || !formData.country) {
            setError('All fields are required.');
            return;
        }
        console.log(formData);
        const response = await updateTeam(Number(team.id), formData);
        if (!response.success) {
            setError(response.message || 'Failed to update team.');
            return;
        }

        setError(null);
        setIsFormOpen(false);
        router.refresh();
    };

    const handleDeleteTeam = async () => {
        const response = await deleteTeam(Number(team.id));
        if (!response.success) {
            setError(response.message || 'Failed to delete team.');
            return;
        }
        setIsFormOpen(false);
        router.refresh();
    };

    return (
        <div className="container mx-auto mt-8">
            <div className="p-4 border rounded-lg shadow-md mb-4">
                <div className="flex justify-start items-center gap-6">
                    <h2 className="text-2xl font-semibold text-gray-700">{team.name}</h2>
                    <Image src={team.image} alt="Team Image" width={50} height={50} className="rounded-lg object-cover" />
                </div>
                <p className="text-gray-600">Country: {team.country}</p>

                <button onClick={() => setIsFormOpen(!isFormOpen)} className="mt-4 px-4 py-2 bg-primary text-white rounded  transition duration-300">
                    {isFormOpen ? 'Close' : 'Update Team'}
                </button>

                {isFormOpen && (
                    <form onSubmit={handleSubmit} className="mt-6 p-6 bg-white shadow-md rounded-lg space-y-6 border border-gray-200">
                        {error && <p className="text-red-500 text-center">{error}</p>}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block font-medium text-gray-700 mb-1">
                                    Team Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange(e, 'name')}
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="image" className="block font-medium text-gray-700 mb-2">
                                    Team Image
                                </label>
                                <div className="mb-4">
                                    {formData.image ? (
                                        <div className="relative">
                                            <Image src={formData.image} alt="Team Image" width={200} height={200} className="rounded-lg object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => setFormData((prev) => ({ ...prev, image: '' }))}
                                                className="absolute top-0 right-0 p-2 bg-red-500 text-white rounded-full"
                                            >
                                                X
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="border-dashed border-2 p-6 text-center text-gray-500 rounded-lg">
                                            <p>No image selected</p>
                                        </div>
                                    )}
                                </div>

                                <CldUploadWidget uploadPreset="ticketster" onSuccess={(result) => handleImageUpload(result)} options={{ folder: 'ticketster/team' }}>
                                    {({ open }) => {
                                        function handleOnClick() {
                                            open();
                                        }

                                        return (
                                            <button type="button" onClick={handleOnClick} className="w-full p-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition duration-300">
                                                {formData.image ? 'Change Image' : 'Upload an Image'}
                                            </button>
                                        );
                                    }}
                                </CldUploadWidget>
                            </div>

                            <div>
                                <label htmlFor="stadiumId" className="block font-medium text-gray-700 mb-1">
                                    Select Stadium
                                </label>
                                <select
                                    id="stadiumId"
                                    value={formData.stadiumId}
                                    onChange={(e) => handleInputChange(e, 'stadiumId')}
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select a stadium</option>
                                    {stadiums.map((stadium) => (
                                        <option key={stadium.id} value={stadium.id}>
                                            {stadium.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="country" className="block font-medium text-gray-700 mb-1">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    id="country"
                                    value={formData.country}
                                    onChange={(e) => handleInputChange(e, 'country')}
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex justify-around">
                            <button type="submit" className="p-3 bg-primary text-white font-semibold rounded-lg hover:bg-green-700 transition">
                                Update Team
                            </button>
                            <button type="button" onClick={handleDeleteTeam} className="p-3 bg-red-950 text-white font-semibold rounded-lg transition">
                                Delete Team
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UpdateTeamForm;
