import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {IsEmail, IsDate, IsPhoneNumber} from "class-validator";
import { Gender } from 'src/enums/gender.enum';
import { Role } from 'src/enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  @IsEmail()
  email: string

  @Column({
    type: "enum",
    enum: Gender
  })
  gender: Gender

  
  @Column({
    type: "enum",
    enum: Role
  })
  role: Role

  @Column()
  @IsPhoneNumber()
  phoneNumber: string

  @Column()
  @IsDate()
  dateOfBirth: Date

  @Column()
  address: string

  @Column()
  password: string

  //TODO: ADD my books and landed books relations 
}