import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { UserBook } from "../../../modules/user-book/entities/user-book.entity";
import { BookCategory } from "../../book-category/entities/book-category.entity";

@Entity()
export class Book {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  author: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column()
  bookRating: number;

  @Column()
  count: number;

  @OneToMany(type => BookCategory, bookCategory => bookCategory.book)
  categories: BookCategory[];

  @OneToMany(type => UserBook, userBook => userBook.book)
  userBook: UserBook[];
}
