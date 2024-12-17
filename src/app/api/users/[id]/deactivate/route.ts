import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/database';
import { verifyAdmin } from '@/app/lib/verifyAdmin';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const response = await verifyAdmin();
    if (response) return response;

    const id = Number(params.id);

    if (!id) return NextResponse.json({ message: 'User ID is required' }, { status: 400 });

    try {
        const user = await prisma.user.findUnique({ where: { id } });

        if (!user) return NextResponse.json({ message: 'User not found with this ID' }, { status: 404 });

        const userUpdated = await prisma.user.update({ where: { id }, data: { active: !user.active } });

        return NextResponse.json({ userUpdated, message: `user become ${userUpdated.active ? 'Active' : 'InActive'} successfully.` }, { status: 200 });
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ message: 'An error occurred while updating user.' }, { status: 500 });
    }
}
