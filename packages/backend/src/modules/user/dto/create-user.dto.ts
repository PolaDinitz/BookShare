import { Type } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, IsPhoneNumber, IsEnum } from "class-validator";
import { Gender } from "../../../enums/gender.enum";

export class CreateUserDto {

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    confirmPassword: string

    @IsEnum(Gender)
    @IsNotEmpty()
    gender: Gender

    @IsPhoneNumber("IL")
    phoneNumber: string
    
    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    dateOfBirth: Date

    @IsNotEmpty()
    address: string
}
