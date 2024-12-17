import { JWTPayload } from 'jose';

export interface UserDTO {
    id: number;
    name: string;
    email: string;
    role: string;
    active: boolean;
    bookings?: BookingDto[];
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

export interface BookingDto {
    id?: number;
    userId: number;
    matchId: number;
    categoryId: number;

}

export interface StadiumDto {
    id?: number;
    name: string;
    location: {
        street: string;
        city: string;
    };
    capacity: number;
}

export interface TeamDto {
    id?: number;
    name: string;
    image: string;
    country: string;
    stadiumId: number;
}

export enum TicketCategoryEnum {
    CAT1 = 'CAT1',
    CAT2 = 'CAT2',
    CAT3 = 'CAT3',
}

export interface TicketCategoryDto {
    id: number;
    category: TicketCategoryEnum;
    price: number;
    ticketsAvailable: number;
    gate: string;
}

export interface MatchDto {
    id: number;
    name: string;
    date: string;
    stadiumId: number;
    stadium: StadiumDto;
    team1Id: number;
    team1: TeamDto;
    team2Id: number;
    team2: TeamDto;
    ticketCategories: TicketCategoryDto[];
    mainEvent: boolean;
    createdAt: Date;
    bookingCount: number;
}
