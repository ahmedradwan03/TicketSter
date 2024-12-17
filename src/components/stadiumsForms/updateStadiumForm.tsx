'use client';

import { useState } from 'react';
import { updateStadium, deleteStadium } from '@/services/stadiums';
import { StadiumDto } from '@/app/lib/dtos';
import { useRouter } from 'next/navigation';

interface UpdateStadiumFormProps {
    stadium: StadiumDto;
}

const UpdateStadiumForm: React.FC<UpdateStadiumFormProps> = ({ stadium }) => {
    const router = useRouter();

    const [formData, setFormData] = useState<StadiumDto>({
        name: stadium.name || '',
        location: {
            street: stadium.location.street || '',
            city: stadium.location.city || '',
        },
        capacity: stadium.capacity || 0,
    });

    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'name' | 'capacity' | 'street' | 'city') => {
        const { value } = e.target;

        if (field === 'name' || field === 'capacity') {
            setFormData((prevState) => ({ ...prevState, [field]: field === 'capacity' ? Number(value) : value }));
        } else {
            setFormData((prevState) => ({ ...prevState, location: { ...prevState.location, [field]: value } }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await updateStadium(Number(stadium.id), formData);
        if (!response.success) {
            setError(response.message || 'Failed to update stadium.');
            return;
        }
        setIsFormOpen(false);
        router.refresh();
    };

    const handleDeleteStadium = async () => {
        const response = await deleteStadium(Number(stadium.id));
        if (!response.success) {
            setError(response.message || 'Failed to delete stadium.');
            return;
        }
        router.replace('/dashboard');
    };

    return (
        <div className="container mx-auto mt-8">
            <div className="p-4 border rounded-lg shadow-md mb-4">
                <h2 className="text-2xl font-semibold text-gray-700">{stadium.name}</h2>
                <p className="text-gray-600">
                    Location: {stadium.location.street}, {stadium.location.city}
                </p>
                <p className="text-gray-600">Capacity: {stadium.capacity}</p>
                <button onClick={() => setIsFormOpen(!isFormOpen)} className="mt-4 px-4 py-2 bg-primary text-white rounded  transition duration-300">
                    {isFormOpen ? 'Close' : 'Update Stadium'}
                </button>
                {isFormOpen && (
                    <form onSubmit={handleSubmit} className="mt-6 p-6 bg-white shadow-md rounded-lg space-y-6 border border-gray-200">
                        {error && <p className="text-red-500 text-center">{error}</p>}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block font-medium text-gray-700 mb-1">
                                    Stadium Name
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
                                <label htmlFor="capacity" className="block font-medium text-gray-700 mb-1">
                                    Capacity
                                </label>
                                <input
                                    type="number"
                                    id="capacity"
                                    value={formData.capacity}
                                    onChange={(e) => handleInputChange(e, 'capacity')}
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="street" className="block font-medium text-gray-700 mb-1">
                                    Street
                                </label>
                                <input
                                    type="text"
                                    id="street"
                                    value={formData.location.street}
                                    onChange={(e) => handleInputChange(e, 'street')}
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="city" className="block font-medium text-gray-700 mb-1">
                                    City
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    value={formData.location.city}
                                    onChange={(e) => handleInputChange(e, 'city')}
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex justify-around">
                            <button type="submit" className="p-3 bg-primary text-white font-semibold rounded-lg hover:bg-green-700 transition">
                                Update Stadium
                            </button>
                            <button type="button" onClick={handleDeleteStadium} className="p-3 bg-red-950 text-white font-semibold rounded-lg  transition">
                                Delete Stadium
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UpdateStadiumForm;
