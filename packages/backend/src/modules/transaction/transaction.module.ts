import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { UserBookModule } from '../user-book/user-book.module';
import { BookModule } from '../book/book.module';
import { UsersModule } from '../user/user.module';
import { ChatModule } from "../chat/chat.module";

@Module({
    imports: [TypeOrmModule.forFeature([Transaction]), UserBookModule, BookModule, UsersModule, ChatModule],
    controllers: [TransactionController],
    providers: [TransactionService],
    exports: [TransactionService]
})
export class TransactionModule {
}
