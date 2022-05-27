import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, MoreThanOrEqual, Repository } from "typeorm";
import { BookCategory } from "../book-category/entities/book-category.entity";
import { Book } from "./entities/book.entity";

@Injectable()
export class BookService {

    constructor(
        @InjectRepository(Book)
        private booksRepository: Repository<Book>
    ) {
    }

  public async getBooks(): Promise<Book[]> {
    return await this.booksRepository.find({
      relations: ["categories"],   
    });
  }

  public async getBookById(id: string): Promise<Book> {
    return await this.booksRepository.findOne(id, {
      relations: ["categories"]
    });
  }

  public async getBooksByTitle(title: string): Promise<Book[]> {
    return await this.booksRepository.find({
      where: {
        title: Like(`${title}%`)
      },
      relations: ["categories"]
    });
  }

  public async getBooksByAuthor(author: string): Promise<Book[]> {
    return await this.booksRepository.find({
      where: { author: author },
      relations: ["categories"]
    });
  }

  public async getBooksByRating(rating: number): Promise<Book[]> {
    return await this.booksRepository.find({
      where: {
        bookRating: MoreThanOrEqual(rating)
      },
      relations: ["categories"]
    });
  }

    public async rateBook(id: string, rating: number) {
        const bookToRate = await this.getBookById(id);

        return await this.booksRepository.update(id, {
            bookRating: bookToRate.bookRating + rating,
            count: bookToRate.count + 1
        });
    }

    public async getBookRating(id: string) {
        const book = await this.getBookById(id);
        if (book.count === 0) {
            return {rating: -1};
        }
        return {rating: (book.bookRating / book.count)};
    }

    public async create(bookApi: BookApi): Promise<Book> {
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
