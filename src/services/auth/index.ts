import { LoginUserDto, SignupUserDto } from '@/app/lib/dtos';
import { API_BASE_URL, fetcher } from '../fetcher';

export const login = async (formData: LoginUserDto) => {
    const { success, data, message } = await fetcher(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });

    return { success, user: success ? data.user : null, message: message || 'Login failed. Please try again.' };
};

export const signup = async (formData: SignupUserDto) => {
    const { success, data, message } = await fetcher(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });

    return { success, user: success ? data.user : null, message: message || 'Signup failed. Please try again.' };
};

export const logout = async () => {
    const { success, message } = await fetcher(`${API_BASE_URL}/api/auth/logout`, { method: 'POST' });
    return { success, message: success ? message : 'Logout failed. Please try again.' };
};
