import { z } from 'zod';

export const signupScheam = z.object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters long' }).max(30, { message: 'Name must be at most 30 characters long' }),
    email: z.string().email({ message: 'Invalid email format' }),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters long' })
        .regex(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/, { message: 'Password must contain at least one uppercase letter and one number' }),
});

export const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters long' })
        .regex(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/, { message: 'Password must contain at least one uppercase letter and one number' }),
});

export const createStadiumSchema = z.object({
    name: z.string().min(1, 'Stadium name is required'),
    location: z
        .object({
            city: z.string(),
            street: z.string(),
        })
        .refine((data) => data.city && data.street, 'Both city and street must be provided'),
    capacity: z.number().min(1, 'Capacity must be greater than 0'),
});
