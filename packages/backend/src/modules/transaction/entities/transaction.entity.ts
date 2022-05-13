import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsDate } from "class-validator";
import { Type } from "class-transformer";
import { TransactionStatus } from "src/enums/transaction-status.enum";
import { User } from "src/modules/user/entities/user.entity";
import { UserBook } from "src/modules/user-book/entities/user-book.entity";

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsDate()
    @Type(() => Date)
    @Column()
    startDate: Date

    @Column({default: TransactionStatus.WAITING_CHAT_APPROVAL})
    status: TransactionStatus
 
    @Column({default: true})
    active: boolean

    @Column({ nullable: true})
    bookRating: number

    @Column({ nullable: true})
    lentUserRating: number

    @Column({ nullable: true})
    borrowUserRating: number
    
    @ManyToOne(() => User, borrowUser => borrowUser.borrowTransactions)
    borrowUser: User;

    @Column()
    borrowUserId: string

    @Column()
    userBookId: string

    @ManyToOne(() => UserBook, userBook => userBook.transactions)
    userBook: UserBook
}