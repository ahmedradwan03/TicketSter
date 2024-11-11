import { JWTPayload } from 'jose';

export interface UserDTO {
    id: number;
    name: string;
}

export interface SignupUserDto {
    name: string;
    email: string;
    password: string;
}

export interface LoginUserDto {
    email: string;
    password: string;
}

export interface SessionPayload extends JWTPayload {
    id: number;
    name: string;
    role: string;
}

interface StadiumDto {
    id: number;
    name: string;
    location: string;
    capacity: number;
}

interface TeamDto {
    id: number;
    name: string;
    image: string;
}

interface TicketCategoryDto {
    id: number;
    name: string;
    price: number;
}

export interface MatchDto {
    id: number;
    name: string;
    date: Date;
    stadiumId: number;
    stadium: StadiumDto;
    team1Id: number;
    team1: TeamDto;
    team2Id: number;
    team2: TeamDto;
    ticketCategories: TicketCategoryDto[];
    mainEvent: boolean;
    createdAt: Date;
    bookingCount: number; // This represents the count of bookings
}
