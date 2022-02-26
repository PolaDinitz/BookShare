import { IsDate, IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";
import { Gender } from "src/enums/gender.enum";

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

    @IsNotEmpty()
    gender: Gender

    @IsPhoneNumber()
    phoneNumber: string

    @IsDate()
    @IsNotEmpty()
    dateOfBirth: Date

    @IsNotEmpty()
    address: string
}
