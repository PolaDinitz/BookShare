import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsDate, IsEmail, IsPhoneNumber, Max, Min } from "class-validator";
import { Gender } from "../../../enums/gender.enum";
import { Role } from "../../../enums/role.enum";
import { Type } from "class-transformer";
import { DEFAULT_USER_IMAGE_FILE_NAME, IMAGES_USER_ASSETS_PATH } from "../../../consts/images.consts";
import { Transaction } from "../../../modules/transaction/entities/transaction.entity";
import { UserBook } from "../../../modules/user-book/entities/user-book.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({unique: true})
    @IsEmail()
    email: string;

    @Column({
        type: "enum",
        enum: Gender
    })
    gender: Gender;

    @Column({
        type: "enum",
        enum: Role
    })
    role: Role;

    @Column()
    @IsPhoneNumber("IL")
    phoneNumber: string;

    @IsDate()
    @Type(() => Date)
    @Column()
    dateOfBirth: Date;

    @Column()
    address: string;

    @Column("double precision")
    longitude: number;

    @Column("double precision")
    latitude: number;

    @Column()
    password: string;

    @Column({default: `${IMAGES_USER_ASSETS_PATH}/${DEFAULT_USER_IMAGE_FILE_NAME}`})
    imageUrl: string;

    @Column({nullable: true})
    refreshToken: string;

    @OneToMany(type => Transaction, transaction => transaction.borrowUser)
    borrowTransactions: Transaction[];

    @OneToMany(type => UserBook, userBook => userBook.user)
    userBook: UserBook[];

    @Column({default: 0})
    @Min(0)
    @Max(5)
    rating: number;

    @Column({default: 0})
    count: number;
}