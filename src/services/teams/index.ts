import { API_BASE_URL, fetcher } from '../fetcher';
import { TeamDto } from '@/app/lib/dtos';

export const getAllTeams = async () => {
    const { success, data, message } = await fetcher(`${API_BASE_URL}/api/teams`, {
        method: 'GET',
    });

    return {
        success,
        teams: success ? data.teams : [],
        message: message || 'Failed to fetch teams.',
    };
};

export const createTeam = async (teamData: TeamDto) => {
    const { success, data, message } = await fetcher(`${API_BASE_URL}/api/teams`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teamData),
    });

    return {
        success,
        team: success ? data.team : null,
        message: message || 'Failed to create team.',
    };
};

export const updateTeam = async (teamId: number, updatedData: TeamDto) => {
    const { success, data, message } = await fetcher(`${API_BASE_URL}/api/teams/${teamId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
    });

    return {
        success,
        team: success ? data.team : null,
        message: message || 'Failed to update team.',
    };
};

export const deleteTeam = async (teamId: number) => {
    const { success, data, message } = await fetcher(`${API_BASE_URL}/api/teams/${teamId}`, {
        method: 'DELETE',
    });

    return {
        success,
        message: message || data.message || 'Failed to delete team.',
    };
};
