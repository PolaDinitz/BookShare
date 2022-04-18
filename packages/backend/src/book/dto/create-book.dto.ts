import { IsNotEmpty } from "class-validator";

export class CreateBookDto {
    @IsNotEmpty()
    book_id: string;
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    author: string;
    @IsNotEmpty()
    description: string
    @IsNotEmpty()
    ganers: string
    @IsNotEmpty()
    book_rating: number
    @IsNotEmpty()
    count: number
  
}
