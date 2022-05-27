import { IsNotEmpty } from "class-validator";

export class CreateChatMessageDto {
    @IsNotEmpty()
    transactionId: string;

    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    isSystemMessage: boolean
}