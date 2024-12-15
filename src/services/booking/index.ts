import { API_BASE_URL, fetcher } from '../fetcher';
import { BookingDto } from '@/app/lib/dtos';

export const createBooking = async (bookingData: BookingDto) => {
    console.log(bookingData);
    const { success, data, message } = await fetcher(`${API_BASE_URL}/api/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
    });
    return { success, booking: success ? data.booking : null, message: message || 'Failed to create booking.' };
};