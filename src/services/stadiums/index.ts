import { StadiumDto } from '@/app/lib/dtos';
import { API_BASE_URL, fetcher } from '../fetcher';

export const getAllStadiums = async () => {
    const { success, data, message } = await fetcher(`${API_BASE_URL}/api/stadiums`, {
        method: 'GET',
    });
    return { success, stadiums: success ? data.stadiums : [], message: message || 'Failed to fetch stadiums.' };
};

export const createStadium = async (stadiumData: StadiumDto) => {
    const { success, data, message } = await fetcher(`${API_BASE_URL}/api/stadiums`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stadiumData),
    });
    return { success, stadium: success ? data.stadium : null, message: message || 'Failed to create stadium.' };
};

export const updateStadium = async (stadiumId: number, updatedData: StadiumDto) => {
    const { success, data, message } = await fetcher(`${API_BASE_URL}/api/stadiums/${stadiumId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
    });
    return { success, stadium: success ? data.stadium : null, message: message || 'Failed to update stadium.' };
};

export const deleteStadium = async (stadiumId: number) => {
    const { success, data, message } = await fetcher(`${API_BASE_URL}/api/stadiums/${stadiumId}`, {
        method: 'DELETE',
    });
    return { success, message: message || data.message || 'Failed to delete stadium.' };
};
