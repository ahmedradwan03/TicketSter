'use client';

import { useState, useEffect } from 'react';
import { updateStadium, getAllStadiums, deleteStadium } from '@/services/stadiums';
import { StadiumDto } from '@/app/lib/dtos';
import { useRouter } from 'next/navigation';

const UpdateStadium = () => {
    const router = useRouter();

    const [stadiums, setStadiums] = useState<StadiumDto[]>([]);
    const [formData, setFormData] = useState<StadiumDto>({
        name: '',
        location: {
            street: '',
            city: '',
        },
        capacity: 0,
    });
    const [error, setError] = useState<string | null>(null);
    const [currentStadiumId, setCurrentStadiumId] = useState<number | null>(null);


    // Fetch stadiums
    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllStadiums();
            if (response.success) {
                setStadiums(response.stadiums);
            } else {
                setError(response.message || 'Failed to fetch stadiums.');
            }
        };
        fetchData();
    }, []);

    // Handle input change
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: 'name' | 'capacity' | 'street' | 'city',
    ) => {
        const { value } = e.target;

        if (field === 'name' || field === 'capacity') {
            setFormData((prevState) => ({
                ...prevState,
                [field]: field === 'capacity' ? Number(value) : value,
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                location: {
                    ...prevState.location,
                    [field]: value,
                },
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.location.street || !formData.location.city || !formData.capacity) {
            setError('All fields are required.');
            return;
        }

        const response = await updateStadium(Number(currentStadiumId), formData);
        if (!response.success) {
            setError(response.message || 'Failed to update stadium.');
            return;
        }

        setError(null);
        setCurrentStadiumId(null);
        router.replace("/dashboard");
    };

    const handleCloseForm = () => {
        setCurrentStadiumId(null);
        setError(null);
    };

    const handleDeleteStadium = async () => {
        const response = await deleteStadium(Number(currentStadiumId));
        if (!response.success) {
            setError(response.message || 'Failed to delete stadium.');
            return;
        }
        console.log(response);
        router.replace("/dashboard");
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Stadium Management</h1>

            {stadiums.map((stadium) => (
                <div key={stadium.id} className="p-4 mb-6 border border-gray-200 rounded-lg shadow-md">
                    <span>{stadium.id}</span>
                    <h2 className="text-2xl font-semibold text-gray-700">{stadium.name}</h2>
                    <p className="text-gray-600">
                        Location: {stadium.location.street}, {stadium.location.city}
                    </p>
                    <p className="text-gray-600">Capacity: {stadium.capacity}</p>

                    <div className="mt-4">
                        <button
                            onClick={() => {
                                setCurrentStadiumId(Number(stadium.id));
                                setError(null);
                                setFormData(stadium);
                            }}
                            className="px-4 py-2 mr-2 text-white bg-primary rounded transition duration-300"
                        >
                            Update
                        </button>
                    </div>

                    {/* Conditional Form */}
                    {currentStadiumId === stadium.id && (
                        <form
                            onSubmit={handleSubmit}
                            className="mt-6 p-6 bg-white shadow-md rounded-lg space-y-6 border border-gray-200"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-semibold text-gray-800">Update Stadium</h2>
                                <button
                                    type="button"
                                    onClick={handleCloseForm}
                                    className="text-red-500 hover:text-red-700 text-[30px]"
                                >
                                    x
                                </button>
                            </div>

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
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="Stadium Name"
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
                                        value={formData.capacity || ''}
                                        onChange={(e) => handleInputChange(e, 'capacity')}
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="Capacity"
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
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="Street"
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
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="City"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex justify-around">
                                <button
                                    type="submit"
                                    className="p-3 bg-primary w-[40%] text-white font-semibold rounded-lg transition duration-300"
                                >
                                    Update Stadium
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDeleteStadium}
                                    className="p-3 bg-red-950 w-[40%] text-white font-semibold rounded-lg transition duration-300"
                                >
                                    Delete Stadium
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            ))}
        </div>
    );
};

export default UpdateStadium;
