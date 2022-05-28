import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatMessage } from "./entities/chat-message.entity";
import { Transaction } from "../transaction/entities/transaction.entity";
import { User } from "../user/entities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ChatMessage]), Transaction, User],
    providers: [ChatService],
    controllers: [],
    exports: [ChatService]
})
export class ChatModule {
}
