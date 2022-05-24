import { IsNotEmpty, Max, Min } from "class-validator";

export class UpdateUserRatingDto {

  @Min(0)
  @Max(5)
  @IsNotEmpty()
  userRating: number;

}
