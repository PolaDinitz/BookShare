import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../book/entities/book.entity';
import { UserBook } from '../user-book/entities/user-book.entity';
import { BooksApiModule } from '../books-api/books-api.module';
import { UserBookModule } from '../user-book/user-book.module';
import { BookCategory } from '../book-category/entities/book-category.entity';
import { BookCategoryModule } from '../book-category/book-category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book,UserBook,BookCategory]), BooksApiModule, UserBookModule, BookCategoryModule],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService]
})
export class BookModule {
}
