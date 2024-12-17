'use client';

import { login } from '@/services/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function LoginForm() {
    const router = useRouter();

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        setError('');
        setLoading(true);

        const response = await login(formData);
        if (!response.success) {
            setLoading(false);
            setError(response.message || 'Failed to login. Please try again.');
            return;
        }
        router.refresh();
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <form onSubmit={formSubmitHandler} className="flex flex-col w-[400px] p-8 my-2 bg-white shadow-md rounded-lg space-y-6">
            <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={inputChangeHandler}
                className="border border-gray-300 rounded-lg p-3 text-black ocus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={inputChangeHandler}
                className="border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <span className="text-red-500 text-xs">{error}</span>
            <button
                type="submit"
                disabled={loading}
                className={`text-white bg-primary p-3 rounded-lg font-semibold transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-dark'}`}
            >
                {loading ? 'Logging in...' : 'Login'}
            </button>
            <div className="text-center">
                <p className="text-sm text-gray-600">
                    Dont have an account?
                    <Link href="/signup" className="text-primary font-medium hover:underline">
                        Sign up here
                    </Link>
                </p>
            </div>
        </form>
    );
}
