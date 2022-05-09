import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { UserBook } from "src/user-book/entities/user-book.entity";
import { BookCategory } from "../../book-category/entities/book-category.entity";
import { DEFAULT_BOOK_IMAGE } from "src/consts/images.consts";

@Entity()
export class Book {
    @PrimaryColumn()
    id: string;

    @Column()
    title: string;

    @Column({nullable: true})
    author: string;

    @Column({nullable: true})
    description: string

    @Column({default: DEFAULT_BOOK_IMAGE})
    imageUrl: string

    @Column()
    bookRating: number

    @Column()
    count: number

    @ManyToOne(type => BookCategory, bookCategory => bookCategory.book)
    categories: BookCategory[]

    @OneToMany(type => UserBook, userBook => userBook.book)
    userBook: UserBook[];
}
