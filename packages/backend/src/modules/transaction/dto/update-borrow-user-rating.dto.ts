import { IsNotEmpty, Max, Min } from "class-validator";

export class UpdateBorrowUserRatingDto {
    @Min(0)
    @Max(5)
    @IsNotEmpty()
    borrowUserRating: number;
}
