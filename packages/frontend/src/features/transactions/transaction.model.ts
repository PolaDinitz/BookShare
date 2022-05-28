import { User } from "../user/user.model";

export interface Transaction {
    id: string;
    borrowUser: User;
    userBookId: string;
    startDate: Date;
    status: string;
    isActive: boolean;
    bookRating: number;
    lentUserRating: number;
    borrowUserRating: number;
}