import UserSearch from '@/components/usersform/userSearch';

export default async function Users() {

    return (
        <div className="w-[80%] mx-auto p-8 flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            <UserSearch />
        </div>
    );
}
