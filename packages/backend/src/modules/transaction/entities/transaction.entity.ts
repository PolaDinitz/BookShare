import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsDate } from "class-validator";
import { Type } from "class-transformer";
import { TransactionStatus } from "../../../enums/transaction-status.enum";
import { User } from "../../../modules/user/entities/user.entity";
import { UserBook } from "../../../modules/user-book/entities/user-book.entity";
import { ChatMessage } from "../../chat/entities/chat-message.entity";

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

    @OneToMany(() => ChatMessage, chatMessage => chatMessage.transaction)
    chatMessages: ChatMessage[];
}