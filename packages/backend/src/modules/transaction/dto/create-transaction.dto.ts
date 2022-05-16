import { IsNotEmpty } from "class-validator";

export class CreateTransactionDto {
    @IsNotEmpty()
    borrowUserId: string;

    @IsNotEmpty()
    userBookId: string;
}
