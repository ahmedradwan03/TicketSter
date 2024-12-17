import { deleteSession } from '@/app/lib/session';
import { NextResponse } from 'next/server';

export async function POST() {
    try {
        await deleteSession();
        return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Logout failed. Please try again.' }, { status: 500 });
    }
}
