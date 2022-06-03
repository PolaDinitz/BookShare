import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsEnum, IsOptional, IsPhoneNumber } from 'class-validator';
import { Gender } from '../../../enums/gender.enum';

export class UpdateUserDto {
    @IsOptional()
    firstName: string;

    @IsOptional()
    lastName: string

    @IsOptional()
    @IsEmail()
    email: string

    @IsOptional()
    password: string

    @IsOptional()
    confirmPassword: string

    @IsOptional()
    @IsEnum(Gender)
    gender: Gender

    @IsOptional()
    @IsPhoneNumber("IL")
    phoneNumber: string
    
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    dateOfBirth: Date
    
    @IsOptional()
    address: string
}
