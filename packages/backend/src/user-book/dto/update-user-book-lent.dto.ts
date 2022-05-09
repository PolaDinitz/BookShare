import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateUserBookLentDto  {
    @IsBoolean()
    @IsNotEmpty()
    isLent: boolean;
}
