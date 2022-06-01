import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsEnum, IsPhoneNumber } from 'class-validator';
import { Gender } from 'src/enums/gender.enum';

export class UpdateUserDto {
    firstName: string;

    lastName: string

    @IsEmail()
    email: string

    password: string

    confirmPassword: string

    @IsEnum(Gender)
    gender: Gender

    @IsPhoneNumber("IL")
    phoneNumber: string
    
    @IsDate()
    @Type(() => Date)
    dateOfBirth: Date
    
    address: string
}
