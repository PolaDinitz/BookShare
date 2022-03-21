import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsDate, IsEmail, IsPhoneNumber, IsMobilePhone } from "class-validator";
import { Gender } from "src/enums/gender.enum";
import { Role } from "src/enums/role.enum";
import { Type } from "class-transformer";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
<<<<<<< HEAD
  @IsPhoneNumber("IL")
=======
  @IsMobilePhone("IL")
>>>>>>> e4d48e77a37337caa25f07b05ca62856607b3fae
  phoneNumber: string

  @IsDate()
  @Type(() => Date)
  @Column()
  dateOfBirth: Date

  @Column()
  address: string

  @Column()
  password: string

  //TODO: ADD my books and landed books relations 
}