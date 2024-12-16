import { API_BASE_URL, fetcher } from '../fetcher';
import { BookingDto } from '@/app/lib/dtos';

export const createBooking = async (bookingData: BookingDto) => {
    const { success, data, message } = await fetcher(`${API_BASE_URL}/api/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
    });
    return { success, session: success ? data : null, message: message || 'Failed to create booking.' };
};