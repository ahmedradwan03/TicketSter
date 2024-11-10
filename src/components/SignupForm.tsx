'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function SignupForm() {
    const router = useRouter();

    const [formData, setFormData] = useState({ email: '', password: '', name: '' });
    const [error, setError] = useState<{ name?: string; email?: string; password?: string }>({});
    const [loading, setLoding] = useState(false);

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoding(true);
        console.log(formData);

        const response = await fetch(`/api/auth/signup`, {
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
        router.replace('/');
    };

    return (
        <form onSubmit={formSubmitHandler} className="flex flex-col w-[400px]">
            <input className="mb-4 border rounded p-2 " type="text" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            {error.name && <p className="text-red-500 mb-2">{error.name}</p>}
            <input className="mb-4 border rounded p-2 " type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            {error.email && <p className="text-red-500 mb-2">{error.email}</p>}
            <input className="mb-4 border rounded p-2 " type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            {error.password && <p className="text-red-500 mb-2">{error.password}</p>}
            <button disabled={loading} type="submit" className=" text-white bg-primary p-2 rounded-lg font-bold">
                Register
            </button>
        </form>
    );
}
