import { IsBoolean, IsNotEmpty } from "class-validator";
import { Book } from "src/book/entities/book.entity";
import { User } from "src/user/entities/user.entity";

export class CreateUserBookDto {
    @IsNotEmpty()
    book: Book;
    @IsNotEmpty()
    user: User;
    @IsNotEmpty()
    user_book_rating: number;
    @IsBoolean()
    @IsNotEmpty()
    available: boolean;

}
