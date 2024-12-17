import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().min(1, 'Email is required').email({ message: 'Invalid email format' }),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters long' })
        .regex(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/, { message: 'Password must contain at least one uppercase letter and one number' }),
});

export const signupScheam = z
    .object({
        name: z.string().min(3, { message: 'Name must be at least 3 characters long' }).max(30, { message: 'Name must be at most 30 characters long' }),
        email: z.string().min(1, 'Email is required').email({ message: 'Invalid email format' }),
        password: z
            .string()
            .min(6, { message: 'Password must be at least 6 characters long' })
            .regex(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/, { message: 'Password must contain at least one uppercase letter and one number' }),
        confirmPassword: z.string().min(6, { message: 'Confirm password must be at least 6 characters long' }),
    })
    .superRefine((data, ctx) => {
        if (data.password !== data.confirmPassword) ctx.addIssue({ path: ['confirmPassword'], message: 'Passwords do not match', code: z.ZodIssueCode.custom });
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

export const updateStadiumSchema = z.object({
    name: z.string().optional(),
    location: z
        .object({
            city: z.string().optional(),
            street: z.string().optional(),
        })
        .optional(),
    capacity: z.number().min(1, { message: 'Capacity must be greater than 0' }).optional(),
});

export const createTeamSchema = z.object({
    name: z.string().min(1, 'Team name is required'),
    image: z.string().min(1, 'Team image URL is required'),
    country: z.string().min(1, 'Team country is required'),
    stadiumId: z.number().optional(),
});

export const updateTeamSchema = z.object({
    name: z.string().optional(),
    image: z.string().optional(),
    country: z.string().optional(),
    stadiumId: z.number().optional(),
});

export const createMatchSchema = z
    .object({
        name: z.string().min(1, 'Match name is required'),
        date: z.string().refine((date) => !isNaN(Date.parse(date)), {
            message: 'Date must be valid',
        }),
        stadiumId: z.number().min(1, 'Stadium ID is required'),
        team1Id: z.number().min(1, 'Team 1 ID is required'),
        team2Id: z.number().min(1, 'Team 2 ID is required'),
        mainEvent: z.boolean(),
        ticketCategories: z
            .array(
                z.object({
                    category: z.string().min(1, 'Category name is required'),
                    price: z.number().positive('Price must be a positive number'),
                    ticketsAvailable: z.number().int().positive('Tickets available must be a positive integer'),
                    gate: z.string().optional(),
                })
            )
            .optional(),
    })
    .refine((data) => data.team1Id !== data.team2Id, {
        message: 'Team 1 and Team 2 must be different',
        path: ['team2Id'],
    });

export const updateMatchSchema = z
    .object({
        name: z.string().min(1, 'Match name is required').optional(),
        date: z
            .string()
            .refine((date) => !isNaN(Date.parse(date)), { message: 'Date must be valid' })
            .optional(),
        stadiumId: z.number().min(1, 'Stadium ID is required').optional(),
        team1Id: z.number().min(1, 'Team 1 ID is required').optional(),
        team2Id: z.number().min(1, 'Team 2 ID is required').optional(),
        mainEvent: z.boolean().optional(),
        ticketCategories: z
            .array(
                z.object({
                    category: z.string().min(1, 'Category name is required'),
                    price: z.number().int('Price must be a positive number'),
                    ticketsAvailable: z.number().int('Tickets available must be a positive integer'),
                    gate: z.string().optional(),
                })
            )
            .optional(),
    })
    .refine((data) => data.team1Id !== data.team2Id, {
        message: 'Team 1 and Team 2 must be different',
        path: ['team2Id'],
    });

export const createBooking = z.object({
    userId: z.number().int().positive(),
    matchId: z.number().int().positive(),
    categoryId: z.number().int().positive(),
});
