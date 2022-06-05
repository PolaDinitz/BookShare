import GenderEnum from "../../enums/GenderEnum";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    gender: GenderEnum;
    dateOfBirth?: Date | null;
    email: string;
    phoneNumber: string;
    address: string;
    longitude: number;
    latitude: number;
    imageUrl: string;
    rating: number;
    count: number;
}

export interface UserState {
    user: User | null;
}