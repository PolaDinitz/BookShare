import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsDate, IsEmail, IsPhoneNumber } from "class-validator";
import { Type } from "class-transformer";
import { DEFAULT_BOOK_IMAGE_FILE_NAME, IMAGES_BOOK_ASSETS_PATH } from "src/consts/images.consts";
import { Double } from "typeorm/driver/mongodb/typings";
import { UserBook } from "src/user-book/entities/user-book.entity";

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  book_id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  description: string

  @Column()
  ganers: string

  @Column({default: `${IMAGES_BOOK_ASSETS_PATH}/${DEFAULT_BOOK_IMAGE_FILE_NAME}`})
  imageUrl: string

  @Column({ nullable: true })
  book_rating: number

  @Column()
  count: number

  @OneToMany(type => UserBook, userBook => userBook.book)
  userBook: UserBook
}