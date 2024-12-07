'use client';

import { useState } from 'react';
import { createStadium } from '@/services/stadiums';
import { StadiumDto } from '@/app/lib/dtos';

const CreateStadiumForm = () => {

    const [formData, setFormData] = useState<StadiumDto>({
        name: '',
        location: {
            street: '',
            city: '',
        },
        capacity: 0,
    });

    const [error, setError] = useState<string | null>(null);
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: 'name' | 'capacity' | 'street' | 'city'
    ) => {
        const { name, value } = e.target;

        if (name === 'name' || name === 'capacity') {
            setFormData((prevState) => ({
                ...prevState,
                [name]: name === 'capacity' ? Number(value) : value,
            }));
        }

        // Handle 'street' and 'city' inside location
        if (field === 'street' || field === 'city') {
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

        console.log('Form Data on Submit:', formData);

        const response = await createStadium(formData);

        if (!response.success) {
            setError(response.message || 'Failed to create stadium.');
            return;
        }

        setError(null);
    };



    return (
        <div>
            <button
                onClick={()=>  setIsFormVisible((prev) => !prev)}
                className="p-2 bg-primary text-white rounded"
            >
                {isFormVisible ? 'Close Form' : 'Crate Stadium'}
            </button>
            {isFormVisible && (
                <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg space-y-6">
                    <h1 className="text-3xl font-semibold text-gray-800 text-center">Create Stadium</h1>

                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">

                        <div>
                            <label htmlFor="name" className="block text-gray-700">Stadium Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={(e) => handleInputChange(e, 'name')}
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Stadium Name"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="capacity" className="block text-gray-700">Capacity</label>
                            <input
                                type="number"
                                id="capacity"
                                name="capacity"
                                value={formData.capacity || ''}
                                onChange={(e) => handleInputChange(e, 'capacity')}
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Capacity"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="street" className="block text-gray-700">Street</label>
                            <input
                                type="text"
                                id="street"
                                value={formData.location.street}
                                onChange={(e) => handleInputChange(e, 'street')}
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Street"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="city" className="block text-gray-700">City</label>
                            <input
                                type="text"
                                id="city"
                                value={formData.location.city}
                                onChange={(e) => handleInputChange(e, 'city')}
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="City"
                                required
                            />
                        </div>

                    </div>

                    <button
                        type="submit"
                        className="w-full p-2 bg-primary text-white font-semibold rounded hover:bg-primary-"
                    >
                        Create Stadium
                    </button>
                </form>
            )}
        </div>
    );
};

export default CreateStadiumForm;
