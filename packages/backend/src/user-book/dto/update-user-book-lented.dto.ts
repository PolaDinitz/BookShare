import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateUserBookLentedDto  {
    @IsBoolean()
    @IsNotEmpty()
    isLented: boolean;
}
