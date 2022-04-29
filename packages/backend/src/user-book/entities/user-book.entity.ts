import { Book } from "src/book/entities/book.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserBook {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    bookId: string
    
    @ManyToOne(type => Book, book => book.userBook, {primary: true})
    book: Book;
  
    @Column()
    userId: string;

    @ManyToOne(type => User, user => user.userBook, {primary: true})
    user: User;

    @Column()
    available: boolean;
}
