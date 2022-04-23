import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/book/entities/book.entity';
import { MulterModule } from '@nestjs/platform-express';
import { IMAGES_BOOK_ASSETS_PATH, IMAGES_PUBLIC_ASSETS_PATH } from 'src/consts/images.consts';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/upload-files';
import { UserBook } from 'src/user-book/entities/user-book.entity';
import { BooksApiModule } from 'src/books-api/books-api.module';
import { UserBookModule } from 'src/user-book/user-book.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book,UserBook]),
  MulterModule.register({
    storage: diskStorage({
      destination: `${IMAGES_PUBLIC_ASSETS_PATH}/${IMAGES_BOOK_ASSETS_PATH}`,
      filename: editFileName,
    }),
    fileFilter: imageFileFilter
  }),BooksApiModule,UserBookModule],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService]
})
export class BookModule {}
