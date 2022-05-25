import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/modules/book/entities/book.entity';
import { UserBook } from 'src/modules/user-book/entities/user-book.entity';
import { BooksApiModule } from 'src/modules/books-api/books-api.module';
import { UserBookModule } from 'src/modules/user-book/user-book.module';
import { BookCategoryModule } from "../book-category/book-category.module";

@Module({
    imports: [TypeOrmModule.forFeature([Book, UserBook]), BooksApiModule, UserBookModule, BookCategoryModule],
    controllers: [BookController],
    providers: [BookService],
    exports: [BookService]
})
export class BookModule {
}
