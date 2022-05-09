import { IsNotEmpty, Max, Min } from "class-validator";

export class UpdatelentUserRatingDto {
    @Min(0)
    @Max(5)
    @IsNotEmpty()
    lentUserRating: number;
}
