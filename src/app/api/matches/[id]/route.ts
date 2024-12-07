import prisma from '@/app/lib/database';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin } from '@/app/lib/verifyAdmin';
import { MatchDto, TicketCategoryEnum } from '@/app/lib/dtos';
import { updateMatchSchema } from '@/app/lib/validationSchemas';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const match = await prisma.match.findUnique({
            where: {
                id: parseInt(params.id),
            }, include: {
                team1: true,
                team2: true,
                stadium: true,
                ticketCategories: true,
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


export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const response = await verifyAdmin();
    if (response) return response;

    const matchId = Number(params.id);


    if (!matchId) return NextResponse.json({ message: 'Match ID is required' }, { status: 400 });


    const body = (await request.json()) as MatchDto;
    const validation = updateMatchSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json({
            message: 'Invalid data',
            errors: validation.error.flatten().fieldErrors,
        }, { status: 400 });
    }
    try {
        const match = await prisma.match.findUnique({ where: { id: Number(matchId) } });

        if (!match) {
            return NextResponse.json({ message: `Match with ID ${matchId} not found` }, { status: 404 });
        }

        const updatedMatch = await prisma.match.update({
            where: { id: Number(matchId) },
            data: {
                name: body.name,
                date: body.date,
                stadiumId: body.stadiumId,
                team1Id: body.team1Id,
                team2Id: body.team2Id,
                mainEvent: body.mainEvent,
                ticketCategories: body.ticketCategories && body.ticketCategories.length > 0 ? {
                    upsert: await Promise.all(
                        body.ticketCategories.map(async (category) => {
                            const existingCategory = await prisma.ticketCategory.findFirst({
                                where: { category: category.category },  
                            });
                            return {
                                where: { id: existingCategory ? existingCategory.id : -1 },
                                update: {
                                    price: category.price,
                                    ticketsAvailable: category.ticketsAvailable,
                                    gate: category.gate,
                                },
                                create: {
                                    category: category.category as TicketCategoryEnum,
                                    price: category.price,
                                    ticketsAvailable: category.ticketsAvailable,
                                    gate: category.gate,
                                },
                            };
                        }),
                    ),
                } : undefined,
            },
            include: {
                ticketCategories: true,
            },
        });


        return NextResponse.json({ updatedMatch, message: 'Match updated successfully!' }, { status: 200 },
        );
    } catch
        (error) {
        console.error('Error updating match:', error);
        return NextResponse.json({ message: 'Oops! Something went wrong while updating the match.' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {

    const id = Number(params.id);
    try {

        await prisma.ticketCategory.deleteMany({ where: { matchId: id } });

        await prisma.match.delete({ where: { id } });

        return NextResponse.json({ message: 'Match deleted successfully' }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error deleting match' }, { status: 500 });
    }
}
