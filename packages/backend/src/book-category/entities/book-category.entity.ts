import { Column, Entity, ManyToOne } from "typeorm";
import { Book } from "../../book/entities/book.entity";

@Entity()
export class BookCategory {
    @Column({primary: true})
    category: string

    @Column({primary: true})
    bookId: string

    @ManyToOne(() => Book, book => book.categories)
    book: Book

}