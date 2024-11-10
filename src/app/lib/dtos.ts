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
