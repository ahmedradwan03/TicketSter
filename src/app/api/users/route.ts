import { NextResponse } from 'next/server';
import prisma from '@/app/lib/database';
export async function GET() {
    try {
        const users = await prisma.user.findMany();

        if (!users || users.length === 0) return NextResponse.json({ message: 'No Users found.' }, { status: 404 });

        return NextResponse.json({ users, message: 'Users fetched successfully.' }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            {
                message: 'An error occurred while fetching users.',
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
