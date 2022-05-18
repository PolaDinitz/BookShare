export interface Book {
    id: string;
    title: string;
    author: string;
    description: string;
    imageUrl: string;
    genres: string[];
    bookRating: number;
    count: number;
}