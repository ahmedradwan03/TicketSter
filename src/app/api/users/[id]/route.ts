import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/database';
import { verifyAdmin } from '@/app/lib/verifyAdmin';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const response = await verifyAdmin();
    if (response) return response;

    const id = Number(params.id);

    try {
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                bookings: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    include: {
                        match: {
                            select: {
                                date: true,
                                stadium: { select: { name: true } },
                                team1: { select: { name: true, image: true } },
                                team2: { select: { name: true, image: true } },
                            },
                        },
                        category: {
                            select: { category: true, price: true },
                        },
                    },
                },
            },
        });

        if (!user) return NextResponse.json({ message: `No user found with the provided ID (${id}).` }, { status: 404 });

        return NextResponse.json({ user, message: 'User retrieved successfully.' }, { status: 200 });
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json(
            {
                message: 'An unexpected error occurred while retrieving the user.',
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
