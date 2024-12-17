'use client';
import { useState } from 'react';
import { UserDTO } from '@/app/lib/dtos';
import { deactivateUser, getUserById, updateUserRoleToAdmin } from '@/services/users';
import TicketCard from '@/components/TicketCard/TicketCard';

const UserSearch = () => {
    const [searchText, setSearchText] = useState('');
    const [user, setUser] = useState<UserDTO | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [actionMessage, setActionMessage] = useState<string | null>(null);

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setUser(null);

        if (isNaN(Number(searchText))) {
            setError('Please enter a valid number');
            return;
        }
        const response = await getUserById(Number(searchText));
        if (!response.success) {
            setError(response.message);
            return;
        }
        setUser(response.user);
    };

    const handleMakeAdmin = async () => {
        if (!user) return;
        const response = await updateUserRoleToAdmin(user.id);
        setActionMessage(response.message);
        if (response.success && response.user) {
            setUser(response.user);
        }
    };

    const handleDeactivateUser = async () => {
        if (!user) return;
        const response = await deactivateUser(user.id);
        setActionMessage(response.message);
        if (response.success && response.user) {
            setUser(response.user);
        }
    };

    return (
        <div className="my-5 w-full md:w-2/3 m-auto">
            <form onSubmit={formSubmitHandler} className="mb-5">
                <input
                    className="w-full p-3 rounded text-xl border border-gray-300 text-gray-900"
                    type="search"
                    placeholder="Search for a user by ID"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <button type="submit" className="mt-3 p-2 w-full rounded bg-primary text-white ">
                    Search
                </button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
            {user && (
                <div className="p-6 border border-gray-300 rounded-lg bg-white shadow-lg">
                    {/* Header Section */}
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-3xl font-bold text-gray-800">User Details</h2>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${user.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {user.active ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                    <div className="space-y-3 text-gray-700">
                        <p className="flex items-center">
                            <span className="font-semibold w-1/4">ID:</span>
                            <span>{user.id}</span>
                        </p>
                        <p className="flex items-center">
                            <span className="font-semibold w-1/4">Name:</span>
                            <span>{user.name}</span>
                        </p>
                        <p className="flex items-center">
                            <span className="font-semibold w-1/4">Email:</span>
                            <span>{user.email}</span>
                        </p>
                        <p className="flex items-center">
                            <span className="font-semibold w-1/4">Role:</span>
                            <span className="uppercase text-blue-600 font-medium">{user.role}</span>
                        </p>
                    </div>
                    <div className="flex justify-end mt-6 gap-3">
                        <button onClick={handleMakeAdmin} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg shadow  transition-all">
                            {user.role === 'ADMIN' ? 'Remove Admin' : 'Make Admin'}
                        </button>
                        <button onClick={handleDeactivateUser} className="flex items-center gap-2 px-4 py-2 bg-red-950 text-white rounded-lg shadow hover:bg-red-700 transition-all">
                            {user.active ? 'Deactivate User' : 'Activate User'}
                        </button>
                    </div>
                    {actionMessage && <div className="mt-4 p-3 text-sm text-center font-medium rounded-lg bg-red-100 text-red-700">{actionMessage}</div>}
                </div>
            )}
            <div className="flex flex-col mt-6 gap-3">
                <h1 className="text-3xl text-gray-500 text-center mb-5">User Tickets</h1>
                {user?.bookings?.length ? (
                    user.bookings.map((booking: any) => <TicketCard key={booking.id} booking={booking} />)
                ) : (
                    <p className="text-center text-gray-500 mt-4">No bookings found for this user.</p>
                )}
            </div>
        </div>
    );
};
export default UserSearch;
