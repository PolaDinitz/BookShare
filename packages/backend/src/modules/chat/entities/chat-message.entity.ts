import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "../../transaction/entities/transaction.entity";
import { User } from "../../user/entities/user.entity";

@Entity()
export class ChatMessage {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    transactionId: string

    @ManyToOne(() => Transaction, (transaction) => transaction.id)
    transaction: Transaction;

    @Column()
    userId: string;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @Column("varchar", {length: 255})
    content: string;

    @Column()
    isSystemMessage: boolean;

    @Column({type: "timestamp without time zone"})
    creationTimestamp: Date;

}