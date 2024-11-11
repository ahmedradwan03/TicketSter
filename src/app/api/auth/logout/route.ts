import { deleteSession } from '@/app/lib/session';
import { NextResponse } from 'next/server';

export async function GET() {
   await deleteSession();
    return NextResponse.json({ message: 'logout successfully' }, { status: 200 });
}
