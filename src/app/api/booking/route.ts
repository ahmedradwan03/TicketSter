import { NextRequest, NextResponse } from 'next/server';
import { BookingDto } from '@/app/lib/dtos';
import { createBooking } from '@/app/lib/validationSchemas';
import prisma from '@/app/lib/database';

export async function POST(req: NextRequest) {

    const body = (await req.json()) as BookingDto;
    const validation = createBooking.safeParse(body);

    if (!validation.success) return NextResponse.json({ message: 'You can\'t book right now' }, { status: 400 });

    const { matchId, categoryId, userId } = body;

    try {
        const existingBooking = await prisma.booking.findFirst({
            where: { userId, matchId },
        });


        if (existingBooking) return NextResponse.json({ message: 'You already have a booking for this match' }, { status: 400 });


        const match = await prisma.match.findUnique({
            where: { id: matchId },
            include: { ticketCategories: true },
        });

        if (!match) return NextResponse.json({ message: 'Match not found.' }, { status: 404 });


        const findTicketCategory = match.ticketCategories.find(
            (cat) => cat.id === categoryId,
        );

        if (!findTicketCategory) return NextResponse.json({ message: 'Ticket category not found.' }, { status: 404 });


        if (findTicketCategory.ticketsAvailable < 1) {
            return NextResponse.json({ message: 'Not enough tickets available.' }, { status: 400 });
        }

        await prisma.ticketCategory.update({
            where: { id: categoryId },
            data: { ticketsAvailable: findTicketCategory.ticketsAvailable - 1 },
        });

        const booking = await prisma.booking.create({
            data: {
                userId,
                matchId,
                categoryId,
            },
        });

        return NextResponse.json({ booking, message: 'Booking successful.' }, { status: 201 });
    } catch (error) {
        console.error('Error creating booking:', error);
        return NextResponse.json({ message: 'An error occurred while creating the booking.' }, { status: 500 });
    }
}