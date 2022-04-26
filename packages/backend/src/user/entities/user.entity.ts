import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsDate, IsEmail, IsPhoneNumber } from "class-validator";
import { Gender } from "src/enums/gender.enum";
import { Role } from "src/enums/role.enum";
import { Type } from "class-transformer";
import { DEFAULT_USER_IMAGE_FILE_NAME, IMAGES_USER_ASSETS_PATH } from "src/consts/images.consts";
import { Transaction } from "src/transaction/entities/transaction.entity";
import { UserBook } from "src/user-book/entities/user-book.entity";

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
  @IsPhoneNumber("IL")
  phoneNumber: string

  @IsDate()
  @Type(() => Date)
  @Column()
  dateOfBirth: Date

  @Column()
  address: string

  @Column()
  password: string

  @Column({default: `${IMAGES_USER_ASSETS_PATH}/${DEFAULT_USER_IMAGE_FILE_NAME}`})
  imageUrl: string

  @Column({ nullable: true })
  refreshToken: string

  @OneToMany(type => Transaction, transaction => transaction.borrowUser)
  borrowTransactions: Transaction[]

  //TODO: ADD my books and landed books relations 
  
  @OneToMany(type => UserBook, userBook => userBook.user)
  userBook: UserBook[]
}