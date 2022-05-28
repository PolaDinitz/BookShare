import { Module } from '@nestjs/common';
import { BookCategoryService } from './book-category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookCategory } from './entities/book-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookCategory])],
  providers: [BookCategoryService],
  exports: [BookCategoryService]
})
export class BookCategoryModule {}
