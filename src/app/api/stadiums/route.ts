import prisma from '@/app/lib/database';
import { StadiumDto } from '@/app/lib/dtos';
import { createStadiumSchema } from '@/app/lib/validationSchemas';
import { verifyAdmin } from '@/app/lib/verifyAdmin';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const stadiums = await prisma.stadium.findMany({
            include: {
                team: true,
                matches: true,
            },
        });

        if (!stadiums || stadiums.length === 0) {
            return NextResponse.json({ message: 'No stadiums found.' }, { status: 404 });
        }

        return NextResponse.json({ stadiums, message: 'Stadiums retrieved successfully.' }, { status: 200 });
    } catch (error) {
        console.error('Error fetching stadiums:', error);
        return NextResponse.json({ message: 'An error occurred while fetching stadiums.' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    if (await verifyAdmin()) return await verifyAdmin();
    const body = (await req.json()) as StadiumDto;
    const validation = createStadiumSchema.safeParse(body);

    if (!validation.success) return NextResponse.json({ message: validation.error.flatten().fieldErrors }, { status: 400 });
    try {
        const newStadium = await prisma.stadium.create({
            data: {
                name: body.name,
                location: body.location,
                capacity: body.capacity,
            },
        });

        return NextResponse.json({ newStadium, message: 'Stadium created successfully.' }, { status: 201 });
    } catch (error) {
        console.error('Error creating stadium:', error);
        return NextResponse.json({ message: 'An error occurred while creating the stadium.' }, { status: 500 });
    }
}
