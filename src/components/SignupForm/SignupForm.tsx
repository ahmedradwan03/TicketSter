'use client';

import { signup } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

interface ErrorMessages {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    message?: string;
}

export function SignupForm() {
    const router = useRouter();

    const [formData, setFormData] = useState({ email: '', password: '', name: '', confirmPassword: '' });
    const [error, setError] = useState<ErrorMessages>({});
    const [loading, setLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setError({});
        setLoading(true);

        if (!isChecked) {
            setError({ message: 'You must agree to the terms and conditions.' });
            setLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError({ confirmPassword: 'Passwords do not match' });
            setLoading(false);
            return;
        }

        const response = await signup(formData);
        if (!response.success) {
            setLoading(false);
            setError(response.message || 'Failed to register. Please try again.');
            return;
        }
        router.refresh();
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const checkboxChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked);
    };

    return (
        <form onSubmit={formSubmitHandler} className="flex flex-col w-[400px] p-6 bg-white shadow-md rounded-lg space-y-6">
            {error.message && <p className="text-red-500 mb-2">{error.message}</p>}

            <div className="flex flex-col">
                <input
                    name="name"
                    className="border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-primary"
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={inputChangeHandler}
                />
                {error.name && <span className="text-red-500 text-xs px-2">{error.name}</span>}
            </div>

            <div className="flex flex-col">
                <input
                    name="email"
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none text-black focus:ring-2 focus:ring-primary"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={inputChangeHandler}
                />
                {error.email && <p className="text-red-500 text-xs">{error.email}</p>}
            </div>

            <div className="flex flex-col">
                <input
                    name="password"
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none text-black focus:ring-2 focus:ring-primary"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={inputChangeHandler}
                />
                {error.password && <p className="text-red-500 text-xs">{error.password}</p>}
            </div>

            <div className="flex flex-col">
                <input
                    name="confirmPassword"
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none text-black focus:ring-2 focus:ring-primary"
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={inputChangeHandler}
                />
                {error.confirmPassword && <span className="text-red-500 text-xs">{error.confirmPassword}</span>}
            </div>

            <div className="flex items-center mb-4">
                <input type="checkbox" id="terms" checked={isChecked} onChange={checkboxChangeHandler} className="mr-2" />
                <label htmlFor="terms" className="text-black">
                    I agree to the{' '}
                    <Link href="/" className="text-primary">
                        terms and conditions
                    </Link>
                </label>
            </div>

            <button disabled={loading} type="submit" className="text-white bg-primary p-2 rounded-lg font-bold">
                {loading ? 'Registering...' : 'Register'}
            </button>
        </form>
    );
}
