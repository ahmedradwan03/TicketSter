import Stripe from 'stripe';
import { stripe } from '@/app/lib/stripe';
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/database';

export async function POST(req: Request) {
    console.log('testFrom Webhook');

    const body = await req.text();
    const signature = req.headers.get('Stripe-Signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session?.metadata?.userId;
    const matchId = session?.metadata?.matchId;
    const categoryId = session?.metadata?.categoryId;

    if (event.type === 'checkout.session.completed') {
        if (!userId || !matchId || !categoryId) return new NextResponse(`Webhook Error: Missing metadata`, { status: 400 });

        const category = await prisma.ticketCategory.findUnique({ where: { id: Number(categoryId) }, select: { ticketsAvailable: true } });

        if (category && category.ticketsAvailable > 0) {
            await prisma.ticketCategory.update({
                where: { id: Number(categoryId) },
                data: { ticketsAvailable: category.ticketsAvailable - 1 },
            });
        }

        try {
            await prisma.booking.create({
                data: { userId: Number(userId), matchId: Number(matchId), categoryId: Number(categoryId) },
            });
        } catch (error: any) {
            console.error('Booking creation error: ', error);
            return new NextResponse(`Error creating booking: ${error.message}`, { status: 500 });
        }
    } else {
        console.error(`Unhandled event type: ${event.type}`);
        return new NextResponse(`Webhook Error: Unsupported event type ${event.type}`, { status: 400 });
    }
    return new NextResponse(null, { status: 200 });
}
