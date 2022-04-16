import { Module } from '@nestjs/common';
import { UserBookService } from './user-book.service';
import { UserBookController } from './user-book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBook } from 'src/user-book/entities/user-book.entity';
import { User } from 'src/user/entities/user.entity';
import { Book } from 'src/book/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserBook,Book,User])],
  controllers: [UserBookController],
  providers: [UserBookService],
  exports: [UserBookService]
})
export class UserBookModule {}
