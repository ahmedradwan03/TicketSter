import { cookies } from 'next/headers';
import { decrypt } from '@/app/lib/session';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import prisma from './database';

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('session')?.value;
    if (cookie) {
        const session = await decrypt(cookie);
        if (!session?.id) redirect('/login');
        return { isAuth: true, role: session.role, id: session.id };
    }
    return null;
});

export const getUser = cache(async () => {
    const session = await verifySession();
    if (!session || typeof session.id !== 'number') return null;

    const user = await prisma.user.findUnique({
        where: { id: session.id },
        include: {
            bookings: {
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    match: {
                        select: {
                            date: true, stadium: { select: { name: true } },
                            team1: { select: { name: true, image: true } },
                            team2: { select: { name: true, image: true } },
                        },
                    }, category: {
                        select: { category: true, price: true },
                    },
                },
            },
        },
    });


    return user ? user : null;
});
