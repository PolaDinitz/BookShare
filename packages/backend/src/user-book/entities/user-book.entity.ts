import { Transform } from "class-transformer";
import { IsBoolean } from "class-validator";
import { Book } from "src/book/entities/book.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["bookId", "userId"])
export class UserBook {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    bookId: string
    
    @ManyToOne(type => Book, book => book.userBook)
    book: Book;
  
    @Column()
    userId: string;

    @ManyToOne(type => User, user => user.userBook)
    user: User;

    @Column()
    available: boolean;
}
