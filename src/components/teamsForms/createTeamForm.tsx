'use client';
import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';
import { TeamDto } from '@/app/lib/dtos';
import { createTeam } from '@/services/teams';

const CreateTeamForm: React.FC<{ stadiums: { id: number; name: string }[] }> = ({ stadiums }) => {
    const [formData, setFormData] = useState<TeamDto>({
        name: '',
        image: '',
        stadiumId: 0,
        country: '',
    });

    const [error, setError] = useState<string | null>(null);
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: 'name' | 'image' | 'stadiumId' | 'country') => {
        const { name, value } = e.target;
        if (name === field) {
            setFormData((prevState) => ({
                ...prevState,
                [name]: name === 'stadiumId' ? Number(value) : value,
            }));
        }
    };

    const handleImageUpload = (result: any) => {
        const imageUrl = result?.info?.secure_url;
        if (imageUrl) setFormData((prevState) => ({ ...prevState, image: imageUrl }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.image || !formData.stadiumId || !formData.country) {
            setError('All fields are required.');
            return;
        }

        const response = await createTeam(formData);
        if (!response.success) {
            setError(response.message || 'Failed to create team.');
            return;
        }

        setError(null);
    };

    return (
        <div>
            <button onClick={() => setIsFormVisible((prev) => !prev)} className="p-2 bg-primary text-white rounded">
                {isFormVisible ? 'Close' : 'Crate Team'}
            </button>
            {isFormVisible && (
                <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg space-y-6">
                    <h1 className="text-3xl font-semibold text-gray-800 text-center">Create Team</h1>

                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-gray-700">
                                Team Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={(e) => handleInputChange(e, 'name')}
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Team Name"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="image" className="block text-gray-700">
                                Image
                            </label>
                            <CldUploadWidget uploadPreset="ticketster" onSuccess={(result) => handleImageUpload(result)} options={{ folder: 'ticketster/team' }}>
                                {({ open }) => {
                                    function handleOnClick() {
                                        open();
                                    }

                                    return (
                                        <button type="button" onClick={handleOnClick} className="bg-primary p-2 rounded text-white">
                                            Upload an Image
                                        </button>
                                    );
                                }}
                            </CldUploadWidget>
                        </div>

                        <div>
                            <label htmlFor="stadiumId" className="block text-gray-700">
                                Select Stadium
                            </label>
                            <select
                                id="stadiumId"
                                name="stadiumId"
                                value={formData.stadiumId}
                                onChange={(e) => handleInputChange(e, 'stadiumId')}
                                className="w-full p-2 border border-gray-300 rounded"
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
                            <label htmlFor="country" className="block text-gray-700">
                                Country
                            </label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={(e) => handleInputChange(e, 'country')}
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Country"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full p-2 bg-primary text-white font-semibold rounded hover:bg-primary-600">
                        Create Team
                    </button>
                </form>
            )}
        </div>
    );
};

export default CreateTeamForm;
