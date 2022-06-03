export interface User {
    id: string;
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth?: Date | null;
    email: string;
    phoneNumber: string;
    address: string;
    longitude: number;
    latitude: number;
    imageUrl: string;
    rating: number;
}
