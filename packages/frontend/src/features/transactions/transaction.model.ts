export interface Transaction {
    id: string;
    borrowUserId: string;
    userBookId: string;
    startDate: Date;
    status: string;
    isActive: boolean;
    bookRating: number;
    lentUserRating: number;
    borrowUserRating: number;
}