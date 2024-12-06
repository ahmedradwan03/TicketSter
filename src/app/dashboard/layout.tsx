import React from 'react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const menuItems = [
        { name: 'Matches', link: '/matches' },
        { name: 'Stadiums', link: '/stadiums' },
        { name: 'Teams', link: '/teams' },
        { name: 'Users', link: '/users' },
    ];

    return (
        <div className="flex flex-col">
            <nav className="bg-primary text-white p-4 flex justify-center items-center">
                <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                        {menuItems.map((item, index) => (
                            <Link key={index} href={`/dashboard${item.link}`}>
                                <span className="px-4 py-2 text-lg text-white hover:bg-white hover:text-primary rounded-full transition duration-300 cursor-pointer">{item.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>
            <div className="flex-1 p-6 bg-gray-100 w[80%]">{children}</div>
        </div>
    );
}
