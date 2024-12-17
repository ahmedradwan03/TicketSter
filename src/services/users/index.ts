import { API_BASE_URL, fetcher } from '../fetcher';

export const getAllUsers = async () => {
    const { success, data, message } = await fetcher(`${API_BASE_URL}/api/users`, { method: 'GET' });
    return { success, users: success ? data.users : [], message: message || 'Failed to fetch users.' };
};

export const getUserById = async (userId: number) => {
    const { success, data, message } = await fetcher(`${API_BASE_URL}/api/users/${userId}`, { method: 'GET' });
    return { success, user: success ? data.user : null, message: message || 'Failed to fetch user details.' };
};

export const updateUserRoleToAdmin = async (userId: number) => {
    const { success, data, message } = await fetcher(`${API_BASE_URL}/api/users/${userId}/adminRole`, { method: 'PUT', });
    return { success, user: success ? data.userUpdated : null, message: data.message||message || 'Failed to assign admin role to user.', };
};

export const deactivateUser = async (userId: number) => {
    const { success, data, message } = await fetcher(`${API_BASE_URL}/api/users/${userId}/deactivate`, { method: 'PUT', });
    return { success,user: success ? data.userUpdated : null, message: message || data.message || 'Failed to deactivate user.', };
};
