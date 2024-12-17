import prisma from '@/app/lib/database';
import { LoginUserDto } from '@/app/lib/dtos';
import { loginSchema } from '@/app/lib/validationSchemas';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createSession } from '@/app/lib/session';
import { handelValidationErrors } from '@/app/lib/handelValidationErrors';

export async function POST(req: NextRequest) {
    const body = (await req.json()) as LoginUserDto;
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
        const errorMessage = handelValidationErrors(validation);
        return NextResponse.json({ message: errorMessage }, { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email: body.email } });

        if (!user || !bcrypt.compareSync(body.password, user.password)) return NextResponse.json({ message: 'uncorrect email or password' }, { status: 400 });

        await createSession(user);

        await createSession({ id: user.id, name: user.name, role: user.role });

        return NextResponse.json({ user, message: 'Login successfully' }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'internal server error' }, { status: 500 });
    }
}
