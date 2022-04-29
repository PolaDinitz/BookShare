import { Module } from '@nestjs/common';
import { UserBookService } from './user-book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBook } from 'src/user-book/entities/user-book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserBook])],
  providers: [UserBookService],
  exports: [UserBookService]
})
export class UserBookModule {}
