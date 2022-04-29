import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookCategory } from './entities/book-category.entity';

@Injectable()
export class BookCategoryService {
  
  constructor(
    @InjectRepository(BookCategory)
    private bookCategoryRepository: Repository<BookCategory>,
  ) {}
  
  public async getCategories() : Promise<string[]> {
    return await this.bookCategoryRepository.createQueryBuilder('BookCategory').select(["category"]).distinct().execute();
  }

  public async create(bookId : string, category: string) : Promise<BookCategory>{
    return await this.bookCategoryRepository.save(this.bookCategoryRepository.create({
      bookId: bookId,
      category: category
    }));
  }
}
