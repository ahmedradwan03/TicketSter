import prisma from '@/app/lib/database';
import { TeamDto } from '@/app/lib/dtos';
import { handelValidationErrors } from '@/app/lib/handelValidationErrors';
import { updateTeamSchema } from '@/app/lib/validationSchemas';
import { verifyAdmin } from '@/app/lib/verifyAdmin';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest) {
    const response = await verifyAdmin();
    if (response) return response;

    const id = new URL(req.url).pathname.split('/').pop();
    if (!id) return NextResponse.json({ message: 'Team ID is required' }, { status: 400 });

    const body = (await req.json()) as TeamDto;
    const validation = updateTeamSchema.safeParse(body);

    if (!validation.success) {
        const errorMessage = handelValidationErrors(validation);
        return NextResponse.json({ message: errorMessage }, { status: 400 });
    }
    try {
        const team = await prisma.team.findUnique({ where: { id: Number(id) } });

        if (!team) return NextResponse.json({ message: 'Team not found with this ID' }, { status: 404 });
        const updatedTeam = await prisma.team.update({
            where: { id: Number(id) },
            data: {
                name: body.name,
                image: body.image,
                country: body.country,
                stadiumId: body.stadiumId,
            },
        });

        return NextResponse.json({ updatedTeam, message: 'Team updated successfully.' }, { status: 200 });
    } catch (error) {
        console.error('Error updating team:', error);
        return NextResponse.json({ message: 'An error occurred while updating the team.' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const response = await verifyAdmin();
    if (response) return response;

    const id = new URL(req.url).pathname.split('/').pop();

    if (!id) return NextResponse.json({ message: 'Team ID is required' }, { status: 400 });

    try {
        const team = await prisma.team.findUnique({ where: { id: Number(id) } });

        if (!team) return NextResponse.json({ message: 'Team not found with this ID' }, { status: 404 });

        await prisma.team.delete({ where: { id: Number(id) } });
        
        return NextResponse.json({ message: 'Team deleted successfully.' }, { status: 200 });
    } catch (error) {
        console.log('Error deleting team:', error);
        return NextResponse.json({ message: 'An error occurred while deleting the team.' }, { status: 500 });
    }
}
