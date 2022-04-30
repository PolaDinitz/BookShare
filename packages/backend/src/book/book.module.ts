import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/book/entities/book.entity';
import { UserBook } from 'src/user-book/entities/user-book.entity';
import { BooksApiModule } from 'src/books-api/books-api.module';
import { UserBookModule } from 'src/user-book/user-book.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book,UserBook]), BooksApiModule, UserBookModule],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService]
})
export class BookModule {}
