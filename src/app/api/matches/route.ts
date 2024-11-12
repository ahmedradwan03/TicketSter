import prisma from '@/app/lib/database';
import { MatchDto, TicketCategoryEnum } from '@/app/lib/dtos';
import { createMatchSchema } from '@/app/lib/validationSchemas';
import { verifyAdmin } from '@/app/lib/verifyAdmin';
import { NextRequest, NextResponse } from 'next/server';



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

export async function POST(req: NextRequest) {
    const response = await verifyAdmin();
    if (response) return response;

    const body = (await req.json()) as MatchDto;
    const validation = createMatchSchema.safeParse(body);

    if (!validation.success) return NextResponse.json({ message: validation.error.flatten().fieldErrors }, { status: 400 });

    try {
        const match = await prisma.match.create({
            data: {
                name: body.name,
                date: new Date(body.date),
                stadiumId: body.stadiumId,
                team1Id: body.team1Id,
                team2Id: body.team2Id,
                mainEvent: body.mainEvent,
                ticketCategories: {
                    createMany: {
                        data: body.ticketCategories.map((category) => ({
                            category: category.category as TicketCategoryEnum,
                            price: category.price,
                            ticketsAvailable: category.ticketsAvailable,
                            gate: category.gate,
                        })),
                    },
                },
            },
            include: {
                stadium: true,
                team1: true,
                team2: true,
                ticketCategories: true,
            },
        });

        return NextResponse.json({ match, message: 'Match created successfully.' }, { status: 201 });
    } catch (error) {
        console.error('Error creating match:', error);
        return NextResponse.json({ message: 'An error occurred while creating the match.' }, { status: 500 });
    }
}
