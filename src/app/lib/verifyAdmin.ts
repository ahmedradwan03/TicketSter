import { NextResponse } from 'next/server';
import { verifySession } from './dal';

export async function verifyAdmin() {
    const session = await verifySession();

    if (!session || session.role !== 'ADMIN') {
        return NextResponse.json({ message: !session ? 'Login First' : 'You do not have permission to perform this action' }, { status: !session ? 401 : 403 });
    }
}
