import { Transform } from "class-transformer";
import { IsBoolean, IsNotEmpty } from "class-validator";

export class CreateBookDto {
    @IsNotEmpty()
    bookId: string;
    
    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    available: boolean;
}
