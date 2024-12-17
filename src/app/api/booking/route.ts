import { NextRequest, NextResponse } from 'next/server';
import { BookingDto } from '@/app/lib/dtos';
import { createBooking } from '@/app/lib/validationSchemas';
import prisma from '@/app/lib/database';
import Stripe from 'stripe';
import { stripe } from '@/app/lib/stripe';

export async function POST(req: NextRequest) {
    const body = (await req.json()) as BookingDto;

    const validation = createBooking.safeParse(body);

    if (!validation.success) return NextResponse.json({ message: "You can't book right now" }, { status: 400 });

    const { matchId, categoryId, userId } = body;

    try {
        const existingBooking = await prisma.booking.findFirst({ where: { userId, matchId } });

        if (existingBooking) return NextResponse.json({ message: 'You already have a booking for this match' }, { status: 400 });

        const match = await prisma.match.findUnique({
            where: { id: matchId },
            include: { team1: true, team2: true, ticketCategories: true },
        });

        if (!match) return NextResponse.json({ message: 'Match not found.' }, { status: 404 });

        const findTicketCategory = match.ticketCategories.find((cat) => cat.id === categoryId);

        if (!findTicketCategory) return NextResponse.json({ message: 'Ticket category not found.' }, { status: 404 });

        if (findTicketCategory.ticketsAvailable < 1) return NextResponse.json({ message: 'Not enough tickets available.' }, { status: 400 });

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
            {
                quantity: 1,
                price_data: {
                    currency: 'usd',
                    product_data: { name: match.name, description: `${match.team1.name} vs ${match.team2.name}` },
                    unit_amount: Math.round(findTicketCategory.price! * 100),
                },
            },
        ];

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${process.env.SITE_DOMAIN}`,
            cancel_url: `${process.env.SITE_DOMAIN}`,
            metadata: { matchId, userId, categoryId },
        });
        
        return NextResponse.json({ url: session.url, message: 'Session created successfully.' });
    } catch (error) {
        console.error('Error creating booking:', error);
        return NextResponse.json({ message: 'An error occurred while creating the booking.' }, { status: 500 });
    }
}
