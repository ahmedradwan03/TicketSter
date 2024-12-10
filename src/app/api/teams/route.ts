import prisma from '@/app/lib/database';
import { createTeamSchema } from '@/app/lib/validationSchemas';
import { verifyAdmin } from '@/app/lib/verifyAdmin';
import { NextRequest, NextResponse } from 'next/server';
import { TeamDto } from '@/app/lib/dtos';
import cloudinary from '@/app/lib/cloudinary';

export async function GET() {
    try {
        const teams = await prisma.team.findMany({
            include: {
                Stadium: true,
                matches1: true,
                matches2: true,
            },
        });

        if (!teams || teams.length === 0) {
            return NextResponse.json({ message: 'No teams found.' }, { status: 404 });
        }

        return NextResponse.json({ teams, message: 'Teams retrieved successfully.' }, { status: 200 });
    } catch (error) {
        console.error('Error fetching teams:', error);
        return NextResponse.json({ message: 'An error occurred while fetching teams.' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const response = await verifyAdmin();
    if (response) return response;

    console.log(req);

    const body = (await req.json()) as TeamDto;

    const validation = createTeamSchema.safeParse(body);

    if (!validation.success) return NextResponse.json({ message: validation.error.flatten().fieldErrors }, { status: 400 });

    try {

        // const paramsToSign = { folder: 'ticketster/teams' };

        // const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET as string);

        // Upload image to Cloudinary
        // const uploadedImage = await cloudinary.uploader.upload(image, {
        //     folder: 'ticketster/teams',
        //     resource_type: 'auto',
        //     api_key: process.env.CLOUDINARY_API_KEY,
        //     signature,
        // });


        const team = await prisma.team.create({
            data: {
                name: body.name,
                image: "",
                country: body.country,
                stadiumId: body.stadiumId,
            },
        });

        if (!team) return NextResponse.json({ team, message: 'Team cant' }, { status: 404 });


        return NextResponse.json({ team, message: 'Team created successfully.' }, { status: 201 });
    } catch (error) {
        console.error('Error creating team:', error);
        return NextResponse.json({ message: 'An error occurred while creating the team.' }, { status: 500 });
    }
}
