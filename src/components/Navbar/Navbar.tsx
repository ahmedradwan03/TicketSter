'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserDTO } from '@/app/lib/dtos';
import { logout } from '@/services/auth';

export default function Navbar({ user }: { user: UserDTO }) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        const response = await logout();
        if (response.success) {
            router.push('/login');
            router.refresh();
            setLoading(false);
        }
        setLoading(false);
    };

    return (
        <nav className="bg-gray-50">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-primary">TicketSter</span>
                </Link>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-default"
                    aria-expanded={isOpen}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className={`md:block md:w-auto ${isOpen ? 'block' : 'hidden'}`} id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0  border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
                        {['Home', 'About', 'Contact'].map((item, index) => (
                            <li key={index} className="relative">
                                <Link
                                    href={item === 'Home' ? '/' : item.toLowerCase()}
                                    className=" py-2 px-3 text-gray-900 rounded flex items-center group"
                                    aria-current={item === 'Home' ? 'page' : undefined}
                                >
                                    <span className="ml-2 text-primary hover:text-white hover:bg-primary rounded-full px-4 transition duration-300">{item}</span>
                                </Link>
                            </li>
                        ))}
                        <Link href={'/matches'} className="py-2 px-3 text-gray-900 rounded flex items-center group">
                            <span className="ml-2 text-primary hover:text-white hover:bg-primary rounded-full px-4 transition duration-300">Matches</span>
                        </Link>
                        {user ? (
                            <div className="flex">
                                {user.role === 'ADMIN' ? (
                                    <Link href={'/dashboard'} className="py-2 px-3 text-gray-900 rounded flex items-center group">
                                        <span className="ml-2 text-primary hover:text-white hover:bg-primary rounded-full px-4 transition duration-300">Dashboard</span>
                                    </Link>
                                ) : (
                                    <Link href="/my-tickets" className="ml-2 py-2 px-3 text-primary">
                                        <span>{user?.name?.toUpperCase()} | </span>
                                    </Link>
                                )}
                                <button disabled={loading} onClick={handleLogout} className="py-2 px-8 rounded-[50px] text-white bg-primary">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link href="/login" className="py-2 px-8 rounded-[50px] text-white bg-primary">
                                Login
                            </Link>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
