import { Module } from '@nestjs/common';
import { UserBookService } from './user-book.service';
import { UserBookController } from './user-book.controller';

@Module({
  controllers: [UserBookController],
  providers: [UserBookService]
})
export class UserBookModule {}
