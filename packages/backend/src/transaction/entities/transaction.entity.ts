import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsDate } from "class-validator";
import { Type } from "class-transformer";
import { TransactionStatus } from "src/enums/transaction-status.enum";
import { User } from "src/user/entities/user.entity";

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
          
    // TODO: 0 <= rate <= 5

    @Column({ nullable: true})
    bookRating: number

    @Column({ nullable: true})
    lentUserRating: number

    @Column({ nullable: true})
    borrowUserRating: number
    
    @ManyToOne(() => User, borrowUser => borrowUser.borrowTransactions)
    borrowUser: Promise<User>;

    @Column()
    borrowUserId: string

    // TODO: USERBOOK 
    @Column()
    userBookId: string

}
