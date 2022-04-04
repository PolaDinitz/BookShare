import { Book } from "src/book/entities/book.entity";
import { User } from "src/user/entities/user.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class UserBook {

    @ManyToOne(type => Book, book => book.userBook, {primary: true})
    book: Book;
  
    @ManyToOne(type => User, user => user.userBook, {primary: true})
    user: User;
  
    @Column()
    user_book_rating: number;
  
    @Column()
    available: boolean;
  
}
