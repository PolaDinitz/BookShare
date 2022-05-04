import { Book } from "src/book/entities/book.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Transaction } from "src/transaction/entities/transaction.entity";

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

    @Column({default: false})
    lented: boolean;

    @Column()
    available: boolean;

    @OneToMany(type => Transaction, transaction => transaction.userBook)
    transactions: Transaction[]    
}
