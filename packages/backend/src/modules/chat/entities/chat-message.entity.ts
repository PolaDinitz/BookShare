import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../../user/entities/user.entity";
import { Transaction } from "../../../transaction/entities/transaction.entity";

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

    @Column({type: "timestamp without time zone"})
    creationTimestamp: Date;

}