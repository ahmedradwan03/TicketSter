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
        where: {
            id: session.id,
        },
    });
    return user;
});
