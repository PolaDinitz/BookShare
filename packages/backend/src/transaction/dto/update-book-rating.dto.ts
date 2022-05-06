import { IsNotEmpty, Max, Min } from "class-validator";

export class UpdateBookRatingDto {
    @Min(0)
    @Max(10)
    @IsNotEmpty()
    bookRating: number;
}
