import prisma from '@/app/lib/database';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const matches = await prisma.match.findMany({
            where: { date: { gt: new Date() } },
            include: {
                stadium: true,
                team1: true,
                team2: true,
                ticketCategories: true,
                Booking: true,
            },
        });

        if (!matches || matches.length === 0) return NextResponse.json({ message: 'No upcoming matches found.' }, { status: 404 });

        return NextResponse.json({ matches, message: 'Matches retrieved successfully.' }, { status: 200 });
    } catch (error) {
        console.error('Error fetching matches:', error);
        return NextResponse.json({ message: 'An error occurred while fetching matches.' }, { status: 500 });
    }
}
