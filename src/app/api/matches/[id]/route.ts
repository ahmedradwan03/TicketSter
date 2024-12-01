import prisma from '@/app/lib/database';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const match = await prisma.match.findUnique({
            where: {
                id: parseInt(params.id),
            },
        });

        if (!match) {
            return NextResponse.json({ error: 'Match not found' }, { status: 404 });
        }

        return NextResponse.json(match);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    try {
        await prisma.match.delete({
            where: {
                id,
            },
        });

        return NextResponse.json({ message: 'Match deleted successfully' }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error deleting match' }, { status: 500 });
    }
}
