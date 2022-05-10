import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transaction } from "../../transaction/entities/transaction.entity";
import { ChatMessage } from "./entities/chat-message.entity";
import { User } from "../../user/entities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ChatMessage]), Transaction, User],
    providers: [ChatService],
    controllers: [ChatController],
    exports: [ChatService]
})
export class ChatModule {
}
