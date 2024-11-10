'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function LoginForm() {
    const router = useRouter();

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoding] = useState(false);

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoding(true);
        console.log(formData);

        const response = await fetch(`/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        setLoding(false);
        if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.message || 'An error occurred');
            return;
        }
        router.refresh();
    };

    return (
        <form onSubmit={formSubmitHandler} className="flex flex-col w-[400px]">
            <input className="mb-4 border rounded p-2 " type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <input className="mb-4 border rounded p-2 " type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            {error && <p className="text-red-500 mb-2 text-start">{error}</p>}
            <button disabled={loading} type="submit" className=" text-white bg-primary p-2 rounded-lg font-bold">
                Login
            </button>
        </form>
    );
}
