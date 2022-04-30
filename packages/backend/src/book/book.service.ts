import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}
  
  public async getBooks(): Promise<Book[]> {
    return await this.booksRepository.find();
  }

  public async getBookById(id: string): Promise<Book> {
    return await this.booksRepository.findOne(id);
  }
  
  public async getBooksByTitle(title: string): Promise<Book[]> {
    return await this.booksRepository.find({
      where: { title: title }
    });
  }

  public async getBooksByAuthor(author: string): Promise<Book[]> {
    return await this.booksRepository.find({
      where: { author: author }
    });
  }

  public async rateBook(id: string, rating:number) {
    let bookToRate = await this.getBookById(id);
    let newRate = bookToRate.bookRating+rating;
    let newCount = bookToRate.count++;

    return await this.booksRepository.update(id, { 
      bookRating:newRate,
      count:newCount
    });
  }

  public async create(bookApi: BookApi) :Promise<Book>{
    const newBook = this.booksRepository.create({
      id: bookApi.id,
      author: bookApi.author,
      bookRating: 0,
      count: 0,
      description: bookApi.description,
      title: bookApi.title,
      imageUrl: bookApi.imageUrl
    });
    return await this.booksRepository.save(newBook);
  }
}
