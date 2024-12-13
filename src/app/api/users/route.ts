import { NextResponse } from 'next/server';
import prisma from '@/app/lib/database';
import { verifyAdmin } from '@/app/lib/verifyAdmin';

export async function GET() {

    const adminResponse = await verifyAdmin();
    if (adminResponse) return adminResponse;

    try {
        const users = await prisma.user.findMany();
        return NextResponse.json({ users, message: 'Users fetched successfully.' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: 'An error occurred while fetching users.',
            error: error instanceof Error ? error.message : 'Unknown error',
        }, { status: 500 });
    }
}
