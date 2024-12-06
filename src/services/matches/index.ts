import { MatchDto } from '@/app/lib/dtos';
import { API_BASE_URL, fetcher } from '../fetcher';

export const getAllMatches = async () => {
    const { success, data, message } = await fetcher(`${API_BASE_URL}/api/matches`, { method: 'GET' });
    return { success, matches: success ? data.matches : [], message: message || 'Failed to fetch matches.' };
};

export const createMatch = async (matchData: {
    name: string;
    date: string;
    stadiumId: number;
    team1Id: number;
    team2Id: number;
    mainEvent: boolean;
    ticketCategories?: {
        category: string;
        price: number;
        ticketsAvailable: number;
        gate: string;
    }[];
}) => {
    const { success, data, message } = await fetcher(`${API_BASE_URL}/api/matches`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(matchData),
    });
    return { success, match: success ? data.match : null, message: message || 'Failed to create match.' };
};

export const updateMatch = async (matchId: number, updatedData: MatchDto) => {
    const { success, data, message } = await fetcher(`${API_BASE_URL}/api/matches/${matchId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
    });
    return { success, match: success ? data.match : null, message: message || 'Failed to update match.' };
};

export const deleteMatch = async (matchId: number) => {
    const { success, data, message } = await fetcher(`${API_BASE_URL}/api/matches/${matchId}`, {
        method: 'DELETE',
    });
    return { success, message: message || data.message || 'Failed to delete match.' };
};
