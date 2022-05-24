import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ChatMessage } from "./entities/chat-message.entity";
import { CreateChatMessageDto } from "./dto/create-chat-message.dto";

@Injectable()
export class ChatService {

    constructor(
        @InjectRepository(ChatMessage)
        private chatMessageRepository: Repository<ChatMessage>,
    ) {}

    public async create(createChatMessageDto: CreateChatMessageDto) {
        const chatMessageEntity: ChatMessage = this.chatMessageRepository.create({
            transactionId: createChatMessageDto.transactionId,
            userId: createChatMessageDto.userId,
            content: createChatMessageDto.content,
            creationTimestamp: new Date(),
            isSystemMessage: createChatMessageDto.isSystemMessage
        });
        return await this.chatMessageRepository.save(chatMessageEntity);
    }

}
