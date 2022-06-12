import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MoreThanOrEqual, Repository } from "typeorm";
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
      relations: ["categories"]
    });
  }

  public async getBookById(id: string): Promise<Book> {
    return await this.booksRepository.findOne(id, {
      relations: ["categories"]
    });
  }

  public async getBooksByTitle(title: string): Promise<Book[]> {
    return await this.booksRepository.createQueryBuilder("book")
      .leftJoinAndSelect("book.categories", "category")
      .where("LOWER(title) like LOWER(:search)", { search: `${title}%` })
      .getMany();
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
      return { rating: -1 };
    }
    return { rating: (book.bookRating / book.count) };
  }

  public async getPopularBooksExcludingUser(limit: number, userId: string) {
    return await this.booksRepository.createQueryBuilder("book")
      .leftJoinAndSelect("book.userBook", "userBook")
      .where("userBook.userId != :userId AND userBook.isAvailable = true AND userBook.isLent = false", { userId: userId })
      .orderBy("book.bookRating", "DESC")
      .take(limit)
      .getMany();
  }

  public async getAvailableBooksIdsAndTitlesExcludingUser(ids: string[], titles: string[], userId: string) {
    return await this.booksRepository.createQueryBuilder("book")
      .leftJoinAndSelect("book.userBook", "userBook")
      .where("userBook.userId != :userId", { userId: userId })
      .andWhere("userBook.isAvailable = true")
      .andWhere("userBook.isLent = false")
      .andWhere("book.id IN (:...ids) OR book.title ILIKE ANY (:titles)", { ids: ids, titles: titles })
      .orderBy("book.bookRating", "DESC")
      .getMany()
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
