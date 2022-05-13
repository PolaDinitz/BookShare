import { Module } from '@nestjs/common';
import { UserBookService } from './user-book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBook } from 'src/modules/user-book/entities/user-book.entity';
import { UserBookController } from './user-book.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserBook])],
  providers: [UserBookService],
  controllers: [UserBookController],
  exports: [UserBookService]
})
export class UserBookModule {}
