import prisma from '@/app/lib/database';
import { StadiumDto } from '@/app/lib/dtos';
import { updateStadiumSchema } from '@/app/lib/validationSchemas';
import { verifyAdmin } from '@/app/lib/verifyAdmin';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const response = await verifyAdmin();
    if (response) return response;

    const id = new URL(request.url).pathname.split('/').pop();

    if (!id) return NextResponse.json({ message: 'Stadium ID is requestuired' }, { status: 400 });

    const body = (await request.json()) as StadiumDto;
    const validation = updateStadiumSchema.safeParse(body);

    if (!validation.success) return NextResponse.json({ message: validation.error.flatten().fieldErrors }, { status: 400 });

    try {
        const stadium = await prisma.stadium.findUnique({
            where: { id: Number(id) },
        });

        if (!stadium) return NextResponse.json({ message: 'Stadium not found with this ID' }, { status: 404 });
        const updatedStadium = await prisma.stadium.update({
            where: { id: Number(id) },
            data: {
                name: body.name,
                location: body.location,
                capacity: body.capacity,
            },
        });

        return NextResponse.json({ updatedStadium, message: 'Stadium updated successfully.' }, { status: 200 });
    } catch (error) {
        console.error('Error updating stadium:', error);
        return NextResponse.json({ message: 'An error occurred while updating the stadium.' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const response = await verifyAdmin();
    if (response) return response;

    const id = new URL(request.url).pathname.split('/').pop();

    if (!id) return NextResponse.json({ message: 'Stadium ID is requestuired' }, { status: 400 });

    try {
        const stadium = await prisma.stadium.findUnique({
            where: { id: Number(id) },
        });

        if (!stadium) return NextResponse.json({ message: 'Stadium not found with this ID' }, { status: 404 });

        await prisma.stadium.delete({
            where: {id: Number(id) },
        });
        return NextResponse.json({ message: 'Stadium deleted successfully.' }, { status: 200 });
    } catch (error) {
        console.log('Error deleting stadium:', error);
        return NextResponse.json({ message: 'An error occurred while deleting the stadium.' }, { status: 500 });
    }
}
