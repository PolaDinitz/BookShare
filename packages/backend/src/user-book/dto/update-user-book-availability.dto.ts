import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateUserBookAvailabilityDto  {
    @IsBoolean()
    @IsNotEmpty()
    isAvailable: boolean;
}
