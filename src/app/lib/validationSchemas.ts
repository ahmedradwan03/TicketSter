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
    stadiumId: z.number().optional()
});

export const updateTeamSchema = z.object({
    name: z.string().optional(),
    image: z.string().optional(),
    country: z.string().optional(),
    stadiumId: z.number().optional()
}); 


export const createMatchSchema = z.object({
    name: z.string().min(1, "Match name is required"),
    date: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Date must be valid"
    }),
    stadiumId: z.string().min(1, "Stadium ID is required"),
    team1Id: z.string().min(1, "Team 1 ID is required"),
    team2Id: z.string().min(1, "Team 2 ID is required"),
    mainEvent: z.boolean(),
    ticketCategories: z.array(
        z.object({
            name: z.string().min(1, "Category name is required"),
            price: z.number().positive("Price must be a positive number")
        })
    ).min(1, "At least one ticket category is required")
});