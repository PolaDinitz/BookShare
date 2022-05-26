import { User } from "../user/user.model";

export interface UserBook {
    id: string;
    bookId: string;
    user: User;
    isLent: boolean;
    isAvailable: boolean;
}