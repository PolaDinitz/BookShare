import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IMAGES_BOOK_ASSETS_PATH } from 'src/consts/images.consts';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
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
      where: { title: title}
    });
  }

  public async getBooksByAuthor(author: string): Promise<Book[]> {
    return await this.booksRepository.find({
      where: { author: author }
    });
  }

  public async rateBook(id: string,rating:number) {
    let book_to_rate = await this.getBookById(id);
    let new_rate = book_to_rate.book_rating+rating;
    let new_count = book_to_rate.count++;

    return await this.booksRepository.update(id, { 
      book_rating:new_rate,
      count:new_count
    });
  }

  public async CreateBook(createBookDto: CreateBookDto, imageName: String) :Promise<Book>{
    const newBook = this.booksRepository.create({
      author: createBookDto.author,
        book_rating: createBookDto.book_rating,
        count: createBookDto.count,
        description: createBookDto.description,
        ganers: createBookDto.ganers,
    });

    if (imageName !== null) {
      newBook.imageUrl = `${IMAGES_BOOK_ASSETS_PATH}/${imageName.toString()}`;
    }
    return await this.booksRepository.save(newBook);
  }


  public async deleteBook(id: string) {
    await this.booksRepository.delete(id);

  }
}
