import { IsNotEmpty } from "class-validator";

export class CreateBookDto {
    @IsNotEmpty()
    bookId: string;
    
    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    isAvailable: boolean;
}
